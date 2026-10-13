import Button from "./button";
import Image from "next/image";
interface BrowseArtisanProps {
  fullName: string;
  city: string;
  bio: string;
  skill: string[];
  experience: string;
  faceVerification: string;
}
function BrowseArtisan(data: BrowseArtisanProps) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-white p-5 font-sans transition-shadow hover:shadow-md">
      <Image
        src={data.faceVerification}
        alt={data.fullName}
        width={100}
        height={100}
        className="h-24 w-24 rounded-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-2">
        <h5 className="font-heading text-xl font-semibold text-main">
          {data.fullName}
        </h5>
        <div className="flex flex-wrap gap-2">
          {data.skill?.map((s, index) => (
            <p
              key={index}
              className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-text"
            >
              {s}
            </p>
          ))}
        </div>
        <p className="line-clamp-3 text-sm text-muted">{data.bio}</p>
        <p className="mt-auto flex items-center justify-between pt-2 text-sm text-muted">
          <span>{data.city}</span>
          <span>{data.experience}</span>
        </p>

        <Button>Book Now</Button>
      </div>
    </div>
  );
}

export default BrowseArtisan;