"use client";

import { jobDetails } from "@/lib/types";
import Button from "./button";
import { useArtisanCompleteJob, useArtisanJobInprogress } from "@/api/job";

function activeJobCard({ job }: { job: jobDetails }) {
  const formattedDate = new Date(job.createdAt).toLocaleString("en-NG");
  const { mutate: completed, isPending: isCompleted } = useArtisanCompleteJob();
  const { mutate: in_progress, isPending: isInprogress } =
    useArtisanJobInprogress();

  return (
    <div>
      <div>
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

      {/* Actions */}

      <div>
        <Button
          loadingText="Starting..."
          type="submit"
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
          onClick={() => completed(job._id)}
          disabled={isCompleted || isInprogress || job.status !== "in_progress"}
        >
          {job.status === "completed" ? "Completed" : "Mark job as completed"}
        </Button>

        <Button type="button">Message Customer</Button>
      </div>
    </div>
  );
}

export default activeJobCard;
