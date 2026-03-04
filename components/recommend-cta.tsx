"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function RecommendCTA() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <Link href="/recommend">
        <Button
          size="lg"
          className="rounded-full px-6 h-14 shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-base font-semibold"
        >
          <Sparkles className="w-5 h-5" />
          A-메추 (AI 메뉴 추천)
        </Button>
      </Link>
    </div>
  );
}
