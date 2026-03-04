"use client";

import { Star, MapPin, Truck, Banknote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RecommendedMenu } from "@/lib/types";
import Image from "next/image";

interface MenuCardProps {
  item: RecommendedMenu;
  rank: number;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function MenuCard({ item, rank, isSelected, onSelect }: MenuCardProps) {
  const { menu, store, avgRating, reviewCount, reasons } = item;

  const rankColors = [
    "bg-primary text-primary-foreground",
    "bg-secondary text-secondary-foreground",
    "bg-muted text-muted-foreground",
  ];

  return (
    <Card
      className={`overflow-hidden transition-all cursor-pointer ${
        isSelected
          ? "ring-2 ring-primary shadow-lg"
          : "hover:shadow-md"
      }`}
      onClick={onSelect}
    >
      <div className="relative">
        {/* 순위 뱃지 */}
        <div
          className={`absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
            rankColors[rank - 1] || rankColors[2]
          }`}
        >
          {rank}
        </div>

        {/* 메뉴 이미지 */}
        <div className="relative aspect-[16/10]">
          <Image
            src={menu.menu_img}
            alt={menu.menu_name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <CardContent className="p-4">
        {/* 메뉴 정보 */}
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-lg text-foreground">
              {menu.menu_name}
            </h3>
            <span className="font-bold text-primary whitespace-nowrap">
              {menu.price.toLocaleString()}원
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{menu.menu_info}</p>
        </div>

        {/* 평점 및 카테고리 */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-medium text-foreground">
              {avgRating.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">
              ({reviewCount})
            </span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {menu.category}
          </Badge>
        </div>

        {/* 추천 이유 */}
        <div className="flex flex-wrap gap-1 mb-3">
          {reasons.map((reason, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className="text-xs bg-primary/5 border-primary/20 text-primary"
            >
              {reason}
            </Badge>
          ))}
        </div>

        {/* 매장 정보 */}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-sm font-medium text-foreground">
              {store.store_name}
            </span>
            <Badge variant="secondary" className="text-xs">
              근처 매장
            </Badge>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{store.address.split(" ").slice(1, 3).join(" ")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Truck className="w-3 h-3" />
              <span>{store.delivery_type}</span>
            </div>
            <div className="flex items-center gap-1">
              <Banknote className="w-3 h-3" />
              <span>최소 {store.min_pay.toLocaleString()}원</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
