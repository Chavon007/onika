import { jobDetails } from "@/lib/types";
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
  inprogress: "bg-amber-100 text-amber-700",
};

function JobHistory({ jobs }: { jobs: jobDetails[] }) {
  return (
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
                {j.category}
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
                    statusStyles[j.status?.toLowerCase().replace(/[-_\s]/g, "")] ??
                    "bg-secondary text-muted"
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
  );
}

export default JobHistory;