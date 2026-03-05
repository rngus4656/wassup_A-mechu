"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    setPlaceholder("맛집이나 메뉴를 검색해보세요");
  }, []);

  return (
    <div className="px-4 py-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          className="pl-10 h-12 bg-muted border-0 rounded-xl text-foreground placeholder:text-muted-foreground"
          readOnly
        />
      </div>
    </div>
  );
}
