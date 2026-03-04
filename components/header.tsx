"use client";

import { MapPin, ChevronDown } from "lucide-react";
import { useUser } from "@/lib/user-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { users } from "@/lib/mock-data";

export function Header() {
  const { userId, setUserId, user } = useUser();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        {/* 위치 표시 */}
        <div className="flex items-center gap-1 text-foreground">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="font-medium">서울 강남구</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* 디버그용 사용자 전환 */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">테스트:</span>
          <Select
            value={String(userId)}
            onValueChange={(value) => setUserId(parseInt(value, 10))}
          >
            <SelectTrigger className="w-[140px] h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {users.map((u) => (
                <SelectItem key={u.user_id} value={String(u.user_id)}>
                  {u.nickname} ({u.user_grade})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
