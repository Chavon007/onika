"use client";

import ProtectedRoute from "@/component/ProtectedRoute";
function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export default ProtectedLayout;
