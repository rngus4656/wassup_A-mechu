"use client";

import { MENU_CATEGORIES, MenuCategory } from "@/lib/types";

const categoryIcons: Record<MenuCategory, string> = {
  한식: "🍚",
  중식: "🥡",
  일식: "🍣",
  양식: "🍝",
  분식: "🍢",
  치킨: "🍗",
  피자: "🍕",
  버거: "🍔",
  샐러드: "🥗",
  "카페/디저트": "☕",
};

export function CategoryChips() {
  return (
    <div className="px-4 py-4">
      <h2 className="text-lg font-semibold mb-3 text-foreground">카테고리</h2>
      <div className="grid grid-cols-5 gap-3">
        {MENU_CATEGORIES.map((category) => (
          <button
            key={category}
            className="flex flex-col items-center gap-1 p-2 rounded-xl bg-card hover:bg-accent transition-colors"
          >
            <span className="text-2xl">{categoryIcons[category]}</span>
            <span className="text-xs text-foreground font-medium">
              {category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
