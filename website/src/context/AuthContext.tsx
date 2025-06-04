"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  username: string | null;
  setUsername: (username: string | null) => void;
  isAuthReady: boolean;
}

const AuthContext = createContext<AuthContextType>({
  username: null,
  setUsername: () => {},
  isAuthReady: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsernameState] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // Lấy username ngay khi mount
    const stored = localStorage.getItem("username");
    if (stored) setUsernameState(stored);
    setIsAuthReady(true);
  }, []);

  const setUsername = (name: string | null) => {
    setUsernameState(name);
    if (name) {
      localStorage.setItem("username", name);
    } else {
      localStorage.removeItem("username");
    }
  };

  return (
    <AuthContext.Provider value={{ username, setUsername, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}