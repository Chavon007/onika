import JobCard from "./JobCard";
import { useFetchArtisanPrivateBooking } from "@/api/job";
function PrivateJobRequest() {
  const {
    data: jobs,
    error,
    isLoading,
    isError,
  } = useFetchArtisanPrivateBooking();
  console.log(error);
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
          Failed to load jobs
        </p>
      </div>
    );

  return (
    <div className="flex flex-col gap-5">
      {jobs && jobs.length > 0 ? (
        jobs.map((job: any) => (
          <JobCard key={job._id} job={job} type="private" />
        ))
      ) : (
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="rounded-xl border border-border font-heading bg-white px-8 py-5 font-sans text-sm font-medium text-muted shadow-sm">
            No job update for you yet!
          </p>
        </div>
      )}
    </div>
  );
}

export default PrivateJobRequest;
