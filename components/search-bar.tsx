"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const PLACEHOLDER_TEXT = "\uB9DB\uC9D1\uC774\uB098 \uBA54\uB274\uB97C \uAC80\uC0C9\uD574\uBCF4\uC138\uC694";

export function SearchBar() {
  return (
    <div className="px-4 py-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder={PLACEHOLDER_TEXT}
          className="pl-10 h-12 bg-muted border-0 rounded-xl text-foreground placeholder:text-muted-foreground"
          readOnly
        />
      </div>
    </div>
  );
}
