// GET /api/users/[id]/orders
// 사용자 주문 내역 조회

import { NextRequest, NextResponse } from "next/server";
import { orders, orderMenus, menus, stores, reviews } from "@/lib/mock-data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = parseInt(id, 10);

  if (isNaN(userId) || userId < 1 || userId > 12) {
    return NextResponse.json(
      { error: "유효하지 않은 사용자 ID입니다." },
      { status: 400 }
    );
  }

  // days 파라미터 (기본 60일)
  const searchParams = request.nextUrl.searchParams;
  const days = parseInt(searchParams.get("days") || "60", 10);

  const now = new Date();
  const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  // 사용자 주문 조회
  const userOrders = orders
    .filter((o) => o.user_id === userId && o.order_time >= cutoff)
    .sort((a, b) => b.order_time.getTime() - a.order_time.getTime());

  // 주문별 상세 정보 조합
  const ordersWithDetails = userOrders.map((order) => {
    const store = stores.find((s) => s.business_num === order.business_num);
    const orderMenuList = orderMenus.filter((om) => om.order_id === order.order_id);
    const review = reviews.find((r) => r.order_id === order.order_id);

    const menuDetails = orderMenuList.map((om) => {
      const menu = menus.find((m) => m.menu_id === om.menu_id);
      return {
        menu_id: om.menu_id,
        menu_name: menu?.menu_name || "",
        category: menu?.category || "",
        price: menu?.price || 0,
        quantity: om.quantity,
      };
    });

    return {
      order_id: order.order_id,
      order_time: order.order_time,
      order_status: order.order_status,
      paid_amount: order.paid_amount,
      store_name: store?.store_name || "",
      menus: menuDetails,
      review: review
        ? {
            rating: review.rating,
            review_txt: review.review_txt,
          }
        : null,
    };
  });

  return NextResponse.json({
    user_id: userId,
    total_orders: ordersWithDetails.length,
    orders: ordersWithDetails,
  });
}
