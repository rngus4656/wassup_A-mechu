// 사용자 컨텍스트 (디버그용 사용자 전환)
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { users } from "./mock-data";

interface UserContextType {
  userId: number;
  setUserId: (id: number) => void;
  user: (typeof users)[0] | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState(1);
  const user = users.find((u) => u.user_id === userId);

  return (
    <UserContext.Provider value={{ userId, setUserId, user }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
