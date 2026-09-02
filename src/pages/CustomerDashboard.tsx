"use client";
import useAuthStore from "@/store/authStore";
import { GoPlus } from "react-icons/go";
import Button from "@/component/button";
import Card from "@/component/card";
import { useState } from "react";
import Link from "next/link";
const ActiveTab = [
  {
    title: "Overview",
  },
  {
    title: "Active Jobs",
  },
  {
    title: "History",
  },
  {
    title: "Wallet & Escrow",
  },
];

const cardContent = [
  {
    description: "Active Jobs",
    icon: "🔨",
    amount: 2,
    background: "#dbeafe",
  },
  {
    description: "Jobs Completed",
    icon: "✅",
    amount: 11,
    background: "#dbeafe",
  },
  {
    description: "In Escrow",
    icon: "🔒",
    amount: "₦70000",
    background: "#fef3c7",
  },
  {
    description: "Total Spent",
    icon: "💸",
    amount: "₦200000",
    background: "#c9c6d8",
  },
];
function CustomerDashboard() {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const user = useAuthStore((state) => state.user);
  const [isActive, setIsActiveTab] = useState("Overview");
  return (
    <div className="min-h-screen w-full overflow-hidden pt-8 bg-background">
      <div className="container mx-auto w-full lg:w-[80%] flex flex-col gap-[30px] p-3">
        <section className="flex justify-between items-center">
          <div className="w-[50%] flex flex-col md:gap-1">
            <h3 className="text-base md:text-[30px] tracking-wide leading-10 font-serif text-[#1c1917] font-extrabold">
              Welcome, {user?.fullName?.split(" ")[0]}
            </h3>
            <p className="text-xs tracking-wide pl-1 font-light text-muted font-sans">
              {date}
            </p>
          </div>
          <Link
            href="/post-job"
            className="max-w-30 bg-primary w-full text-sm font-bold text-background rounded-xl p-3 flex flex-row items-center justify-center gap-2 hover:bg-accent/70"
          >
            <GoPlus className="shrink-0" />
            <span>Post a job</span>
          </Link>
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

        <section className="w-full ">
          {isActive === "Overview" && (
            <div className="grid  grid-cols-2 md:grid-cols-4 gap-4">
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

          {isActive === "Active Jobs" && (
            <div>
              <p>Coming soon</p>
            </div>
          )}

          {isActive === "History" && (
            <div>
              <p>coming soon</p>
            </div>
          )}

          {isActive === "Wallet & Escrow" && (
            <div>
              <p>coming</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default CustomerDashboard;
