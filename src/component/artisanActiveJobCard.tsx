"use client";

import { jobDetails } from "@/lib/types";
import Button from "./button";
import { useArtisanCompleteJob, useArtisanJobInprogress } from "@/api/job";
import { formatNaira } from "@/ultiz/formatMoney";

export function ActiveJobCard({ job }: { job: jobDetails }) {
  const formattedDate = new Date(job.createdAt).toLocaleString("en-NG");

  const { mutate: completed, isPending: isCompleted } = useArtisanCompleteJob();

  const { mutate: in_progress, isPending: isInprogress } =
    useArtisanJobInprogress();

  const isJobInProgress = job.status === "in_progress";
  const isJobCompleted = job.status === "completed";
  const canCompleteJob = isJobInProgress;

  return (
    <div className="w-full rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-heading text-2xl font-bold text-text">
              {job.category}
            </h3>

            <span className="rounded-full bg-primary/10 px-3 py-1 font-sans text-xs font-semibold capitalize text-primary">
              {job.priority}
            </span>
          </div>

          <p className="font-sans text-sm text-muted">
            Customer:{" "}
            <span className="font-semibold text-text">
              {job.customerId?.fullName}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <span>📍</span>
              {job.address}
            </span>

            <span>
              Budget:{" "}
              <span className="font-semibold text-text">
                {formatNaira(job.price)}
              </span>
            </span>
          </div>
        </div>

        <span className="shrink-0 font-sans text-xs text-muted">
          {formattedDate}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-6 grid grid-cols-1 gap-3 border-t border-border pt-5 md:grid-cols-3">
        {/* Start Job */}
        <Button
          loadingText="Starting..."
          type="button"
          className={`transition-colors ${
            isJobInProgress
              ? "cursor-default border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
              : isJobCompleted
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-green-500 text-white hover:bg-main/90"
          }`}
          onClick={() => in_progress(job._id)}
          disabled={isCompleted || isInprogress || job.status !== "accepted"}
        >
          {isJobInProgress || isJobCompleted
            ? "✓ Job in progress"
            : "Mark job as in progress"}
        </Button>

        {/* Complete Job */}
        <Button
          loadingText="Completing..."
          type="button"
          className={`transition-colors ${
            isJobCompleted
              ? "cursor-default border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
              : canCompleteJob
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400 opacity-70"
          }`}
          onClick={() => {
            if (canCompleteJob) {
              completed(job._id);
            }
          }}
          disabled={
            isCompleted || isInprogress || !canCompleteJob || isJobCompleted
          }
        >
          {isJobCompleted ? "✓ Job completed" : "Mark job as completed"}
        </Button>

        {/* Message Customer */}
        <Button
          type="button"
          className="border border-border bg-white text-main transition-colors hover:bg-secondary"
        >
          Message Customer
        </Button>
      </div>
    </div>
  );
}
