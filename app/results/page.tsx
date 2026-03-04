"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  RefreshCw,
  MessageSquare,
  Sparkles,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MenuCard } from "@/components/menu-card";
import { FeedbackModal } from "@/components/feedback-modal";
import {
  TimeSegment,
  MenuCategory,
  RecommendResponse,
  RecommendedMenu,
} from "@/lib/types";

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL 파라미터 파싱
  const userId = parseInt(searchParams.get("user_id") || "1", 10);
  const segment = (searchParams.get("segment") || "점심") as TimeSegment;
  const recent = searchParams.get("recent") || "";
  const preferred = searchParams.get("preferred") || "";

  const recentCategories = recent
    ? (recent.split(",") as MenuCategory[])
    : [];
  const preferredCategories = preferred
    ? (preferred.split(",") as MenuCategory[])
    : [];

  // 상태
  const [results, setResults] = useState<RecommendResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // 추천 API 호출
  const fetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          time_segment: segment,
          recent_categories: recentCategories,
          preferred_categories: preferredCategories,
        }),
      });

      if (!response.ok) {
        throw new Error("추천을 가져오는데 실패했습니다");
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 다시 추천받기
  const handleRetry = () => {
    const params = new URLSearchParams({
      recent: recentCategories.join(","),
      preferred: preferredCategories.join(","),
    });
    router.push(`/recommend?${params.toString()}`);
  };

  // 메뉴 선택
  const handleSelectMenu = (menuId: number) => {
    setSelectedMenuId(selectedMenuId === menuId ? null : menuId);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-foreground">추천 결과</h1>
        </div>
      </header>

      <div className="p-4">
        {/* 타이틀 섹션 */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              오늘의 추천 Top 3
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{segment} 시간대</Badge>
            {results?.is_cold_start && (
              <Badge variant="outline" className="text-xs">
                시간대/인기 기반
              </Badge>
            )}
          </div>
        </div>

        {/* 콜드스타트 알림 */}
        {results?.message && (
          <Alert className="mb-4 border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm text-foreground">
              {results.message}
            </AlertDescription>
          </Alert>
        )}

        {/* 로딩 상태 */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">추천을 불러오는 중...</p>
          </div>
        )}

        {/* 에러 상태 */}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle className="w-10 h-10 text-destructive mb-4" />
            <p className="text-foreground font-medium mb-2">
              오류가 발생했습니다
            </p>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchRecommendations} variant="outline">
              다시 시도
            </Button>
          </div>
        )}

        {/* 결과 카드 리스트 */}
        {results && !isLoading && (
          <div className="space-y-4">
            {results.top3.map((item: RecommendedMenu, index: number) => (
              <MenuCard
                key={item.menu.menu_id}
                item={item}
                rank={index + 1}
                isSelected={selectedMenuId === item.menu.menu_id}
                onSelect={() => handleSelectMenu(item.menu.menu_id)}
              />
            ))}
          </div>
        )}

        {/* 선택 안내 */}
        {results && !isLoading && selectedMenuId && (
          <div className="mt-4 p-3 bg-primary/10 rounded-lg text-center">
            <p className="text-sm text-primary font-medium">
              메뉴를 선택했어요! 아래에서 피드백을 보내주세요.
            </p>
          </div>
        )}
      </div>

      {/* 하단 버튼 영역 */}
      {results && !isLoading && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={handleRetry}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              다시 추천받기
            </Button>
            <Button
              className="flex-1 h-12"
              onClick={() => setIsFeedbackOpen(true)}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              피드백 보내기
            </Button>
          </div>
        </div>
      )}

      {/* 피드백 모달 */}
      {results && (
        <FeedbackModal
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
          userId={userId}
          timeSegment={segment}
          recommendedMenus={results.top3}
          selectedMenuId={selectedMenuId}
        />
      )}
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
