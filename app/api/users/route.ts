// GET /api/users
// 사용자 목록 조회 (디버그용)

import { NextResponse } from "next/server";
import { users } from "@/lib/mock-data";

export async function GET() {
  // 민감 정보 제외하고 반환
  const safeUsers = users.map((u) => ({
    user_id: u.user_id,
    nickname: u.nickname,
    user_grade: u.user_grade,
    point: u.point,
  }));

  return NextResponse.json(safeUsers);
}
