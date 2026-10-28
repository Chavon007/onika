import { jobDetails } from "@/lib/types";
import Image from "next/image";
import { FaMapPin } from "react-icons/fa";

interface ActiveJobProps {
  job: jobDetails;
}

function ActiveJob({ job }: ActiveJobProps) {
  return (
    <div className="">
      <div className="">
        {job.faceVerification && (
          <Image
            src={job.faceVerification}
            alt={job.artisanId?.fullName ?? "Artisan"}
            width={50}
            height={50}
            className=""
          />
        )}

        <div>
          <h3 className="">{job.artisanId?.fullName ?? "Artisan"}</h3>

          <small>{job.status.replaceAll("_", " ")}</small>

          <p className="">{new Date(job.createdAt).toLocaleDateString()}</p>

          <p className="">
            <FaMapPin />
            <span>{job.address ?? "Address unavailable"}</span>
          </p>
        </div>
      </div>

      <div className="">
        <h4 className="">
          {job.price.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
          })}
        </h4>

        <p className="">
          <span>🔒</span> Escrow held
        </p>
      </div>
    </div>
  );
}

export default ActiveJob;
