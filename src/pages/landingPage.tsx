"use client";

import Header from "@/component/header";
import banner from "../../public/banner.avif";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoIosStar } from "react-icons/io";
import { FaLongArrowAltRight, FaLongArrowAltDown } from "react-icons/fa";
import Image from "next/image";
import Footer from "@/component/footer";
import { serviceCard } from "@/constants/serviceCategories";

const bRating = [
  { title: "Verified Artisans", num: "500+" },
  { title: "Jobs Completed", num: "10000+" },
  { title: "Avg. Rating", num: "4.8", icon: <IoIosStar /> },
];

const howItWorks = [
  {
    stage: "01",
    title: "Post the job",
    desc: "Describe the work you need done. Post location, timing, and any special requirements",
  },
  {
    stage: "02",
    title: "Match with Artisans",
    desc: "See only NIN-verified artisans near you.",
  },
  {
    stage: "03",
    title: "Pay into escrow",
    desc: "Your money stays with Onika until you confirm",
  },
  {
    stage: "04",
    title: "Confirm & rate",
    desc: "Release payment when the job is truly done.",
  },
];

const talking = [
  {
    name: "Ngozi Adeyemi",
    image:
      "https://i.pinimg.com/736x/bf/c6/10/bfc610b82fe248c48cd6b519acdaa449.jpg",
    text: "Found a brilliant plumber within 20 minutes. He arrived on time, fixed the burst pipe, and the pricing was totally transparent.",
    postion: "Homeowner, Lagos",
  },
  {
    name: "Kayode Fashola",
    image:
      "https://i.pinimg.com/1200x/3d/59/1a/3d591a7537a03b3baa722e8584b9b0a8.jpg",
    text: "ArtisanHub transformed my business. I went from 2 jobs a week to fully booked in under a month. The admin tools are excellent.",
    postion: "Independent Electrician",
  },
  {
    name: "Adaeze Obi",
    image:
      "https://i.pinimg.com/736x/78/a4/90/78a49037be202bfa335fef1cf9e3718f.jpg",
    text: "Booking a cleaning crew for my office has never been easier. The quality is consistent and the ratings system keeps everyone accountable.",
    postion: "Office Manager",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background p-2 transition-colors duration-300">
      <div className="w-full">
        {/* Header */}
        <Header />

        {/* Banner (always dark, so it uses fixed white text) */}
        <section
          className="relative flex min-h-[600px] items-center bg-cover bg-center sm:min-h-[650px] lg:min-h-screen"
          style={{ backgroundImage: `url(${banner.src})` }}
        >
          <div className="absolute inset-0 bg-[#1a2d4a]/90 dark:bg-main/90" />

          <div className="relative z-10 mx-auto flex w-[90%] max-w-2xl flex-col gap-5 py-14 sm:py-20 lg:max-w-6xl">
            <small className="flex w-fit items-center justify-center gap-1 rounded-2xl bg-primary/25 px-3 py-1.5 font-sans text-sm font-medium text-primary">
              <span className="shrink-0 text-xl">
                <MdOutlineVerifiedUser />
              </span>

              <span className="whitespace-nowrap">
                NIN & BVN verified pros only
              </span>
            </small>

            <h2 className="font-heading text-4xl font-bold leading-[1.15] tracking-wide text-white sm:text-6xl lg:text-6xl">
              Book real <br />
              <span className="text-primary">artisans.</span> <br />
              Pay when the job <br />
              is <span className="text-primary">actually</span> done.
            </h2>

            <p className="w-full max-w-md font-sans text-sm font-light leading-[26px] tracking-wide text-gray-300 sm:max-w-xl sm:text-base">
              Connect with verified local artisans for cleaning, plumbing, car
              wash, electrical work, and more. Booked in minutes, done right.
            </p>

            <div className="mt-2 flex w-full max-w-xl flex-col items-stretch justify-between gap-3 sm:flex-row">
              <div className="flex w-full items-center gap-2 rounded-xl border border-gray-500 bg-[#30415a] px-3 py-3.5 text-gray-300 dark:bg-secondary/80 sm:w-[70%]">
                <CiSearch className="shrink-0 text-xl font-bold" />

                <input
                  className="w-full bg-transparent font-sans text-sm font-light text-white placeholder:text-gray-400 focus:outline-none"
                  placeholder="What service do you need?"
                />
              </div>

              <button
                className="w-full cursor-pointer rounded-xl bg-primary p-3 text-center font-sans text-sm font-bold text-white hover:bg-primary/80 sm:w-auto sm:px-8"
                type="submit"
              >
                Find Artisan
              </button>
            </div>

            <div className="mt-4 flex w-full max-w-md items-center justify-between sm:justify-start sm:gap-14">
              {bRating.map((r) => (
                <section
                  className="font-sans text-base font-bold text-white sm:text-lg"
                  key={r.title}
                >
                  <h3 className="flex items-center gap-1">
                    {r.num} {r.icon}
                  </h3>

                  <p className="text-sm font-light text-gray-400">{r.title}</p>
                </section>
              ))}
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="flex h-auto flex-col justify-center bg-background py-10 transition-colors duration-300 lg:min-h-[70vh]">
          <div className="mx-auto flex w-[90%] max-w-6xl flex-col gap-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-muted sm:text-3xl">
                Browse by service
              </h2>

              <p className="mt-1 font-sans text-sm font-light text-text/75 sm:text-base">
                From quick fixes to major overhauls. We have a specialist for
                every job.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
              {serviceCard.map((s) => (
                <div
                  className={`${s.bg} flex min-h-[130px] flex-col justify-center gap-2 rounded-3xl p-4 text-2xl transition-colors duration-300`}
                  key={s.title}
                >
                  <span>{s.icon}</span>

                  <h4 className="font-sans text-sm font-bold text-text">
                    {s.title}
                  </h4>

                  {s.num && (
                    <p className="font-sans text-xs text-muted">{s.num}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="flex flex-col justify-center bg-[#f0efe9] py-10 transition-colors duration-300 dark:bg-secondary lg:min-h-[65vh]">
          <div className="mx-auto flex w-[90%] max-w-6xl flex-col gap-10">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="pt-3 font-heading text-2xl font-bold text-muted sm:text-3xl">
                How Onika works
              </h2>

              <p className="mt-1 font-sans text-sm font-light text-text/75 sm:text-base">
                From posting a job to paying only when it's done in four honest
                steps.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-y-8 sm:flex-row sm:items-start lg:justify-between">
              {howItWorks.map((w, i) => (
                <div
                  key={w.title}
                  className="flex w-full flex-col items-center sm:w-auto sm:flex-row"
                >
                  <div className="w-full max-w-[260px] p-3 text-center sm:text-left">
                    <button
                      type="button"
                      className="rounded-xl bg-[#1a2d4a] p-5 font-heading text-base font-bold text-white dark:bg-main lg:rounded-2xl lg:text-2xl"
                    >
                      {w.stage}
                    </button>

                    <h4 className="py-2 font-sans text-sm font-bold text-text md:text-xs lg:text-base">
                      {w.title}
                    </h4>

                    <p className="mt-1 font-sans text-xs font-light text-muted">
                      {w.desc}
                    </p>
                  </div>

                  {i < howItWorks.length - 1 && (
                    <>
                      <FaLongArrowAltRight className="hidden h-6 w-8 shrink-0 text-[#1a2d4a]/70 dark:text-muted sm:block lg:w-10" />

                      <FaLongArrowAltDown className="my-3 block h-6 w-8 text-[#1a2d4a]/70 dark:text-muted sm:hidden" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials (always dark, so it uses fixed white text) */}
        <section className="flex h-auto flex-col justify-center bg-main py-10 transition-colors duration-300 lg:min-h-[70vh]">
          <div className="mx-auto flex w-[90%] max-w-6xl flex-col gap-8">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                What people are saying
              </h2>

              <p className="mt-1 font-sans text-sm font-light text-white/50 sm:text-base">
                Real stories from customers and artisans.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {talking.map((t) => (
                <div
                  className="flex h-auto min-h-[180px] flex-col justify-between rounded-2xl border border-white/10 bg-[#30496c] p-4 dark:bg-secondary"
                  key={t.name}
                >
                  <p className="font-sans text-xs font-medium leading-6 tracking-normal text-gray-300 dark:text-muted">
                    {t.text}
                  </p>

                  <div className="mt-5 flex items-center gap-2">
                    {t.image && (
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={36}
                        height={36}
                        className="shrink-0 rounded-full object-cover"
                      />
                    )}

                    <h3 className="flex flex-col">
                      <strong className="font-heading text-base font-semibold text-white">
                        {t.name}
                      </strong>

                      <span className="font-sans text-xs font-medium text-gray-400 dark:text-muted">
                        {t.postion}
                      </span>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Onika */}
        <section className="flex w-full items-center bg-[#f0efe9] py-16 transition-colors duration-300 dark:bg-secondary">
          <div className="mx-auto flex w-[90%] max-w-6xl flex-col gap-8 rounded-4xl bg-background px-6 py-10 transition-colors duration-300 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex w-full flex-col gap-3 lg:w-1/2">
              <h3 className="font-heading text-2xl font-extrabold text-text/90 sm:text-3xl sm:leading-9 sm:tracking-wide">
                Get paid for real work. Build a reputation you own.
              </h3>

              <p className="w-full max-w-md font-sans text-xs font-bold tracking-wide text-muted sm:text-sm">
                Join thousands of verified Nigerian artisans earning weekly on
                Onika. Free to join. NIN required. Payouts to any Nigerian
                bank.
              </p>
            </div>

            <div className="flex w-full flex-col items-center gap-4 sm:flex-row lg:w-auto">
              <button
                type="button"
                className="w-full cursor-pointer rounded-4xl bg-amber-200 px-6 py-3 font-sans text-xs font-bold text-black/50 hover:bg-amber-300 dark:bg-primary/20 dark:text-primary dark:hover:bg-primary/30 sm:w-auto"
              >
                Become an artisan
              </button>

              <button
                type="button"
                className="w-full cursor-pointer rounded-4xl border border-muted bg-transparent px-6 py-3 font-sans text-xs font-bold text-text/70 hover:bg-amber-200 hover:text-black/70 dark:border-border dark:hover:bg-primary/20 dark:hover:text-primary sm:w-auto"
              >
                Find an artisan
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;