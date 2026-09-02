"use client";
import Header from "@/component/header";
import banner from "../../public/banner.avif";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoIosStar } from "react-icons/io";
import { FaLongArrowAltRight, FaLongArrowAltDown } from "react-icons/fa";
import Image from "next/image";
import Footer from "@/component/footer";

const bRating = [
  { title: "Verified Artisans", num: "500+" },
  { title: "Jobs Completed", num: "10000+" },
  { title: "Avg. Rating", num: "4.8", icon: <IoIosStar /> },
];

const serviceCard = [
  { title: "Cleaners", num: "50+ artisans", icon: "🧹", bg: "bg-yellow-100" },
  { title: "Plumbers", num: "50+ artisans", icon: "🔧", bg: "bg-blue-100" },
  { title: "Car Wash", num: "100+ artisans", icon: "🚗", bg: "bg-green-100" },
  { title: "Electrican", num: "25+ artisans", icon: "⚡", bg: "bg-purple-100" },
  { title: "Painting", num: "85+ artisans", icon: "🎨", bg: "bg-pink-100" },
  { title: "Chefs", num: "65+ artisans", icon: "👨‍🍳", bg: "bg-emerald-100" },
  { title: "AC Techs", num: "70+ artisans", icon: "❄️", bg: "bg-sky-100" },
  { title: "And more", icon: "✨", bg: "bg-orange-100" },
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
    <div className="min-h-screen p-2 ">
      <div className=" w-full">
        {/* header */}
        <Header />

        {/* banner */}
        <section
          className="bg-cover bg-center relative min-h-[600px] sm:min-h-[650px] lg:min-h-screen flex items-center"
          style={{ backgroundImage: `url(${banner.src})` }}
        >
          <div className=" absolute inset-0 bg-[#1a2d4a]/90" />
          <div className="relative z-10 w-[90%] max-w-2xl lg:max-w-6xl mx-auto flex flex-col gap-5 py-14 sm:py-20">
            <small className="bg-primary/25 font-sans text-sm text-primary font-medium flex gap-1 items-center justify-center w-fit px-3 py-1.5 rounded-2xl">
              <span className="text-xl shrink-0">
                <MdOutlineVerifiedUser />
              </span>
              <span className="whitespace-nowrap">
                NIN & BVN verified pros only
              </span>
            </small>

            <h2 className="text-white font-heading text-4xl sm:text-6xl lg:text-6xl font-bold leading-[1.15] tracking-wide">
              Book real <br />
              <span className="text-primary">artisans.</span> <br /> Pay when
              the job <br /> is <span className="text-primary">actually</span>{" "}
              done.
            </h2>

            <p className="w-full max-w-md sm:max-w-xl leading-[26px] text-gray-300 tracking-wide font-light font-sans text-sm sm:text-base">
              Connect with verified local artisans for cleaning, plumbing, car
              wash, electrical work, and more. Booked in minutes, done right.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row w-full max-w-xl justify-between items-stretch mt-2">
              <div className="flex items-center gap-2 bg-[#30415a] w-full sm:w-[70%] py-3.5 text-gray-300 border border-gray-500 rounded-xl px-3">
                <CiSearch className="text-xl font-bold shrink-0" />
                <input
                  className="focus:outline-none w-full bg-transparent font-sans font-light text-sm"
                  placeholder="What service do you need?"
                />
              </div>
              <button
                className="bg-primary p-3 w-full sm:w-auto sm:px-8 text-center text-white font-sans text-sm font-bold rounded-xl hover:bg-primary/80 cursor-pointer"
                type="submit"
              >
                Find Artisan
              </button>
            </div>

            <div className="flex justify-between sm:justify-start sm:gap-14 items-center mt-4 w-full max-w-md">
              {bRating.map((r) => (
                <section
                  className="font-sans text-base sm:text-lg font-bold text-white"
                  key={r.title}
                >
                  <h3 className="flex items-center gap-1">
                    {r.num} {r.icon}
                  </h3>
                  <p className="text-gray-400 text-sm font-light">{r.title}</p>
                </section>
              ))}
            </div>
          </div>
        </section>

        {/* service cat */}
        <section className="bg-background py-10 flex flex-col justify-center h-auto lg::min-h-[70vh]">
          <div className="w-[90%] max-w-6xl mx-auto flex flex-col gap-8">
            <div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-muted">
                Browse by service
              </h2>
              <p className="text-black/75 font-sans font-light text-sm sm:text-base mt-1">
                From quick fixes to major overhauls. We have a specialist for
                every job.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {serviceCard.map((s) => (
                <div
                  className={`${s.bg} min-h-[130px] rounded-3xl p-4 text-2xl flex flex-col gap-2 justify-center`}
                  key={s.title}
                >
                  <span>{s.icon}</span>
                  <h4 className="text-sm font-sans font-bold text-black/70">
                    {s.title}
                  </h4>
                  {s.num && (
                    <p className="text-xs font-sans text-black/60">{s.num}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* how it works */}
        <section className="bg-[#f0efe9] flex flex-col justify-center py-10 lg:min-h-[65vh]">
          <div className="w-[90%] max-w-6xl mx-auto flex flex-col gap-10">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl pt-3 text-muted">
                How Onkia works
              </h2>
              <p className="text-black/75 font-sans font-light text-sm sm:text-base mt-1">
                From posting a job to paying only when it's done in four honest
                steps.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-between items-center sm:items-start gap-y-8">
              {howItWorks.map((w, i) => (
                <div
                  key={w.title}
                  className="w-full sm:w-auto flex flex-col sm:flex-row items-center"
                >
                  <div className="w-full max-w-[260px] p-3 text-center sm:text-left">
                    <button
                      type="button"
                      className="bg-[#1a2d4a] p-5 rounded-xl lg:rounded-2xl text-white font-heading font-bold text-base lg:text-2xl"
                    >
                      {w.stage}
                    </button>
                    <h4 className="font-sans text-black md:text-xs lg:text-base font-bold py-2">
                      {w.title}
                    </h4>
                    <p className="mt-1 font-sans font-light text-xs text-black/80">
                      {w.desc}
                    </p>
                  </div>

                  {i < howItWorks.length - 1 && (
                    <>
                      <FaLongArrowAltRight className="hidden sm:block w-8 h-6 lg:w-10 text-[#1a2d4a]/70 shrink-0" />
                      <FaLongArrowAltDown className="block sm:hidden my-3 w-8 h-6 text-[#1a2d4a]/70" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* testimonials */}
        <section className="bg-main flex flex-col justify-center h-auto lg:min-h-[70vh] py-10">
          <div className="w-[90%] max-w-6xl mx-auto flex flex-col gap-8">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-background">
                What people are saying
              </h2>
              <p className="text-background/50 font-sans font-light text-sm sm:text-base mt-1">
                Real stories from customers and artisans.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {talking.map((t) => (
                <div
                  className="bg-[#30496c] border h-auto min-h-[180px] border-white/10 p-4 rounded-2xl flex flex-col justify-between"
                  key={t.name}
                >
                  <p className="font-sans text-xs leading-6 tracking-normal text-gray-300 font-medium">
                    {t.text}
                  </p>
                  <div className="mt-5 flex items-center gap-2">
                    {t.image && (
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={36}
                        height={36}
                        className="rounded-full object-cover shrink-0"
                      />
                    )}
                    <h3 className="flex flex-col">
                      <strong className="font-heading text-background text-base font-semibold">
                        {t.name}
                      </strong>
                      <span className="font-sans text-xs font-medium text-gray-400">
                        {t.postion}
                      </span>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* join */}
        <section className="w-full bg-[#f0efe9] py-16 flex items-center">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-[90%] max-w-6xl mx-auto bg-background rounded-4xl px-6 sm:px-10 py-10 gap-8">
            <div className="w-full lg:w-1/2 flex flex-col gap-3">
              <h3 className="text-2xl sm:text-3xl sm:tracking-wide sm:leading-9 font-heading font-extrabold text-black/90">
                Get paid for real work. Build a reputation you own.
              </h3>

              <p className="text-xs sm:text-sm w-full max-w-md font-sans text-black/55 font-bold tracking-wide">
                Join thousands of verified Nigerian artisans earning weekly on
                Sabi. Free to join. NIN required. Payouts to any Nigerian bank.
              </p>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 items-center">
              <button
                type="button"
                className="w-full sm:w-auto bg-amber-200 hover:bg-transparent hover:border hover:border-amuted cursor-pointer px-6 py-3 text-xs text-black/50 rounded-4xl font-sans font-bold"
              >
                Become an artisan
              </button>

              <button
                type="button"
                className="w-full sm:w-auto bg-transparent hover:bg-amber-200 hover:border-none cursor-pointer border border-muted px-6 py-3 text-xs text-black/50 rounded-4xl font-sans font-bold"
              >
                Find an artisan
              </button>
            </div>
          </div>
        </section>

        {/* footer */}
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
