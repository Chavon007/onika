"use client";
import Header from "@/component/header";
import banner from "../../public/banner.avif";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoIosStar } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
const bRating = [
  {
    title: "Verified Artisans",
    num: "500+",
  },
  {
    title: "Jobs Completed",
    num: "10000+",
  },
  {
    title: "Avg. Rating",
    num: "4.8",
    icon: <IoIosStar />,
  },
];

const serviceCard = [
  {
    title: "Cleaners",
    num: "50+ artisans",
    icon: "🧹",
    bg: "bg-yellow-100",
  },
  {
    title: "Plumbers",
    num: "50+ artisans",
    icon: "🔧",
    bg: "bg-blue-100",
  },
  {
    title: "Car Wash",
    num: "100+ artisans",
    icon: "🚗",
    bg: "bg-green-100",
  },
  {
    title: "Electrican",
    num: "25+ artisans",
    icon: "⚡",
    bg: "bg-purple-100",
  },
  {
    title: "Painting",
    num: "85+ artisans",
    icon: "🎨",
    bg: "bg-pink-100",
  },
  {
    title: "Chefs",
    num: "65+ artisans",
    icon: "👨‍🍳",
    bg: "bg-emerald-100",
  },
  {
    title: "AC Techs",
    num: "70+ artisans",
    icon: "❄️",
    bg: "bg-sky-100",
  },
  {
    title: "And more",
    icon: "✨",
    bg: "bg-orange-100",
  },
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
    desc: "Your money stays with Sabi until you confirm",
  },
  {
    stage: "04",
    title: "Confirm & rate",
    desc: "Release payment when the job is truly done.",
  },
];

function LandingPage() {
  return (
    <div>
      {/* header */}
      <Header />
      {/* banner */}
      <section
        className="bg-cover bg-center relative min-h-screen flex items-center"
        style={{ backgroundImage: `url(${banner.src})` }}
      >
        <div className="absolute inset-0 bg-[#1a2d4a]/90" />
        <div className="relative z-10 w-[95%] mx-auto flex flex-col gap-3">
          <small className="bg-primary/25 font-sans text-sm text-primary font-medium  flex gap-1 items-center justify-center w-60 p-1.5 rounded-2xl">
            <span className="text-xl">
              <MdOutlineVerifiedUser />
            </span>
            <span>NIN & BVN verified pros only</span>
          </small>
          <h2 className="text-white font-heading text-5xl  font-bold leading-[55px] tracking-wider">
            Book real <br />
            <span className="text-primary"> artisans.</span> <br /> Pay when the
            job <br /> is <span className="text-primary">actually</span> done.
          </h2>
          <p className="w-[600px] leading-[25px]  text-gray-300 tracking-wide font-light font-sans text-sm">
            Connect with verified local artisans for cleaning, plumbing, car
            wash, electrical work, and more. Booked in minutes, done right.
          </p>

          <div className=" flex w-[600px] justify-between items-center">
            <div className="flex items-center gap-1 bg-[#30415a] w-[75%] py-3 text-gray-300 border border-gray-500  rounded-xl pl-3">
              <CiSearch className="text-xl font-bold " />
              <input
                className="focus:outline-none w-[80%] font-sans font-light text-sm"
                placeholder="What service do you need?"
              />
            </div>
            <button
              className="bg-primary p-3  w-30 text-center text-white font-sans text-sm font-bold rounded-xl"
              type="submit"
            >
              Find Artisan
            </button>
          </div>

          <div className="flex justify-between items-center mt-2 w-[500px]">
            {bRating.map((r) => (
              <section
                className="font-sans text-base font-bold text-white"
                key={r.title}
              >
                <h3 className="flex items-center justify-center">
                  {r.num} {r.icon}
                </h3>
                <p className="text-gray-400 text-sm font-light">{r.title}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
      {/* service  cat*/}
      <section className="bg-background flex flex-col justify-center h-[80vh]">
        <div className="w-[95%] mx-auto flex flex-col gap-8">
          <div className="">
            <h2 className="font-heading font-bold text-3xl text-muted">
              Browse by service
            </h2>
            <p className="text-black/75 font-sans font-light text-base mt-1">
              From quick fixes to major overhauls. We have a specialist for
              every job.
            </p>
          </div>

          <div className=" grid grid-cols-4 gap-3">
            {serviceCard.map((s) => (
              <div
                className={`${s.bg} h-30 rounded-3xl py-2 pl-4 text-2xl flex flex-col gap-2 justify-center`}
                key={s.title}
              >
                {s.icon}
                <h4 className="text-sm font-sans font-bold text-black/70">
                  {s.title}
                </h4>
                <p className="text-xs font-sans text-black/60">{s.num}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* how it works */}
      <section className="bg-[#f0efe9] flex flex-col justify-center h-[65vh]">
        <div className="w-[95%] mx-auto flex flex-col gap-8">
          <div className=" text-center">
            <h2 className="font-heading font-bold text-3xl text-muted">
              How Onkia works
            </h2>
            <p className="text-black/75 font-sans font-light text-base mt-1">
              From posting a job to paying only when it's done in four honest
              steps.
            </p>
          </div>

          <div className="flex justify-between items-center">
            {howItWorks.map((w, i) => (
              <div key={w.title} className="flex items-center">
                <div className="w-65 p-3">
                  <button
                    type="button"
                    className="bg-[#1a2d4a] p-5 rounded-2xl text-white font-heading font-bold text-2xl"
                  >
                    {w.stage}
                  </button>
                  <h4 className="font-sans text-black text-base font-bold py-2">
                    {w.title}
                  </h4>
                  <p className="mt-1 font-sans font-light text-xs text-black/80">
                    {w.desc}
                  </p>
                </div>

                {i < howItWorks.length - 1 && (
                  <FaLongArrowAltRight className="w-10 h-6 text-[#1a2d4a]/70 " />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* rated artisans */}
      <section></section>

      {/* testimonials */}
      <section></section>

      {/* join */}
      <section></section>

      {/* footer */}
    </div>
  );
}
export default LandingPage;
