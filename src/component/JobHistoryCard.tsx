import { jobDetails } from "@/lib/types";
import { useState } from "react";
import { useCustomerJobHistory } from "@/api/job";
const historyHead = [
  {
    title: "Service",
  },
  {
    title: "Artisan",
  },
  {
    title: "Date",
  },
  {
    title: "Amount",
  },
  {
    title: "Status",
  },
];

const statusStyles: Record<string, string> = {
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
  rejected: "bg-red-100 text-red-600",
  inprogress: "bg-amber-100 text-amber-700",
  awaitingconfirmation: "bg-amber-100 text-amber-700",
  accepted: "bg-blue-100 text-blue-700",
};
function JobHistory({
  jobs,
  page,
  totalPages,
  onPageChange,
}: {
  jobs: jobDetails[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto rounded-2xl border border-border bg-white font-sans">
        <table className="w-full min-w-160 border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              {historyHead.map((h) => (
                <th
                  key={h.title}
                  className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-muted"
                >
                  {h.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {jobs.map((j) => (
              <tr
                key={j._id}
                className="border-b border-border last:border-b-0 transition-colors hover:bg-background"
              >
                <td className="px-5 py-4 text-sm font-medium text-main">
                  {j.category ??
                    (j.type === "private" ? "private booking" : "-")}
                </td>
                <td className="px-5 py-4 text-sm text-muted">
                  {j.artisanId?.fullName ?? "—"}
                </td>
                <td className="px-5 py-4 text-sm text-muted">
                  {new Date(j.createdAt).toLocaleDateString("en-NG")}
                </td>
                <td className="px-5 py-4 text-sm font-medium text-main">
                  ₦{j.price.toLocaleString()}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                      statusStyles[
                        j.status?.toLowerCase().replace(/[-_\s]/g, "")
                      ] ?? "bg-secondary text-muted"
                    }`}
                  >
                    {j.status?.replace(/[-_]/g, " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          className="rounded-full border cursor-pointer px-4 py-2 text-sm disabled:opacity-50 font-sans"
        >
          Previous
        </button>

        <span className="text-sm text-muted">
          Page {page} of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          disabled={page >= totalPages}
          className="rounded-full border cursor-pointer px-4 py-2 text-sm disabled:opacity-50 font-sans"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default JobHistory;
