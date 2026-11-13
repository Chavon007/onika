
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
import { useCustomerTotalSpent } from "@/api/job";
import { useCustomerCompletedJobsNos } from "@/api/job";
import { formatNaira } from "@/ultiz/formatMoney";
import { useCustomerAmountInEscrow } from "@/api/escrow";

const ActiveTab = [
  { title: "Overview" },
  { title: "Active Jobs" },
  { title: "History" },
  { title: "Wallet & Escrow" },
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
  const { data: totalSpent } = useCustomerTotalSpent();
  const { data: completedJobs } = useCustomerCompletedJobsNos();
  const { data: amount } = useCustomerAmountInEscrow();

  const latestJobs = [...(job ?? [])]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  const totalActiveJob = job?.length ?? 0;
  const completedJob = completedJobs?.length ?? 0;
  const escrowBalance = amount ?? 0;

  const cardContent = [
    {
      description: "Active Jobs",
      icon: "🔨",
      amount: totalActiveJob,
      background: "#dbeafe",
    },
    {
      description: "Jobs Completed",
      icon: "✅",
      amount: completedJob,
      background: "#dbeafe",
    },
    {
      description: "In Escrow",
      icon: "🔒",
      amount: formatNaira(escrowBalance),
      background: "#fef3c7",
    },
    {
      description: "Total Spent",
      icon: "💸",
      amount: formatNaira(totalSpent),
      background: "#c9c6d8",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-main" />
          <p className="font-sans text-sm font-medium text-muted">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background">
        <p className="font-sans text-sm font-medium text-muted">
          Failed to load jobs
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-hidden bg-background pt-24 transition-colors duration-300">
      <div className="container mx-auto flex w-full flex-col gap-[30px] p-3 lg:w-[80%]">
        {/* Welcome */}
        <section className="flex items-center justify-between gap-3">
          <div className="flex flex w-[50%] flex-col md:gap-1">
            <h3 className="font-serif text-base font-extrabold leading-10 tracking-wide text-text md:text-[30px]">
              Welcome, {user?.fullName?.split(" ")[0]}
            </h3>

            <p className="pl-1 font-sans text-xs font-light tracking-wide text-muted">
              {date}
            </p>
          </div>

          <Link
            href="/post-job"
            className="flex w-full max-w-30 flex-row items-center justify-center gap-2 rounded-xl bg-primary p-3 font-sans text-sm font-bold text-white transition-colors hover:bg-primary/80"
          >
            <GoPlus className="shrink-0" />
            <span>Post a job</span>
          </Link>
        </section>

        {/* Tabs */}
        <section className="mt-4 w-full border-b border-border pb-3">
          <div className="flex w-full items-center justify-between md:w-[60%] lg:w-[45%]">
            {ActiveTab.map((a) => (
              <h4
                className={`-mb-3 cursor-pointer border-b-2 pb-3 font-sans text-sm font-bold transition-colors ${
                  isActive === a.title
                    ? "border-primary text-primary"
                    : "border-transparent text-muted/60 hover:text-text"
                }`}
                key={a.title}
                onClick={() => setIsActiveTab(a.title)}
              >
                {a.title}
              </h4>
            ))}
          </div>
        </section>

        {/* Dashboard content */}
        <section className="w-full">
          {isActive === "Overview" && (
            <div className="flex flex-col gap-8">
              {/* Summary cards */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {cardContent.map((c) => (
                  <div
                    className="h-auto w-full rounded-xl border border-border bg-background p-3 transition-colors duration-300"
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

              {/* Active jobs */}
              <div className="rounded-2xl border border-border bg-background py-2 transition-colors duration-300">
                <section className="flex items-center justify-between border-b border-border p-3">
                  <h3 className="font-heading text-sm font-bold uppercase text-text">
                    Active Jobs
                  </h3>

                  <button
                    className="flex cursor-pointer items-center font-sans text-xs text-primary transition-colors hover:text-primary/60"
                    type="button"
                    onClick={() => setIsActiveTab("Active Jobs")}
                  >
                    <span>View all</span>
                    <MdArrowRightAlt />
                  </button>
                </section>

                <section>
                  {latestJobs.length > 0 ? (
                    latestJobs.map((j) => (
                      <ActiveJob key={j._id} job={j} />
                    ))
                  ) : (
                    <div className="flex h-auto items-center justify-center py-4">
                      <p className="rounded-xl border border-border bg-secondary px-8 py-5 font-sans text-sm font-medium text-muted shadow-sm">
                        You have no active jobs yet!
                      </p>
                    </div>
                  )}
                </section>
              </div>
            </div>
          )}

          {isActive === "Active Jobs" && <CustomerActiveJobPage />}

          {isActive === "History" && <JobHistoryPage />}

          {isActive === "Wallet & Escrow" && <EscrowAndWalletPage />}
        </section>
      </div>
    </div>
  );
}

export default CustomerDashboard;
