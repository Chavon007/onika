"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import auth from "@/api/auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, login, logout } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const freshUser = await auth.fetchMeFn();
        login(freshUser, freshUser.verified);
      } catch {
        logout();
        router.replace("/login");
      } finally {
        setChecking(false);
      }
    };
    verifySession();
  }, []);

  if (!isAuthenticated && checking) {
    return (
      <div className="flex gap-2 min-h-screen items-center justify-center text-accent">
        <AiOutlineLoading3Quarters className="animate-spin text-2xl  " />
        <p> Loading...</p>
      </div>
    );
  }
  if (!isAuthenticated) {
    return null;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
