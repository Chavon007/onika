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
function JobHistory({ jobs }: { jobs: jobDetails[] }) {
  return (
    <table>
      <thead>
        <tr>
          {historyHead.map((h) => (
            <th key={h.title}>{h.title}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {jobs.map((j) => (
          <tr key={j._id}>
            <td>{j.category}</td>
            <td>{j.artisanId?.fullName ?? "—"}</td>
            <td>{new Date(j.createdAt).toLocaleDateString("en-NG")}</td>
            <td>₦{j.price.toLocaleString()}</td>
            <td>{j.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default JobHistory;
