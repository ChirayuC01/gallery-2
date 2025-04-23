// src/hooks/useAuthentication.ts
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthentication() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status from localStorage
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(auth);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const logout = () => {
    // Clear authentication from localStorage and cookies
    localStorage.removeItem("isAuthenticated");
    document.cookie = "isAuthenticated=false; path=/; max-age=0";
    setIsAuthenticated(false);
    router.push("/");
  };

  return { isAuthenticated, isLoading, logout };
}
