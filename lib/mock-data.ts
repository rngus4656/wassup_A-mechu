// A-메추 Mock 데이터
// 실제 DB 연동 전 테스트용 In-Memory 데이터

import {
  Store,
  Menu,
  User,
  Order,
  OrderMenu,
  Review,
  Feedback,
  MenuCategory,
  TimeSegment,
} from "./types";

// 6개 매장 데이터
export const stores: Store[] = [
  {
    business_num: "123-45-67890",
    store_name: "맛있는 한식당",
    tel: "02-1234-5678",
    delivery_type: "배달/포장",
    address: "서울 강남구 역삼동 123-45",
    min_pay: 15000,
  },
  {
    business_num: "234-56-78901",
    store_name: "황금 중화요리",
    tel: "02-2345-6789",
    delivery_type: "배달",
    address: "서울 강남구 삼성동 234-56",
    min_pay: 18000,
  },
  {
    business_num: "345-67-89012",
    store_name: "스시 오마카세",
    tel: "02-3456-7890",
    delivery_type: "배달/포장",
    address: "서울 강남구 청담동 345-67",
    min_pay: 25000,
  },
  {
    business_num: "456-78-90123",
    store_name: "BBQ 치킨하우스",
    tel: "02-4567-8901",
    delivery_type: "배달",
    address: "서울 강남구 대치동 456-78",
    min_pay: 18000,
  },
  {
    business_num: "567-89-01234",
    store_name: "이탈리안 키친",
    tel: "02-5678-9012",
    delivery_type: "배달/포장",
    address: "서울 강남구 논현동 567-89",
    min_pay: 20000,
  },
  {
    business_num: "678-90-12345",
    store_name: "분식천국",
    tel: "02-6789-0123",
    delivery_type: "배달",
    address: "서울 강남구 역삼동 678-90",
    min_pay: 12000,
  },
];

// 음식 이미지 URL (Unsplash)
const foodImages = {
  한식: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop",
  중식: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop",
  일식: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop",
  양식: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
  분식: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop",
  치킨: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop",
  피자: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
  버거: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
  샐러드: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
  "카페/디저트": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop",
};

