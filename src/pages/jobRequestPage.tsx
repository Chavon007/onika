import { useFindJobForArtisan } from "@/api/job";
import JobCard from "@/component/JobCard";
function JobRequestpage() {
  const { data: jobs, isLoading, isError } = useFindJobForArtisan();

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div>
        <p>Failed to load jobs</p>
      </div>
    );
  return (
    <div>
      {jobs && jobs.length > 0 ? (
        jobs.map((job: any) => <JobCard key={job._id} job={job} />)
      ) : (
        <p>No job update for you yet!</p>
      )}
    </div>
  );
}
export default JobRequestpage;
