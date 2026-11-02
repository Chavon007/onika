"use client";

import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { formatNaira } from "@/ultiz/formatMoney";

interface JobRequestCardProps {
  job: {
    _id: string;
    category: string;
    priority: "ASAP" | "Today" | "This week" | "Flexible";
    city: string;
    lga: string;
    price: number;
    description: string;
    createdAt: string;
  };
}

export default function JobRequestCard({ job }: JobRequestCardProps) {
  const createdDate = new Date(job.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex items-start gap-4 p-5">
      {/* Customer Avatar */}
      <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
        <FaUser className="text-gray-400 text-xl" />
      </div>

      {/* Job Information */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="text-base font-semibold text-gray-900 truncate">
              {job.category}
            </h3>

            <span
              className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                job.priority === "ASAP"
                  ? "bg-red-100 text-red-700"
                  : job.priority === "Today"
                    ? "bg-orange-100 text-orange-700"
                    : job.priority === "This week"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
              }`}
            >
              {job.priority}
            </span>
          </div>

          <span className="text-xs text-gray-400 whitespace-nowrap">
            {createdDate}
          </span>
        </div>

        {/* Location and Budget */}
        <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-500">
          <FaMapMarkerAlt className="text-red-500 text-xs shrink-0" />
          <span>
            {job.city}, {job.lga}
          </span>
          <span>·</span>
          <span>{formatNaira(job.price)}</span>
        </div>

        {/* Short Description */}
        <p className="text-sm text-gray-600 mt-1.5 line-clamp-1">
          {job.description}
        </p>
      </div>
    </div>
  );
}
