"use client";

import { jobDetails } from "@/lib/types";
import Button from "./button";
import toast from "react-hot-toast";
import { useArtisanCompleteJob, useArtisanJobInprogress } from "@/api/job";

export function ActiveJobCard({ job }: { job: jobDetails }) {
  const formattedDate = new Date(job.createdAt).toLocaleString("en-NG");
  const { mutate: completed, isPending: isCompleted } = useArtisanCompleteJob();
  const { mutate: in_progress, isPending: isInprogress } =
    useArtisanJobInprogress();

  return (  
    <div className="w-full rounded-2xl border border-border bg-white p-6 shadow-sm">
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

          {/* customer */}
          <p className="font-sans text-base text-muted">
            Customer:{" "}
            <span className="font-semibold text-text">
              {job.customerId.fullName}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <span className="text-base">📍</span>
              {job.address}
            </span>

            <span>
              Budget:{" "}
              <span className="font-semibold text-text">
                ₦{job.price.toLocaleString()}
              </span>
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <span className="font-sans text-sm text-muted">{formattedDate}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 grid grid-cols-1 gap-3 border-t border-border pt-5 md:grid-cols-3">
        <Button
          loadingText="Starting..."
          type="submit"
          className="bg-main text-white hover:bg-main/90"
          onClick={() => in_progress(job._id)}
          disabled={isCompleted || isInprogress || job.status !== "accepted"}
        >
          {job.status === "in_progress" || job.status === "completed"
            ? "Job is in progress"
            : "Mark job as in progress"}
        </Button>

        <Button
          loadingText="Completing..."
          type="submit"
          className="border border-border bg-white text-muted hover:bg-secondary"
          onClick={() => {
            if (job.status !== "in_progress") {
              toast.error("Start the job before marking it completed");
              return;
            }
            completed(job._id);
          }}
          disabled={isCompleted || isInprogress || job.status !== "in_progress"}
        >
          {job.status === "completed" ? "Completed" : "Mark job as completed"}
        </Button>

        <Button
          type="button"
          className="border border-border bg-white text-main hover:bg-secondary"
        >
          Message Customer
        </Button>
      </div>
    </div>
  );
}
