
"use client";

import useAuthStore from "@/store/authStore";
import { FiToggleRight } from "react-icons/fi";
import Card from "@/component/card";
import { useState } from "react";
import JobRequestpage from "./jobRequestPage";
import ActiveJobPage from "./ActiveJobpage";
import EscrowAndWalletPage from "./escrowAndWalletPage";
import ArtisanJobRequest from "@/component/artisanJobRequest";
import { MdArrowRightAlt } from "react-icons/md";
import { useFindJobForArtisan } from "@/api/job";
import { useGetWallet } from "@/api/wallet";
import { useArtisanCompletedJobNos } from "@/api/job";
import { formatNaira } from "@/ultiz/formatMoney";

const ActiveTab = [
  { title: "Overview" },
  { title: "Job Requests" },
  { title: "Active Jobs" },
  { title: "Earnings" },
];

function ArtisanDashboard() {
  const user = useAuthStore((state) => state.user);
  const [isActive, setIsActiveTab] = useState("Overview");

  const { data: job, isError, isLoading } = useFindJobForArtisan();
  const { data: wallet } = useGetWallet();
  const { data: completed } = useArtisanCompletedJobNos();

  const lateastJobRequest = [...(job ?? [])]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  const totalPendingJobRequest = job?.length ?? 0;
  const balance = wallet?.balance ?? 0;
  const jobCompleted = completed?.length ?? 0;

  const cardContent = [
    {
      description: "Pending Requests",
      icon: "📥",
      amount: totalPendingJobRequest,
      background: "#dbeafe",
    },
    {
      description: "Jobs Completed",
      icon: "✅",
      amount: jobCompleted,
      background: "#dbeafe",
    },
    {
      description: "Wallet Balance",
      icon: "💰",
      amount: formatNaira(balance),
      background: "#fef3c7",
    },
    {
      description: "Rating",
      icon: "⭐",
      amount: 4,
      background: "#fef3c7",
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
          <div className="flex flex-col gap-2">
            <h3 className="font-serif text-base font-extrabold leading-10 tracking-wide text-text md:text-[30px]">
              Welcome, {user?.fullName?.split(" ")[0]}
            </h3>

            <div className="flex items-center gap-2 font-sans text-sm text-muted">
              <span>{user?.role}</span>
              <span className="text-muted/50">•</span>
              <span>
                {user?.state}, {user?.lga}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="font-sans text-sm font-medium text-text">
                Available for jobs
              </span>
              <span className="font-sans text-xs text-muted">
                Let clients know you're available
              </span>
            </div>

            <button
              type="button"
              className="text-text transition-opacity hover:opacity-70"
              aria-label="Toggle job availability"
            >
              <FiToggleRight className="text-3xl" />
            </button>
          </div>
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
                    className="h-35 w-full rounded-xl border border-border bg-background p-3 transition-colors duration-300"
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

              {/* Latest job requests */}
              <div className="rounded-2xl border border-border bg-background py-2 transition-colors duration-300">
                <section className="flex items-center justify-between border-b border-border p-3">
                  <h3 className="font-heading text-sm font-bold uppercase text-text">
                    New Job Requests
                  </h3>

                  <button
                    className="flex cursor-pointer items-center font-sans text-xs text-primary transition-colors hover:text-primary/60"
                    type="button"
                    onClick={() => setIsActiveTab("Job Requests")}
                  >
                    <span>View all</span>
                    <MdArrowRightAlt />
                  </button>
                </section>

                <section>
                  {lateastJobRequest.length > 0 ? (
                    lateastJobRequest.map((j) => (
                      <ArtisanJobRequest key={j._id} job={j} />
                    ))
                  ) : (
                    <div className="flex h-auto items-center justify-center py-4">
                      <p className="rounded-xl border border-border bg-secondary px-8 py-5 font-sans text-sm font-medium text-muted shadow-sm">
                        You have no job requests yet!
                      </p>
                    </div>
                  )}
                </section>
              </div>
            </div>
          )}

          {isActive === "Job Requests" && <JobRequestpage />}

          {isActive === "Active Jobs" && <ActiveJobPage />}

          {isActive === "Earnings" && <EscrowAndWalletPage />}
        </section>
      </div>
    </div>
  );
}

export default ArtisanDashboard;
