// A-메추 추천 알고리즘
// MVP: 평점 + 인기도 + 최근 취향 + 시간대 기반 휴리스틱 추천

import {
  Menu,
  Store,
  MenuCategory,
  TimeSegment,
  TIME_SEGMENT_PRIORS,
  RecommendedMenu,
  RecommendRequest,
  RecommendResponse,
} from "./types";
import {
  menus,
  stores,
  orders,
  orderMenus,
  reviews,
  getUserRecentCategories,
  getUserOrderCount,
} from "./mock-data";

// 메뉴별 평균 평점 계산
function getMenuAvgRating(menuId: number): { avg: number; count: number } {
  // order_id를 통해 review와 연결
  const menuOrderIds = orderMenus
    .filter((om) => om.menu_id === menuId)
    .map((om) => om.order_id);

  const menuReviews = reviews.filter((r) => menuOrderIds.includes(r.order_id));

  if (menuReviews.length === 0) {
    return { avg: 0, count: 0 };
  }

  const sum = menuReviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    avg: sum / menuReviews.length,
    count: menuReviews.length,
  };
}

// 메뉴 인기도 (주문 횟수)
function getMenuPopularity(menuId: number): number {
  return orderMenus
    .filter((om) => om.menu_id === menuId)
    .reduce((acc, om) => acc + om.quantity, 0);
}

// 전체 메뉴 인기도 최대값 (정규화용)
function getMaxPopularity(): number {
  const popularities = menus.map((m) => getMenuPopularity(m.menu_id));
  return Math.max(...popularities, 1);
}

// 추천 이유 생성
function generateReasons(
  menu: Menu,
  avgRating: number,
  isTimeRelevant: boolean,
  isRecentCategory: boolean,
  isPreferred: boolean
): string[] {
  const reasons: string[] = [];

  if (avgRating >= 4.0) {
    reasons.push(`평점 ${avgRating.toFixed(1)}`);
  }

  if (isRecentCategory) {
    reasons.push("최근 취향");
  }

  if (isPreferred) {
    reasons.push("선호 카테고리");
  }

  if (isTimeRelevant) {
    reasons.push("시간대 인기");
  }

  const popularity = getMenuPopularity(menu.menu_id);
  if (popularity >= 5) {
    reasons.push("인기 메뉴");
  }

  return reasons.slice(0, 3); // 최대 3개
}

// 메인 추천 함수
export function getRecommendations(request: RecommendRequest): RecommendResponse {
  const { user_id, time_segment, recent_categories, preferred_categories } = request;

  // 콜드스타트 체크
  const userOrderCount = getUserOrderCount(user_id);
  const isColdStart = userOrderCount < 3;

  // 사용자 최근 카테고리 (서버에서 계산)
  const serverRecentCategories = getUserRecentCategories(user_id, 14);

  // 카테고리 필터링 (선호 + 최근)
  const targetCategories = new Set<MenuCategory>([
    ...recent_categories,
    ...preferred_categories,
    ...serverRecentCategories,
  ]);

  // 시간대별 Prior 카테고리
  const timePriorCategories = TIME_SEGMENT_PRIORS[time_segment];

  // 후보 메뉴 필터링
  let candidateMenus = menus;
  
  if (targetCategories.size > 0 && !isColdStart) {
    candidateMenus = menus.filter(
      (m) => targetCategories.has(m.category) || timePriorCategories.includes(m.category)
    );
  }

  // 후보가 너무 적으면 전체에서 선택
  if (candidateMenus.length < 10) {
    candidateMenus = menus;
  }

  const maxPopularity = getMaxPopularity();

  // 메뉴별 점수 계산
  const scoredMenus: Array<{
    menu: Menu;
    score: number;
    avgRating: number;
    reviewCount: number;
    isTimeRelevant: boolean;
    isRecentCategory: boolean;
    isPreferred: boolean;
  }> = candidateMenus.map((menu) => {
    const { avg: avgRating, count: reviewCount } = getMenuAvgRating(menu.menu_id);
    const popularity = getMenuPopularity(menu.menu_id);

    // 정규화된 평점 (0-1, 5점 기준)
    const normalizedRating = avgRating / 5;

    // 정규화된 인기도 (0-1)
    const normalizedPopularity = popularity / maxPopularity;

    // 사용자 최근 카테고리 부스트
    const isRecentCategory =
      serverRecentCategories.includes(menu.category) ||
      recent_categories.includes(menu.category);
    const recentBoost = isRecentCategory ? 1 : 0;

    // 시간대 Prior 부스트
    const isTimeRelevant = timePriorCategories.includes(menu.category);
    const timePriorBoost = isTimeRelevant ? 1 : 0;

    // 선호 카테고리
    const isPreferred = preferred_categories.includes(menu.category);
    const preferredBoost = isPreferred ? 0.5 : 0;

    // 최종 점수 계산
    // 콜드스타트일 경우 시간대/인기도 가중치 증가
    let score: number;
    if (isColdStart) {
      score =
        0.35 * normalizedRating +
        0.35 * normalizedPopularity +
        0.1 * recentBoost +
        0.2 * timePriorBoost;
    } else {
      score =
        0.45 * normalizedRating +
        0.25 * normalizedPopularity +
        0.20 * (recentBoost + preferredBoost) +
        0.10 * timePriorBoost;
    }

    // 리뷰가 없는 메뉴 페널티
    if (reviewCount === 0) {
      score *= 0.7;
    }

    return {
      menu,
      score,
      avgRating,
      reviewCount,
      isTimeRelevant,
      isRecentCategory,
      isPreferred,
    };
  });

  // 점수순 정렬
  scoredMenus.sort((a, b) => b.score - a.score);

  // 다양성을 위해 같은 매장에서 최대 2개만
  const selectedMenus: typeof scoredMenus = [];
  const storeCount: Record<string, number> = {};

  for (const item of scoredMenus) {
    const storeNum = item.menu.business_num;
    if ((storeCount[storeNum] || 0) < 2) {
      selectedMenus.push(item);
      storeCount[storeNum] = (storeCount[storeNum] || 0) + 1;
    }
    if (selectedMenus.length >= 3) break;
  }

  // 결과 변환
  const top3: RecommendedMenu[] = selectedMenus.map((item) => {
    const store = stores.find((s) => s.business_num === item.menu.business_num)!;
    return {
      menu: item.menu,
      store,
      score: item.score,
      avgRating: item.avgRating || 4.0, // 기본값
      reviewCount: item.reviewCount,
      reasons: generateReasons(
        item.menu,
        item.avgRating || 4.0,
        item.isTimeRelevant,
        item.isRecentCategory,
        item.isPreferred
      ),
    };
  });

  return {
    top3,
    time_segment,
    is_cold_start: isColdStart,
    message: isColdStart
      ? "주문 이력이 적어 시간대/인기 기반 추천을 제공해요."
      : undefined,
  };
}
