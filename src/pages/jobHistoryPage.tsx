import { useCustomerJobHistory } from "@/api/job";
import JobHistory from "@/component/JobHistoryCard";

function JobHistoryPage() {
  const { data, isLoading, isError } = useCustomerJobHistory();

  if (isLoading)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-main" />

          <p className="font-sans text-sm font-medium text-muted">Loading...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="font-sans text-sm font-medium text-muted">
          Failed to load job history
        </p>
      </div>
    );

  const jobs = data ?? [];

  return (
    <div>
      {jobs && jobs.length > 0 ? (
        <JobHistory jobs={jobs} />
      ) : (
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="rounded-xl border border-border font-heading bg-white px-8 py-5 font-sans text-sm font-medium text-muted shadow-sm">
            No have no history job yet!
          </p>
        </div>
      )}
    </div>
  );
}

export default JobHistoryPage;
