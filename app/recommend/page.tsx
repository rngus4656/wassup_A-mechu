"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useUser } from "@/lib/user-context";
import {
  TimeSegment,
  TIME_SEGMENTS,
  MenuCategory,
  MENU_CATEGORIES,
} from "@/lib/types";
import { getTimeSegment, getUserRecentCategories } from "@/lib/mock-data";

export default function RecommendPage() {
  const router = useRouter();
  const { userId } = useUser();

  // 시간대 (자동 감지 + 수동 선택) - 초기값은 null로 설정하여 hydration mismatch 방지
  const [timeSegment, setTimeSegment] = useState<TimeSegment | null>(null);

  // 최근 주문 카테고리 (사용자 이력 기반)
  const [recentCategories, setRecentCategories] = useState<MenuCategory[]>([]);

  // 선호 카테고리 (최대 3개)
  const [preferredCategories, setPreferredCategories] = useState<
    MenuCategory[]
  >([]);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 클라이언트에서 시간대 설정 (hydration 이후)
  useEffect(() => {
    setTimeSegment(getTimeSegment());
  }, []);

  // 사용자 변경 시 최근 카테고리 업데이트
  useEffect(() => {
    const recent = getUserRecentCategories(userId);
    setRecentCategories(recent);
  }, [userId]);

  // 선호 카테고리 토글
  const togglePreferred = (category: MenuCategory) => {
    if (preferredCategories.includes(category)) {
      setPreferredCategories(preferredCategories.filter((c) => c !== category));
    } else if (preferredCategories.length < 3) {
      setPreferredCategories([...preferredCategories, category]);
    }
  };

  // 최근 카테고리 토글
  const toggleRecent = (category: MenuCategory) => {
    if (recentCategories.includes(category)) {
      setRecentCategories(recentCategories.filter((c) => c !== category));
    } else {
      setRecentCategories([...recentCategories, category]);
    }
  };

  // 추천 요청
  const handleSubmit = async () => {
    if (!timeSegment) return;
    setIsLoading(true);

    // URL 파라미터 생성
    const params = new URLSearchParams({
      user_id: String(userId),
      segment: timeSegment,
      recent: recentCategories.join(","),
      preferred: preferredCategories.join(","),
    });

    // 최소 1.2초 딜레이
    await new Promise((resolve) => setTimeout(resolve, 1200));

    router.push(`/results?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-foreground">
            AI 메뉴 추천
          </h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* 시간대 선택 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">현재 시간대</h2>
            <Badge variant="secondary" className="text-xs">
              자동 감지
            </Badge>
          </div>
          <div className="flex gap-2">
            {TIME_SEGMENTS.map((segment) => (
              <Button
                key={segment}
                variant={timeSegment !== null && timeSegment === segment ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeSegment(segment)}
                className="flex-1"
              >
                {segment}
              </Button>
            ))}
          </div>
        </section>

        {/* 최근 주문 카테고리 */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">
              최근 주문한 메뉴 카테고리
            </h2>
            <span className="text-xs text-muted-foreground">
              선택 가능
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {MENU_CATEGORIES.map((category) => {
              const isSelected = recentCategories.includes(category);

              return (
                <Badge
                  key={category}
                  variant={isSelected ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-1.5 transition-all hover:bg-primary/10 ${
                    isSelected ? "bg-primary text-primary-foreground" : ""
                  }`}
                  onClick={() => toggleRecent(category)}
                >
                  {category}
                </Badge>
              );
            })}
          </div>
          {recentCategories.length === 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              최근 주문한 카테고리를 선택해주세요
            </p>
          )}
        </section>

        {/* 선호 카테고리 선택 */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-foreground">
                선호하는 음식 카테고리
              </h2>
              <Badge variant="secondary" className="text-xs">
                선택사항
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground">
              {preferredCategories.length}/3
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {MENU_CATEGORIES.map((category) => {
              const isSelected = preferredCategories.includes(category);
              const isDisabled =
                !isSelected && preferredCategories.length >= 3;

              return (
                <Badge
                  key={category}
                  variant={isSelected ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-1.5 transition-all ${
                    isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-primary/10"
                  } ${isSelected ? "bg-primary text-primary-foreground" : ""}`}
                  onClick={() => !isDisabled && togglePreferred(category)}
                >
                  {category}
                </Badge>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {preferredCategories.length >= 3
              ? "최대 3개까지 선택 가능합니다"
              : "선택하지 않아도 추천받을 수 있어요"}
          </p>
        </section>

        {/* 추천받기 버튼 */}
        <div className="pt-4">
          <Button
            size="lg"
            className="w-full h-14 text-base font-semibold gap-2"
            onClick={handleSubmit}
          >
            <Sparkles className="w-5 h-5" />
            추천받기
          </Button>
        </div>
      </div>

      {/* 로딩 모달 */}
      <Dialog open={isLoading} onOpenChange={setIsLoading}>
        <DialogContent className="sm:max-w-[300px] text-center border-0">
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <Sparkles className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                AI 분석중...
              </h3>
              <p className="text-sm text-muted-foreground">
                취향을 분석하고 있어요
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
