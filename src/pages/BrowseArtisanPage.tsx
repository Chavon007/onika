"use client";
import BrowseArtisan from "@/component/browseArtisansCard";
import BookingModal, { BookingFormData } from "@/component/bookingModal";
import { useFetchAllArtisan } from "@/api/artsianProfile";
import { useState } from "react";
import { usePrivateJobBooking } from "@/api/job";

const topSkills = [
  "Hair & Beauty",
  "Cleaning Services",
  "Plumbing & Water",
  "Electrical & Power",
];

const otherSkills = [
  "Fashion & Tailoring",
  "Car Wash & Detailing",
  "Carpentry & Furniture",
  "Building & Construction",
  "Auto Repair",
  "Food & Catering",
  "Welding & Metalwork",
  "Glass & Aluminium",
  "Gardening & Landscaping",
  "Laundry",
  "Pest Control",
  "Moving & Logistics",
  "AC & Appliances",
  "Phone & Computer Repair",
  "TV & Satellite",
  "Security Systems",
  "Photography & Video",
  "Events",
  "Education & Tutoring",
  "Digital Services",
  "General Home Services",
  "Outdoor & Recreation",
  "Painting & Decoration",
];

function FetchAllArtisanPage() {
  const [filterService, setFilterService] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);
  const {
    data: artisans,
    isError,
    isLoading,
  } = useFetchAllArtisan(filterService ?? undefined);
  const { mutate, isPending } = usePrivateJobBooking();
  const [selectedArtisan, setSelectedArtisan] = useState<string | null>(null);

  const isOtherSelected =
    filterService !== null && otherSkills.includes(filterService);

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
      <div className="w-full min-h-screen bg-background overflow-hidden pt-5">
        <div className="container mx-auto w-[90%] flex flex-col gap-[30px] p-3">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-text text-3xl font-heading">
              Browse Artisans
            </h2>
            <p className="font-medium text-black/50 text-xs font-sans tracking-wider">
              Find and book verified professionals near you.
            </p>
          </div>

          <div className="relative flex items-center gap-2 pb-2">
            <div className="flex flex-1 gap-2 overflow-x-auto whitespace-nowrap">
              <button
                type="button"
                onClick={() => setFilterService(null)}
                className={`rounded-full border px-4 py-2 text-sm ${
                  filterService === null
                    ? "bg-main text-white"
                    : "bg-white text-muted"
                }`}
              >
                All
              </button>

              {topSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => setFilterService(skill)}
                  className={`rounded-full border px-4 py-2 text-sm ${
                    filterService === skill
                      ? "bg-main text-white"
                      : "bg-white text-muted"
                  }`}
                >
                  {skill}
                </button>
              ))}

              {isOtherSelected && (
                <button
                  type="button"
                  className="rounded-full border bg-main px-4 py-2 text-sm text-white"
                >
                  {filterService}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowMore((prev) => !prev)}
              className="shrink-0 rounded-full border bg-white px-4 py-2 text-sm text-muted"
            >
              More ▾
            </button>

            {showMore && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMore(false)}
                />
                <div className="absolute right-0 top-full z-20 mt-2 max-h-64 w-64 overflow-y-auto rounded-xl border bg-white p-2 shadow-lg">
                  {otherSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => {
                        setFilterService(skill);
                        setShowMore(false);
                      }}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm text-muted hover:bg-secondary"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {artisans?.length === 0 && (
            <p className="py-10 text-center text-sm text-muted">
              No artisans found for this category.
            </p>
          )}

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
        </div>
      </div>
    </>
  );
}

export default FetchAllArtisanPage;
