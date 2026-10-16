import { useState } from "react";
import { useCustomerJobHistory } from "@/api/job";
import JobHistory from "@/component/JobHistoryCard";

function JobHistoryPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useCustomerJobHistory(page);

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

  const jobs = data?.jobs ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const total = data?.pagination?.total ?? 0;

  return (
    <div>
      {total > 0 ? (
        <JobHistory
          jobs={jobs}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      ) : (
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="rounded-xl border border-border bg-white px-8 py-5 font-heading text-sm font-medium text-muted shadow-sm">
            You have no job history yet!
          </p>
        </div>
      )}
    </div>
  );
}

export default JobHistoryPage;