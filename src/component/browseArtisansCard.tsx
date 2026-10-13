import Button from "./button";
import Image from "next/image";

interface BrowseArtisanProps {
  fullName: string;
  city: string;
  bio: string;
  skill: string[];
  experience: string;
  faceVerification: string;
  onBook: () => void;
}

function BrowseArtisan(data: BrowseArtisanProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white font-sans transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-4 p-5">
        <Image
          src={data.faceVerification}
          alt={data.fullName}
          width={100}
          height={100}
          className="h-20 w-20 shrink-0 rounded-2xl object-cover"
        />

        <div className="min-w-0 flex-1">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted">
            Artisan
          </p>
          <h5 className="truncate font-heading text-lg font-semibold text-main">
            {data.fullName}
          </h5>
          <p className="mt-1 text-sm text-muted">{data.city}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {data.skill?.map((s, index) => (
            <span
              key={index}
              className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-text"
            >
              {s}
            </span>
          ))}
        </div>

        <p className="mb-5 line-clamp-3 text-sm leading-6 text-muted">
          {data.bio}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-border py-4">
          <div>
            <p className="text-xs text-muted">Experience</p>
            <p className="mt-1 text-sm font-semibold text-main">
              {data.experience}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted">Location</p>
            <p className="mt-1 text-sm font-semibold text-main">
              {data.city}
            </p>
          </div>
        </div>

        <Button
          className="w-full border border-border bg-muted text-white hover:bg-secondary hover:text-muted"
          onClick={data.onBook}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}

export default BrowseArtisan;