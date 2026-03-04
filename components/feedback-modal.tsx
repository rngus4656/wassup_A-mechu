"use client";

import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { RecommendedMenu, TimeSegment } from "@/lib/types";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  timeSegment: TimeSegment;
  recommendedMenus: RecommendedMenu[];
  selectedMenuId: number | null;
}

export function FeedbackModal({
  isOpen,
  onClose,
  userId,
  timeSegment,
  recommendedMenus,
  selectedMenuId,
}: FeedbackModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          rating,
          comment,
          recommended_menu_ids: recommendedMenus.map((m) => m.menu.menu_id),
          chosen_menu_id: selectedMenuId,
          time_segment: timeSegment,
        }),
      });

      if (!response.ok) {
        throw new Error("피드백 저장 실패");
      }

      toast.success("피드백이 저장되었습니다");
      onClose();
      setRating(5);
      setComment("");
    } catch {
      toast.error("피드백 저장 중 오류가 발생했습니다");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedMenu = recommendedMenus.find(
    (m) => m.menu.menu_id === selectedMenuId
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">추천 피드백</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* 선택된 메뉴 표시 */}
          {selectedMenu && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">
                가장 마음에 든 메뉴
              </p>
              <p className="font-medium text-foreground">
                {selectedMenu.menu.menu_name}
              </p>
            </div>
          )}

          {/* 별점 */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              추천이 만족스러우셨나요?
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 의견 */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              의견을 남겨주세요 (선택)
            </label>
            <Textarea
              placeholder="추천 서비스에 대한 의견을 자유롭게 작성해주세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* 전송 버튼 */}
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                전송 중...
              </>
            ) : (
              "전송"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
