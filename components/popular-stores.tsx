"use client";

import { Star, Clock, MapPin } from "lucide-react";
import { stores, menus, reviews, orderMenus } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

// 매장별 평균 평점 계산
function getStoreRating(businessNum: string): { avg: number; count: number } {
  const storeMenuIds = menus
    .filter((m) => m.business_num === businessNum)
    .map((m) => m.menu_id);

  const orderIds = orderMenus
    .filter((om) => storeMenuIds.includes(om.menu_id))
    .map((om) => om.order_id);

  const storeReviews = reviews.filter((r) => orderIds.includes(r.order_id));

  if (storeReviews.length === 0) {
    return { avg: 4.0, count: 0 };
  }

  const sum = storeReviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    avg: sum / storeReviews.length,
    count: storeReviews.length,
  };
}

export function PopularStores() {
  // 상위 4개 매장
  const popularStores = stores.slice(0, 4).map((store) => {
    const storeMenus = menus.filter(
      (m) => m.business_num === store.business_num
    );
    const rating = getStoreRating(store.business_num);
    return {
      ...store,
      firstMenu: storeMenus[0],
      rating,
    };
  });

  return (
    <div className="px-4 py-4">
      <h2 className="text-lg font-semibold mb-3 text-foreground">인기 맛집</h2>
      <div className="grid grid-cols-2 gap-3">
        {popularStores.map((store, index) => (
          <Card
            key={store.business_num}
            className="overflow-hidden border-0 shadow-sm"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={store.firstMenu?.menu_img || "/placeholder.svg"}
                alt={store.store_name}
                fill
                className="object-cover"
                priority={index < 2}
              />
            </div>
            <CardContent className="p-3">
              <h3 className="font-semibold text-sm text-foreground truncate">
                {store.store_name}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-primary text-primary" />
                  <span>{store.rating.avg.toFixed(1)}</span>
                  <span>({store.rating.count})</span>
                </div>
                <span className="text-border">|</span>
                <div className="flex items-center gap-0.5">
                  <Clock className="w-3 h-3" />
                  <span>25-35분</span>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span className="truncate">
                  {store.address.split(" ").slice(1, 3).join(" ")}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
