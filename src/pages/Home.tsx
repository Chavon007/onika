"use client";

import useAuthStore from "@/store/authStore";
import CustomerDashboard from "./CustomerDashboard";
import ArtisanDashboard from "./ArtisanDashboard";
function Dashboard() {
  const user = useAuthStore((state) => state.user);

  const role = user?.role ?? "customer";

  return role === "artisan" ? <ArtisanDashboard /> : <CustomerDashboard />;
}

export default Dashboard;
