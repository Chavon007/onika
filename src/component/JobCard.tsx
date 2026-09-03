import { JobSummary } from "@/lib/types";
import Button from "@/component/button";
function JobCard({ job }: { job: JobSummary }) {
  return (
    <div>
      <div>
        <h3>
          <span>{job.category}</span> <span>{job.priority}</span>
        </h3>
        <p>
          <span>Customer:</span>
          <span>{job.customerId.fullName}</span>
        </p>
        <p>
          <span></span>
          <span>{job.city}</span> <span>{job.lga}</span>
        </p>
        <p>
          <span>Price:</span> <span>{job.price}</span>
        </p>
        <p>{job.description}</p>
        <small>{job.createdAt}</small>

        <Button loadingText="Accepting..."   type="submit">
          Accept Job
        </Button>
        <Button loadingText="Declining..." type="submit">
          Decline
        </Button>
        <Button type="submit">View Details</Button>
      </div>
    </div>
  );
}

export default JobCard;
