"use client";
import BrowseArtisan from "@/component/browseArtisansCard";
import { useFetchAllArtisan } from "@/api/artsianProfile";

function FetchAllArtisanPage() {
  const { data: artisans, isError, isLoading } = useFetchAllArtisan();

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
          Failed to load Artisans
        </p>
      </div>
    );
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {artisans?.map((a) => (
        <BrowseArtisan
          key={a._id}
          fullName={a.User.fullName}
          faceVerification={a.faceVerification}
          experience={a.experience}
          city={a.User.lga}
          bio={a.bio}
          skill={a.skills}
        />
      ))}
    </div>
  );
}

export default FetchAllArtisanPage;