// 30개 메뉴 데이터
export const menus: Menu[] = [
  // 한식 (맛있는 한식당)
  { menu_id: 1, business_num: "123-45-67890", menu_name: "돼지갈비찜", menu_info: "양념이 잘 밴 푸짐한 갈비찜", menu_img: foodImages.한식, category: "한식", price: 35000 },
  { menu_id: 2, business_num: "123-45-67890", menu_name: "김치찌개", menu_info: "진한 돼지고기 김치찌개", menu_img: foodImages.한식, category: "한식", price: 9000 },
  { menu_id: 3, business_num: "123-45-67890", menu_name: "된장찌개", menu_info: "구수한 된장찌개 백반", menu_img: foodImages.한식, category: "한식", price: 8500 },
  { menu_id: 4, business_num: "123-45-67890", menu_name: "불고기 정식", menu_info: "달콤한 불고기와 반찬 세트", menu_img: foodImages.한식, category: "한식", price: 12000 },
  { menu_id: 5, business_num: "123-45-67890", menu_name: "비빔밥", menu_info: "신선한 야채 비빔밥", menu_img: foodImages.한식, category: "한식", price: 10000 },
  
  // 중식 (황금 중화요리)
  { menu_id: 6, business_num: "234-56-78901", menu_name: "짜장면", menu_info: "춘장 가득 정통 짜장면", menu_img: foodImages.중식, category: "중식", price: 7000 },
  { menu_id: 7, business_num: "234-56-78901", menu_name: "짬뽕", menu_info: "얼큰한 해물 짬뽕", menu_img: foodImages.중식, category: "중식", price: 8000 },
  { menu_id: 8, business_num: "234-56-78901", menu_name: "탕수육", menu_info: "바삭한 찹쌀 탕수육", menu_img: foodImages.중식, category: "중식", price: 18000 },
  { menu_id: 9, business_num: "234-56-78901", menu_name: "마파두부", menu_info: "매콤한 사천식 마파두부", menu_img: foodImages.중식, category: "중식", price: 12000 },
  { menu_id: 10, business_num: "234-56-78901", menu_name: "볶음밥", menu_info: "새우 볶음밥", menu_img: foodImages.중식, category: "중식", price: 9000 },
  
  // 일식 (스시 오마카세)
  { menu_id: 11, business_num: "345-67-89012", menu_name: "연어초밥 세트", menu_info: "신선한 연어 8피스", menu_img: foodImages.일식, category: "일식", price: 22000 },
  { menu_id: 12, business_num: "345-67-89012", menu_name: "우동", menu_info: "진한 가쓰오부시 우동", menu_img: foodImages.일식, category: "일식", price: 9000 },
  { menu_id: 13, business_num: "345-67-89012", menu_name: "돈카츠 정식", menu_info: "두툼한 등심 돈카츠", menu_img: foodImages.일식, category: "일식", price: 14000 },
  { menu_id: 14, business_num: "345-67-89012", menu_name: "라멘", menu_info: "진한 돈코츠 라멘", menu_img: foodImages.일식, category: "일식", price: 11000 },
  { menu_id: 15, business_num: "345-67-89012", menu_name: "카레라이스", menu_info: "일본식 카레라이스", menu_img: foodImages.일식, category: "일식", price: 10000 },
  
  // 치킨 (BBQ 치킨하우스)
  { menu_id: 16, business_num: "456-78-90123", menu_name: "후라이드 치킨", menu_info: "바삭바삭 기본 후라이드", menu_img: foodImages.치킨, category: "치킨", price: 18000 },
  { menu_id: 17, business_num: "456-78-90123", menu_name: "양념 치킨", menu_info: "달콤 매콤 양념치킨", menu_img: foodImages.치킨, category: "치킨", price: 19000 },
  { menu_id: 18, business_num: "456-78-90123", menu_name: "간장 치킨", menu_info: "달콤 짭짤 간장치킨", menu_img: foodImages.치킨, category: "치킨", price: 19000 },
  { menu_id: 19, business_num: "456-78-90123", menu_name: "마늘 치킨", menu_info: "알싸한 마늘향 치킨", menu_img: foodImages.치킨, category: "치킨", price: 20000 },
  { menu_id: 20, business_num: "456-78-90123", menu_name: "반반 치킨", menu_info: "후라이드 + 양념 반반", menu_img: foodImages.치킨, category: "치킨", price: 20000 },
  
  // 양식/피자 (이탈리안 키친)
  { menu_id: 21, business_num: "567-89-01234", menu_name: "마르게리타 피자", menu_info: "토마토 바질 모짜렐라", menu_img: foodImages.피자, category: "피자", price: 16000 },
  { menu_id: 22, business_num: "567-89-01234", menu_name: "페퍼로니 피자", menu_info: "클래식 페퍼로니", menu_img: foodImages.피자, category: "피자", price: 18000 },
  { menu_id: 23, business_num: "567-89-01234", menu_name: "크림 파스타", menu_info: "진한 크림 파스타", menu_img: foodImages.양식, category: "양식", price: 14000 },
  { menu_id: 24, business_num: "567-89-01234", menu_name: "토마토 파스타", menu_info: "새콤한 토마토 파스타", menu_img: foodImages.양식, category: "양식", price: 13000 },
  { menu_id: 25, business_num: "567-89-01234", menu_name: "시저 샐러드", menu_info: "신선한 로메인 샐러드", menu_img: foodImages.샐러드, category: "샐러드", price: 11000 },
  
  // 분식 (분식천국)
  { menu_id: 26, business_num: "678-90-12345", menu_name: "떡볶이", menu_info: "매콤 달콤 국물 떡볶이", menu_img: foodImages.분식, category: "분식", price: 7000 },
  { menu_id: 27, business_num: "678-90-12345", menu_name: "순대", menu_info: "찰 순대 한 접시", menu_img: foodImages.분식, category: "분식", price: 8000 },
  { menu_id: 28, business_num: "678-90-12345", menu_name: "김밥", menu_info: "속 꽉 찬 김밥 2줄", menu_img: foodImages.분식, category: "분식", price: 5000 },
  { menu_id: 29, business_num: "678-90-12345", menu_name: "라면", menu_info: "계란 라면", menu_img: foodImages.분식, category: "분식", price: 4500 },
  { menu_id: 30, business_num: "678-90-12345", menu_name: "튀김 세트", menu_info: "모듬 튀김 세트", menu_img: foodImages.분식, category: "분식", price: 9000 },
];

// 12명 사용자 데이터
export const users: User[] = Array.from({ length: 12 }, (_, i) => ({
  user_id: i + 1,
  nickname: `사용자${i + 1}`,
  tel: `010-${String(1000 + i).padStart(4, "0")}-${String(5000 + i).padStart(4, "0")}`,
  email: `user${i + 1}@email.com`,
  address: `서울 강남구 역삼동 ${100 + i}-${10 + i}`,
  user_grade: i < 3 ? "VIP" : i < 7 ? "골드" : "일반",
  signup_date: new Date(2024, Math.floor(i / 3), 1 + i),
  point: (i + 1) * 1000,
}));

