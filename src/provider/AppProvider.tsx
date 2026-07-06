"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
interface AppProviderProps {
  children: React.ReactNode;
}
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
