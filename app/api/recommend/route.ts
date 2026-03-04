// POST /api/recommend
// AI 메뉴 추천 API

import { NextRequest, NextResponse } from "next/server";
import { getRecommendations } from "@/lib/recommend";
import { RecommendRequest, MenuCategory, TimeSegment, MENU_CATEGORIES, TIME_SEGMENTS } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 입력 검증
    const { user_id, time_segment, recent_categories, preferred_categories } = body;

    if (typeof user_id !== "number" || user_id < 1 || user_id > 12) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자 ID입니다." },
        { status: 400 }
      );
    }

    if (!TIME_SEGMENTS.includes(time_segment)) {
      return NextResponse.json(
        { error: "유효하지 않은 시간대입니다." },
        { status: 400 }
      );
    }

    // 카테고리 검증
    const validRecentCategories = (recent_categories || []).filter(
      (c: string) => MENU_CATEGORIES.includes(c as MenuCategory)
    ) as MenuCategory[];

    const validPreferredCategories = (preferred_categories || []).filter(
      (c: string) => MENU_CATEGORIES.includes(c as MenuCategory)
    ) as MenuCategory[];

    const recommendRequest: RecommendRequest = {
      user_id,
      time_segment: time_segment as TimeSegment,
      recent_categories: validRecentCategories,
      preferred_categories: validPreferredCategories,
    };

    // 추천 생성 (약간의 딜레이로 AI 처리 시뮬레이션)
    await new Promise((resolve) => setTimeout(resolve, 800));

    const result = getRecommendations(recommendRequest);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Recommendation error:", error);
    return NextResponse.json(
      { error: "추천 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
