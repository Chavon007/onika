"use client";
import useAuthStore from "@/store/authStore";
import { GoPlus } from "react-icons/go";
import Button from "@/component/button";
import Card from "@/component/card";
import { useState } from "react";
import Link from "next/link";
import EscrowAndWalletPage from "./escrowAndWalletPage";
import JobHistoryPage from "./jobHistoryPage";
import { CustomerActiveJobPage } from "./CustomerActiveJobPage";
import { useCustomerActiveJob } from "@/api/job";
import { MdArrowRightAlt } from "react-icons/md";
import ActiveJob from "@/component/activeJob";
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
  const { data: job, isError, isLoading } = useCustomerActiveJob();

  const latestJobs = [...(job ?? [])]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-main" />

          <p className="font-sans text-sm font-medium text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="font-sans text-sm font-medium text-muted">
          Failed to load jobs
        </p>
      </div>
    );
  }

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

        <section className="w-full border-b border-border pb-3 mt-4 ">
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
            <div>
              <div className="grid  grid-cols-2 md:grid-cols-4 gap-4">
                {cardContent.map((c) => (
                  <div
                    className="bg-[#fff] w-full p-3 h-auto rounded rounded-xl border border-border"
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

              <div>
                <section>
                  <h3>Active Jobs</h3>

                  <button
                    type="button"
                    onClick={() => setIsActiveTab("Active Jobs")}
                  >
                    <span>View all</span>
                    <MdArrowRightAlt />
                  </button>
                </section>

                <section>
                  {latestJobs.length > 0 ? (
                    latestJobs.map((j) => <ActiveJob key={j._id} job={j} />)
                  ) : (
                    <div className="flex min-h-[60vh] items-center justify-center">
                      <p className="rounded-xl border border-border font-heading bg-white px-8 py-5 font-sans text-sm font-medium text-muted shadow-sm">
                        You have no active jobs yet!
                      </p>
                    </div>
                  )}
                </section>
              </div>
            </div>
          )}

          {isActive === "Active Jobs" && (
            <div>
              <CustomerActiveJobPage />
            </div>
          )}

          {isActive === "History" && (
            <div>
              <JobHistoryPage />
            </div>
          )}

          {isActive === "Wallet & Escrow" && (
            <div>
              <EscrowAndWalletPage />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default CustomerDashboard;
