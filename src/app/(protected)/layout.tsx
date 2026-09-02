"use client";

import ProtectedRoute from "@/component/ProtectedRoute";
import Header from "@/component/header";
function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <Header />
      {children}
    </ProtectedRoute>
  );
}

export default ProtectedLayout;
