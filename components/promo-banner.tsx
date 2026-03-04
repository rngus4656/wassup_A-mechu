"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function PromoBanner() {
  return (
    <div className="px-4 py-2">
      <Link href="/recommend">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-5 text-primary-foreground">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">
                AI 메뉴 추천
              </span>
            </div>
            <h3 className="text-xl font-bold mb-1">
              오늘 뭐 먹을지 고민이세요?
            </h3>
            <p className="text-sm opacity-90 mb-3">
              AI가 당신의 취향을 분석해 딱 맞는 메뉴를 추천해드려요
            </p>
            <div className="flex items-center gap-1 text-sm font-medium">
              <span>추천받기</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          {/* 장식 요소 */}
          <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-white/5" />
        </div>
      </Link>
    </div>
  );
}
