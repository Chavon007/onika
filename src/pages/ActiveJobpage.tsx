
import { ActiveJobCard } from "@/component/artisanActiveJobCard";
import { useArtisanActiveJob } from "@/api/job";

function ActiveJobPage() {
  const { data: job, isLoading, isError } = useArtisanActiveJob();

  if (isLoading)
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-main" />

          <p className="font-sans text-sm font-medium text-muted">
            Loading...
          </p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background">
        <p className="font-sans text-sm font-medium text-muted">
          Failed to load jobs
        </p>
      </div>
    );

  return (
    <div className="flex flex-col gap-2 bg-background transition-colors duration-300">
      {job && job.length > 0 ? (
        job.map((j: any) => <ActiveJobCard key={j._id} job={j} />)
      ) : (
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="rounded-xl border border-border bg-secondary px-8 py-5 font-sans text-sm font-medium text-muted shadow-sm">
            You have no active jobs yet!
          </p>
        </div>
      )}
    </div>
  );
}

export default ActiveJobPage;
