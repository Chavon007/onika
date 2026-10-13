"use client";
import BrowseArtisan from "@/component/browseArtisansCard";
import BookingModal, { BookingFormData } from "@/component/bookingModal";
import { useFetchAllArtisan } from "@/api/artsianProfile";
import { useState } from "react";
import { usePrivateJobBooking } from "@/api/job";

function FetchAllArtisanPage() {
  const { data: artisans, isError, isLoading } = useFetchAllArtisan();
  const { mutate, isPending } = usePrivateJobBooking();
  const [selectedArtisan, setSelectedArtisan] = useState<string | null>(null);

  const handlePrivateBooking = (data: BookingFormData) => {
    if (!selectedArtisan) return;

    mutate(
      { ...data, artisanId: selectedArtisan },
      {
        onSuccess: () => setSelectedArtisan(null),
      },
    );
  };

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
    <>
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
            onBook={() => setSelectedArtisan(a.User._id)}
          />
        ))}
      </div>

      {selectedArtisan && (
        <BookingModal
          onClose={() => setSelectedArtisan(null)}
          onSubmit={handlePrivateBooking}
          isPending={isPending}
        />
      )}
    </>
  );
}

export default FetchAllArtisanPage;