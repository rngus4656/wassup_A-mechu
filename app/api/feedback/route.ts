// POST /api/feedback
// 사용자 피드백 저장 API

import { NextRequest, NextResponse } from "next/server";
import { feedbacks, orders, orderMenus, reviews, stores, menus } from "@/lib/mock-data";
import { Feedback, TimeSegment, TIME_SEGMENTS } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      user_id,
      rating,
      comment,
      recommended_menu_ids,
      chosen_menu_id,
      time_segment,
    } = body;

    // 입력 검증
    if (typeof user_id !== "number" || user_id < 1) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자 ID입니다." },
        { status: 400 }
      );
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "평점은 1-5 사이여야 합니다." },
        { status: 400 }
      );
    }

    if (!TIME_SEGMENTS.includes(time_segment)) {
      return NextResponse.json(
        { error: "유효하지 않은 시간대입니다." },
        { status: 400 }
      );
    }

    // 만약 chosen_menu_id가 있으면 ERD 구조에 맞게 Order + OrderMenu + Review 생성
    if (chosen_menu_id && typeof chosen_menu_id === "number") {
      const menu = menus.find((m) => m.menu_id === chosen_menu_id);
      if (menu) {
        const store = stores.find((s) => s.business_num === menu.business_num);
        if (store) {
          // 새 주문 생성
          const newOrderId = Math.max(...orders.map((o) => o.order_id), 0) + 1;
          const newOrder = {
            order_id: newOrderId,
            user_id,
            business_num: store.business_num,
            order_status: "피드백",
            pay_opt: "피드백",
            delivery_req: "",
            order_time: new Date(),
            paid_amount: menu.price,
          };
          orders.push(newOrder);

          // 새 OrderMenu 생성
          const newOrderMenuId = Math.max(...orderMenus.map((om) => om.ordermenu_id), 0) + 1;
          orderMenus.push({
            ordermenu_id: newOrderMenuId,
            order_id: newOrderId,
            menu_id: chosen_menu_id,
            quantity: 1,
          });

          // 새 Review 생성 (1 order : 1 review 관계)
          const newReviewId = Math.max(...reviews.map((r) => r.review_id), 0) + 1;
          reviews.push({
            review_id: newReviewId,
            user_id,
            order_id: newOrderId,
            review_txt: comment || "추천 피드백",
            created_at: new Date(),
            rating,
          });
        }
      }
    }

    // 피드백 저장 (별도 테이블)
    const newFeedbackId = Math.max(...feedbacks.map((f) => f.feedback_id), 0) + 1;
    const feedback: Feedback = {
      feedback_id: newFeedbackId,
      user_id,
      recommended_menu_ids: recommended_menu_ids || [],
      chosen_menu_id: chosen_menu_id || null,
      time_segment: time_segment as TimeSegment,
      rating,
      comment: comment || "",
      created_at: new Date(),
    };

    feedbacks.push(feedback);

    return NextResponse.json({
      success: true,
      message: "피드백이 저장되었습니다.",
      feedback_id: newFeedbackId,
    });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json(
      { error: "피드백 저장 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
