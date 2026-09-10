import { JobSummary } from "@/lib/types";
import Button from "@/component/button";
import { useArtisanAcceptJob, useArtisanRejectJob } from "@/api/job";
function JobCard({ job }: { job: JobSummary }) {
  const formattedDate = new Date(job.createdAt).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const { mutate: acceptJob, isPending: isAccepting } = useArtisanAcceptJob();
  const { mutate: rejectJob, isPending: isRejecting } = useArtisanRejectJob();
  return (
    <div className="w-full rounded-2xl border border-border bg-white p-6 shadow-sm">
      {/* Job Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3">
          {/* Service + Priority */}
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-heading text-2xl font-bold text-text">
              {job.category}
            </h3>

            <span className="rounded-full bg-primary/10 px-3 py-1 font-sans text-xs font-semibold capitalize text-primary">
              {job.priority}
            </span>
          </div>

          {/* Customer */}
          <p className="font-sans text-base text-muted">
            Customer:{" "}
            <span className="font-semibold text-text">
              {job.customerId.fullName}
            </span>
          </p>

          {/* Location + Price */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <span className="text-base">📍</span>
              {job.city} · {job.lga}
            </span>

            <span>
              Budget:{" "}
              <span className="font-semibold text-text">
                ₦{job.price.toLocaleString()}
              </span>
            </span>
          </div>
        </div>

        {/* Created Date */}
        <div className="shrink-0">
          <span className="font-sans text-sm text-muted">{formattedDate}</span>
        </div>
      </div>

      {/* Description */}
      <div className="mt-5 border-t border-border pt-5">
        <p className="mb-2 font-sans text-sm font-semibold text-text">
          Job Description
        </p>

        <p className="max-w-4xl font-sans text-sm leading-6 text-muted">
          {job.description}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 grid grid-cols-1 gap-3 border-t border-border pt-5 md:grid-cols-3">
        <Button
          loadingText="Accepting..."
          type="submit"
          onClick={() => acceptJob(job._id)}
          disabled={isAccepting || isRejecting}
          className="bg-main text-white hover:bg-main/90"
        >
          Accept Job
        </Button>

        <Button
          loadingText="Declining..."
          type="submit"
          onClick={() => rejectJob(job._id)}
          disabled={isAccepting || isRejecting}
          className="border border-border bg-white text-muted hover:bg-secondary"
        >
          Decline
        </Button>

        <Button
          type="submit"
          className="border border-border bg-white text-main hover:bg-secondary"
        >
          View Details
        </Button>
      </div>
    </div>
  );
}

export default JobCard;
