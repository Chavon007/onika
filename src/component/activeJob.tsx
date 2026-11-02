import { jobDetails } from "@/lib/types";
import Image from "next/image";
import { FaMapPin } from "react-icons/fa";

interface ActiveJobProps {
  job: jobDetails;
}

function ActiveJob({ job }: ActiveJobProps) {
  const artisanImage = job.artisanId?.artisanProfile?.faceVerification;

  const statusStyles: Record<string, string> = {
    pending:
      "bg-amber-50 text-amber-700 border-amber-200",
    accepted:
      "bg-blue-50 text-blue-700 border-blue-200",
    in_progress:
      "bg-orange-50 text-primary border-orange-200",
    completed:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled:
      "bg-red-50 text-red-700 border-red-200",
    rejected:
      "bg-red-50 text-red-700 border-red-200",
    disputed:
      "bg-purple-50 text-purple-700 border-purple-200",
  };

  const status = job.status.toLowerCase();
  const statusStyle =
    statusStyles[status] ?? "bg-secondary text-muted border-border";

  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-border bg-white p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-5">
      {/* Artisan Information */}
      <div className="flex min-w-0 items-start gap-3">
        {/* Artisan Avatar */}
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-secondary bg-secondary">
          {artisanImage ? (
            <Image
              src={artisanImage}
              alt={job.artisanId?.fullName ?? "Artisan"}
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-muted">
              {job.artisanId?.fullName?.charAt(0).toUpperCase() ?? "A"}
            </div>
          )}
        </div>

        {/* Job Details */}
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-heading text-base font-semibold text-main">
              {job.artisanId?.fullName ?? "Artisan"}
            </h3>

            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold capitalize tracking-wide ${statusStyle}`}
            >
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
              {job.status.replaceAll("_", " ")}
            </span>
          </div>

          {/* Date */}
          <p className="text-xs font-medium text-muted">
            <span className="text-text/70">Booked on </span>
            {new Date(job.createdAt).toLocaleDateString("en-NG", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>

          {/* Address */}
          <p className="flex items-start gap-1.5 text-xs text-muted">
            <FaMapPin className="mt-0.5 shrink-0 text-primary" />
            <span className="line-clamp-1">
              {job.address ?? "Address unavailable"}
            </span>
          </p>
        </div>
      </div>

      {/* Price & Escrow */}
      <div className="flex shrink-0 items-center justify-between gap-4 border-t border-border pt-3 sm:flex-col sm:items-end sm:gap-2 sm:border-0 sm:pt-0">
        <div>
          <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
            Job Amount
          </p>

          <h4 className="font-heading text-lg font-bold text-main">
            {job.price.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
              maximumFractionDigits: 0,
            })}
          </h4>
        </div>

        {/* Escrow Indicator */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
          <span className="text-xs">🔒</span>
          Escrow held
        </div>
      </div>
    </div>
  );
}

export default ActiveJob;