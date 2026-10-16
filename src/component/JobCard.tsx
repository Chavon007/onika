import { useState } from "react";
import { JobSummary } from "@/lib/types";
import Button from "@/component/button";
import JobDetails from "./jobDetails";
import {
  useArtisanAcceptJob,
  useArtisanRejectJob,
  useAcceptPrivateJobBooking,
  useRejectPrivateJobBooking,
} from "@/api/job";

function JobCard({
  job,
  type = "public",
}: {
  job: JobSummary;
  type?: "public" | "private";
}) {
  const isPrivate = type === "private";
  const [showJobDetails, setShowJobDetails] = useState(false);
  const { mutate: acceptJob, isPending: isAccepting } = useArtisanAcceptJob();
  const { mutate: rejectJob, isPending: isRejecting } = useArtisanRejectJob();
  const { mutate: acceptPrivateJob, isPending: isAcceptingPrivate } =
    useAcceptPrivateJobBooking();
  const { mutate: rejectPrivateJob, isPending: isRejectingPrivate } =
    useRejectPrivateJobBooking();

  const isBusy =
    isAccepting || isRejecting || isAcceptingPrivate || isRejectingPrivate;

  const handleAceept = () => {
    if (isPrivate) {
      acceptPrivateJob(job._id);
    } else {
      acceptJob(job._id);
    }
  };

  const handleReject = () => {
    if (isPrivate) {
      rejectPrivateJob(job._id);
    } else {
      rejectJob(job._id);
    }
  };
  const formattedDate = new Date(job.createdAt).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const location = [job.city, job.lga].filter(Boolean).join(" · ");
  const title =
    job.category ?? (type === "private" ? "Private booking" : "Job");
  const initial = job.customerId?.fullName?.charAt(0).toUpperCase() ?? "?";

  return (
    <div className="w-full rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:shadow-md md:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary font-heading text-lg font-bold text-main">
            {initial}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-heading text-xl font-bold text-text md:text-2xl">
                {title}
              </h3>

              {type === "private" && (
                <span className="rounded-full bg-main/10 px-3 py-1 font-sans text-xs font-semibold text-main">
                  Private
                </span>
              )}

              {job.priority && (
                <span className="rounded-full bg-primary/10 px-3 py-1 font-sans text-xs font-semibold capitalize text-primary">
                  {job.priority}
                </span>
              )}
            </div>

            <p className="mt-1 font-sans text-sm text-muted">
              Customer:{" "}
              <span className="font-semibold text-text">
                {job.customerId?.fullName ?? "Unknown"}
              </span>
            </p>
          </div>
        </div>

        <span className="shrink-0 font-sans text-xs text-muted md:text-sm">
          {formattedDate}
        </span>
      </div>

      {/* Meta */}
      <div className="mt-4 flex flex-wrap gap-2 font-sans text-sm">
        <span className="rounded-xl bg-background px-3 py-2 text-muted">
          Budget:{" "}
          <span className="font-semibold text-text">
            ₦{job.price.toLocaleString()}
          </span>
        </span>

        {location && (
          <span className="rounded-xl bg-background px-3 py-2 text-muted">
            📍 <span className="font-medium text-text">{location}</span>
          </span>
        )}

        {job.date && (
          <span className="rounded-xl bg-background px-3 py-2 text-muted">
            Preferred date:{" "}
            <span className="font-medium text-text">
              {new Date(job.date).toLocaleDateString("en-NG", {
                dateStyle: "medium",
              })}
            </span>
          </span>
        )}
      </div>

      {/* Description */}
      <div className="mt-5 border-t border-border pt-4">
        <p className="mb-1.5 font-sans text-xs font-bold uppercase tracking-wider text-muted">
          Job description
        </p>
        <p className="line-clamp-3 max-w-4xl font-sans text-sm leading-6 text-text">
          {job.description || "No description provided."}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-5 grid grid-cols-1 gap-3 border-t border-border pt-4 md:grid-cols-3">
        <Button
          loadingText="Accepting..."
          type="button"
          onClick={handleAceept}
          disabled={isBusy}
          className="bg-main text-white hover:bg-main/90"
        >
          Accept Job
        </Button>

        <Button
          loadingText="Declining..."
          type="button"
          onClick={handleReject}
          disabled={isBusy}
          className="border border-border bg-white text-muted hover:bg-secondary"
        >
          Decline
        </Button>

        <Button
          type="button"
          onClick={() => setShowJobDetails(true)}
          className="border border-border bg-white text-main hover:bg-secondary"
        >
          View Details
        </Button>
      </div>

      {/* Details overlay */}
      {showJobDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowJobDetails(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl"
          >
            <JobDetails
              jobId={job._id}
              type={type}
              onClose={() => setShowJobDetails(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default JobCard;
