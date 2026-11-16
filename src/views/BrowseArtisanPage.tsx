
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

const allSkills = [...topSkills, ...otherSkills];

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

  // Desktop
  const isOtherSelected =
    filterService !== null && otherSkills.includes(filterService);

  // Mobile: All | one skill | More
  const mobileSkill = filterService ?? topSkills[0];
  const mobileMoreSkills = allSkills.filter((skill) => skill !== mobileSkill);

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
      <div className="flex min-h-[60vh] items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-main" />

          <p className="font-sans text-sm font-medium text-muted">
            Loading...
          </p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background">
        <p className="font-sans text-sm font-medium text-muted">
          Failed to load Artisans
        </p>
      </div>
    );

  return (
    <div className="min-h-screen w-full overflow-hidden bg-background pt-20 transition-colors duration-300 md:pt-24">
      <div className="container mx-auto flex flex-col gap-[30px] p-3 lg:w-[90%]">
        {/* Heading */}
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-3xl font-bold text-text">
            Browse Artisans
          </h2>

          <p className="font-sans text-xs font-medium tracking-wider text-muted">
            Find and book verified professionals near you.
          </p>
        </div>

        {/* Mobile Filter */}
        <div className="relative flex items-center gap-2 pb-2 md:hidden">
          <button
            type="button"
            onClick={() => setFilterService(null)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
              filterService === null
                ? "border-main bg-main text-white"
                : "border-border bg-background text-muted hover:border-primary"
            }`}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => setFilterService(mobileSkill)}
            className={`min-w-0 max-w-[55%] truncate rounded-full border px-4 py-2 text-sm transition-colors ${
              filterService === mobileSkill
                ? "border-main bg-main text-white"
                : "border-border bg-background text-muted hover:border-primary"
            }`}
          >
            {mobileSkill}
          </button>

          <button
            type="button"
            onClick={() => setShowMore((prev) => !prev)}
            className="shrink-0 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted transition-colors hover:border-primary"
          >
            More ▾
          </button>

          {showMore && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMore(false)}
              />

              <div className="absolute right-0 top-full z-20 mt-2 max-h-64 w-64 overflow-y-auto rounded-xl border border-border bg-background p-2 shadow-lg">
                {mobileMoreSkills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => {
                      setFilterService(skill);
                      setShowMore(false);
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left font-sans text-sm text-text transition-colors hover:bg-secondary"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Desktop Filter */}
        <div className="relative hidden items-center gap-2 pb-2 md:flex">
          <div className="flex flex-1 gap-2 overflow-x-auto whitespace-nowrap">
            <button
              type="button"
              onClick={() => setFilterService(null)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                filterService === null
                  ? "border-main bg-main text-white"
                  : "border-border bg-background text-muted hover:border-primary"
              }`}
            >
              All
            </button>

            {topSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => setFilterService(skill)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  filterService === skill
                    ? "border-main bg-main text-white"
                    : "border-border bg-background text-muted hover:border-primary"
                }`}
              >
                {skill}
              </button>
            ))}

            {isOtherSelected && (
              <button
                type="button"
                className="rounded-full border border-main bg-main px-4 py-2 text-sm text-white"
              >
                {filterService}
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowMore((prev) => !prev)}
            className="shrink-0 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted transition-colors hover:border-primary"
          >
            More ▾
          </button>

          {showMore && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMore(false)}
              />

              <div className="absolute right-0 top-full z-20 mt-2 max-h-64 w-64 overflow-y-auto rounded-xl border border-border bg-background p-2 shadow-lg">
                {otherSkills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => {
                      setFilterService(skill);
                      setShowMore(false);
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left font-sans text-sm text-text transition-colors hover:bg-secondary"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Empty State */}
        {artisans?.length === 0 && (
          <p className="py-10 text-center font-sans text-sm text-muted">
            No artisans found for this category.
          </p>
        )}

        {/* Artisan Cards */}
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

        {/* Booking Modal */}
        {selectedArtisan && (
          <BookingModal
            onClose={() => setSelectedArtisan(null)}
            onSubmit={handlePrivateBooking}
            isPending={isPending}
          />
        )}
      </div>
    </div>
  );
}

export default FetchAllArtisanPage;
