"use client";

import {
  useGetJobDetails,
  useArtisanAcceptJob,
  useArtisanRejectJob,
} from "@/api/job";
import Button from "./button";

function JobDetails({
  jobId,
  onClose,
}: {
  jobId: string;
  onClose: () => void;
}) {
  const { data, isLoading, isError } = useGetJobDetails(jobId);
  const { mutate: acceptJob, isPending: isAccepting } = useArtisanAcceptJob();
  const { mutate: rejectJob, isPending: isRejecting } = useArtisanRejectJob();

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center">
        {" "}
        <div className="flex flex-col items-center gap-3">
          {" "}
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-primary" />{" "}
          <p className="font-sans text-sm font-medium text-muted">
            Loading job details...{" "}
          </p>{" "}
        </div>{" "}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center">
        {" "}
        <p className="font-sans text-sm font-medium text-muted">
          Failed to load job details.{" "}
        </p>{" "}
      </div>
    );
  }

  const formattedDate = new Date(data.createdAt).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white shadow-xl">
      {/* Header — fixed, never scrolls */}{" "}
      <div className="shrink-0 border-b border-border px-6 py-6 md:px-8">
        {" "}
        <div className="flex items-start justify-between gap-4">
          {" "}
          <div>
            {" "}
            <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-wider text-muted">
              Job Details{" "}
            </p>
            <h2 className="font-heading text-2xl font-bold text-text md:text-3xl">
              {data.category}
            </h2>
            <p className="mt-2 font-sans text-sm text-muted">
              Posted {formattedDate}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xl text-text transition hover:bg-border"
          >
            ×
          </button>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-secondary px-3 py-1.5 font-sans text-xs font-semibold capitalize text-text">
            {data.status.replace("_", " ")}
          </span>

          {data.priority && (
            <span className="rounded-full bg-primary/10 px-3 py-1.5 font-sans text-xs font-semibold text-primary">
              {data.priority}
            </span>
          )}
        </div>
      </div>
      {/* Content — the ONLY scrollable section */}
      <div className="flex-1 overflow-y-auto px-6 py-7 md:px-8">
        {/* Description */}
        <section>
          <p className="mb-3 font-sans text-xs font-bold uppercase tracking-wider text-muted">
            About this job
          </p>

          <div className="rounded-2xl bg-background p-5">
            <p className="font-sans text-sm leading-7 text-text">
              {data.description || "No description provided."}
            </p>
          </div>
        </section>

        {/* Job Information */}
        <section className="mt-7">
          <p className="mb-3 font-sans text-xs font-bold uppercase tracking-wider text-muted">
            Job information
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border p-4">
              <p className="font-sans text-xs text-muted">Budget</p>

              <p className="mt-1 font-sans text-lg font-bold text-text">
                ₦{data.price.toLocaleString()}
              </p>
            </div>

            <div className="rounded-2xl border border-border p-4">
              <p className="font-sans text-xs text-muted">Service</p>

              <p className="mt-1 font-sans text-base font-semibold capitalize text-text">
                {data.category}
              </p>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="mt-7">
          <p className="mb-3 font-sans text-xs font-bold uppercase tracking-wider text-muted">
            Location
          </p>

          <div className="rounded-2xl border border-border p-5">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg">
                📍
              </div>

              <div>
                <p className="font-sans text-sm font-semibold text-text">
                  {[data.city, data.lga].filter(Boolean).join(" · ") ||
                    "Location not provided"}
                </p>

                {data.address && (
                  <p className="mt-1 font-sans text-sm text-muted">
                    {data.address}
                  </p>
                )}

                {data.landmark && (
                  <p className="mt-2 font-sans text-xs text-muted">
                    Landmark:{" "}
                    <span className="font-medium text-text">
                      {data.landmark}
                    </span>
                  </p>
                )}

                {data.state && (
                  <p className="mt-1 font-sans text-xs text-muted">
                    {data.state}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Customer */}
        <section className="mt-7">
          <p className="mb-3 font-sans text-xs font-bold uppercase tracking-wider text-muted">
            Customer
          </p>

          <div className="rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary font-heading text-lg font-bold text-main">
                  {data.customerId.fullName.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-sans text-sm font-semibold text-text">
                    {data.customerId.fullName}
                  </p>

                  <p className="mt-1 font-sans text-sm text-muted">
                    {data.customerId.phoneNumber}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${data.customerId.phoneNumber}`}
                className="rounded-xl bg-secondary px-4 py-2 font-sans text-xs font-semibold text-main transition hover:bg-main hover:text-white"
              >
                Call
              </a>
            </div>
          </div>
        </section>

        {/* Images */}
        {data.images && data.images.length > 0 && (
          <section className="mt-7">
            <p className="mb-3 font-sans text-xs font-bold uppercase tracking-wider text-muted">
              Job photos
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {data.images.map((image, index) => (
                <div
                  key={image}
                  className="aspect-square overflow-hidden rounded-2xl bg-secondary"
                >
                  <img
                    src={image}
                    alt={`Job photo ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      {/* Actions — fixed, never scrolls */}
      <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-border bg-white px-6 py-5 md:px-8">
        <Button
          loadingText="Accepting..."
          type="submit"
          onClick={() => acceptJob(data._id)}
          disabled={isAccepting || isRejecting}
          className="bg-main text-white hover:bg-main/90"
        >
          Accept Job
        </Button>

        <Button
          loadingText="Declining..."
          type="submit"
          onClick={() => rejectJob(data._id)}
          disabled={isAccepting || isRejecting}
          className="border border-border bg-white text-muted hover:bg-secondary"
        >
          Decline
        </Button>
      </div>
    </div>
  );
}

export default JobDetails;