// 시드 기반 랜덤 함수
function seededRandom(seed: number): () => number {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

const random = seededRandom(42);

// 120개 주문 데이터 생성 (최근 60일)
function generateOrders(): Order[] {
  const orders: Order[] = [];
  const now = new Date();
  const statuses = ["배달완료", "배달완료", "배달완료", "배달중", "준비중"];
  const payOpts = ["카드", "현금", "카카오페이", "네이버페이"];

  for (let i = 0; i < 120; i++) {
    const userId = Math.floor(random() * 12) + 1;
    const storeIndex = Math.floor(random() * stores.length);
    const daysAgo = Math.floor(random() * 60);
    const hour = Math.floor(random() * 24);
    const orderTime = new Date(now);
    orderTime.setDate(orderTime.getDate() - daysAgo);
    orderTime.setHours(hour, Math.floor(random() * 60), 0, 0);

    orders.push({
      order_id: i + 1,
      user_id: userId,
      business_num: stores[storeIndex].business_num,
      order_status: statuses[Math.floor(random() * statuses.length)],
      pay_opt: payOpts[Math.floor(random() * payOpts.length)],
      delivery_req: random() > 0.7 ? "문 앞에 놓아주세요" : "",
      order_time: orderTime,
      paid_amount: 0, // 나중에 계산
    });
  }
  return orders;
}

export const orders: Order[] = generateOrders();

// 200개 주문메뉴 데이터 생성
function generateOrderMenus(): OrderMenu[] {
  const orderMenus: OrderMenu[] = [];
  let id = 1;

  for (const order of orders) {
    const storeMenus = menus.filter((m) => m.business_num === order.business_num);
    const menuCount = Math.floor(random() * 3) + 1;
    let totalAmount = 0;

    for (let j = 0; j < menuCount && j < storeMenus.length; j++) {
      const menu = storeMenus[Math.floor(random() * storeMenus.length)];
      const quantity = Math.floor(random() * 2) + 1;

      orderMenus.push({
        ordermenu_id: id++,
        order_id: order.order_id,
        menu_id: menu.menu_id,
        quantity,
      });

      totalAmount += menu.price * quantity;
    }

    order.paid_amount = totalAmount;
  }

  return orderMenus;
}

export const orderMenus: OrderMenu[] = generateOrderMenus();

// 70개 리뷰 데이터 생성
function generateReviews(): Review[] {
  const reviews: Review[] = [];
  const reviewTexts = [
    "맛있어요! 배달도 빨랐습니다.",
    "양도 푸짐하고 맛있네요.",
    "보통이에요.",
    "다음에 또 시켜먹을게요!",
    "가성비 좋아요.",
    "약간 짜긴 했는데 맛있었어요.",
    "정말 최고입니다!",
    "배달이 조금 늦었지만 맛있었어요.",
    "그냥 그래요.",
    "추천합니다!",
  ];

  const completedOrders = orders.filter((o) => o.order_status === "배달완료");
  const reviewableOrders = completedOrders.slice(0, 70);

  for (let i = 0; i < reviewableOrders.length; i++) {
    const order = reviewableOrders[i];
    reviews.push({
      review_id: i + 1,
      user_id: order.user_id,
      order_id: order.order_id,
      review_txt: reviewTexts[Math.floor(random() * reviewTexts.length)],
      created_at: new Date(order.order_time.getTime() + 3600000), // 주문 1시간 후
      rating: Math.floor(random() * 3) + 3, // 3-5점 분포
    });
  }

  return reviews;
}

export const reviews: Review[] = generateReviews();

// 피드백 저장소 (런타임에 추가됨)
export const feedbacks: Feedback[] = [];

// 시간대 판별 함수
export function getTimeSegment(date: Date = new Date()): TimeSegment {
  const hour = date.getHours();
  if (hour >= 5 && hour < 11) return "아침";
  if (hour >= 11 && hour < 16) return "점심";
  if (hour >= 16 && hour < 22) return "저녁";
  return "야식";
}

// 사용자의 최근 주문 카테고리 조회
export function getUserRecentCategories(
  userId: number,
  days: number = 14
): MenuCategory[] {
  const now = new Date();
  const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  const userOrders = orders.filter(
    (o) => o.user_id === userId && o.order_time >= cutoff
  );

  const categoryCount: Record<string, number> = {};

  for (const order of userOrders) {
    const orderMenuList = orderMenus.filter((om) => om.order_id === order.order_id);
    for (const om of orderMenuList) {
      const menu = menus.find((m) => m.menu_id === om.menu_id);
      if (menu) {
        categoryCount[menu.category] = (categoryCount[menu.category] || 0) + om.quantity;
      }
    }
  }

  return Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([cat]) => cat as MenuCategory);
}

// 사용자 주문 수 조회
export function getUserOrderCount(userId: number): number {
  return orders.filter((o) => o.user_id === userId).length;
}
