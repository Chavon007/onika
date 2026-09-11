"use client";
import useAuthStore from "@/store/authStore";
import { FiToggleRight } from "react-icons/fi";
import Card from "@/component/card";
import { useState } from "react";
import JobRequestpage from "./jobRequestPage";
import ActiveJobPage from "./ActiveJobpage";
const ActiveTab = [
  {
    title: "Overview",
  },
  {
    title: "Job Requests",
  },
  {
    title: "Active Jobs",
  },
  {
    title: "Earnings",
  },
];

const cardContent = [
  {
    description: "Pending Requests",
    icon: "📥",
    amount: 3,
    background: "#dbeafe",
  },
  {
    description: "Jobs Completed",
    icon: "✅",
    amount: 312,
    background: "#dbeafe",
  },
  {
    description: "Wallet Balance",
    icon: "💰",
    amount: 70000,
    background: "#fef3c7",
  },
  {
    description: "Rating",
    icon: "⭐",
    amount: 4,
    background: "#fef3c7",
  },
];

function ArtisanDashboard() {
  const user = useAuthStore((state) => state.user);
  const [isActive, setIsActiveTab] = useState("Overview");
  return (
    <div className="min-h-screen w-full overflow-hidden pt-8 bg-background">
      <div className="container mx-auto w-full lg:w-[80%] flex flex-col gap-[30px] p-3">
        <section className="flex items-center justify-between">
          {/* Welcome */}
          <div className="flex flex-col gap-2">
            <h3 className="text-base md:text-[30px] tracking-wide leading-10 font-serif text-[#1c1917] font-extrabold">
              Welcome, {user?.fullName?.split(" ")[0]}
            </h3>

            <div className="flex items-center gap-2 text-sm text-muted font-sans">
              <span>{user?.role}</span>
              <span className="text-gray-300">•</span>
              <span>
                {user?.state}, {user?.lga}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-[#1c1917] font-sans">
                Available for jobs
              </span>
              <span className="text-xs text-muted font-sans">
                Let clients know you're available
              </span>
            </div>

            <button
              type="button"
              className="text-[#1c1917] hover:opacity-70 transition-opacity"
              aria-label="Toggle job availability"
            >
              <FiToggleRight className="text-3xl" />
            </button>
          </div>
        </section>

        <section className="w-full border-b border-border pb-3 mt-4">
          <div className="flex w-full md:w-[45%] justify-between items-center">
            {ActiveTab.map((a) => (
              <h4
                className={`text-sm cursor-pointer font-sans font-bold pb-3 border-b-2 -mb-3 transition-colors ${
                  isActive === a.title
                    ? "text-muted border-text"
                    : "text-[#1c1917]/50 border-transparent"
                }`}
                key={a.title}
                onClick={() => setIsActiveTab(a.title)}
              >
                {a.title}
              </h4>
            ))}
          </div>
        </section>
        <section className="w-full">
          {" "}
          {isActive === "Overview" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cardContent.map((c) => (
                <div
                  className="bg-[#fff] w-full p-3 h-35 rounded rounded-xl border border-border"
                  key={c.description}
                >
                  <Card
                    desc={c.description}
                    amount={c.amount}
                    icon={c.icon}
                    background={c.background}
                  />
                </div>
              ))}
            </div>
          )}
          {isActive === "Job Requests" && (
            <div>
              <JobRequestpage />
            </div>
          )}
          {isActive === "Active Jobs" && (
            <div>
              <ActiveJobPage />
            </div>
          )}
          {isActive === "Earnings" && (
            <div>
              <p>coming soon</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ArtisanDashboard;
