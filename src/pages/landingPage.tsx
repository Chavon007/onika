"use client";

import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { poppins } from "../lib/fonts";

const infoCard = [
  { title: "How it works" },
  { title: "For artisans" },
  { title: "Get started" },
];

const joinCard = [
  { title: "Find an artisan", link: "/login" },
  { title: "Join as artisan", link: "/login" },
];

const card = [
  {
    title: "How it works",
    description:
      "Post your job, get matched with a verified artisan nearby, pay safely into escrow, and only release the money when you're satisfied. No scams. No stress.",
    icon: <FaRegUser />,
  },
  {
    title: "For artisans",
    description:
      "Get matched with customer jobs, accept requests, and work with confidence knowing your payment is secured in escrow. Once the job is completed and confirmed, your earnings are released instantly",
    icon: <FaTools />,
  },
  {
    title: "Get started",
    description:
      "Start by creating an account as a customer to post jobs or as an artisan to connect with real job opportunities near you.",
    icon: <FaArrowRight />,
  },
];

function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-background min-h-screen px-2 pt-2 pb-7 flex flex-col gap-3">
      {/* HEADER */}
      <section className="flex justify-between items-center w-[90%] mx-auto p-2">
        <h2 className={`${poppins.className} text-text text-2xl font-bold`}>
          Onika
        </h2>

        {/* DESKTOP */}
        <div className="hidden p-2 w-[35%] lg:flex gap-2 justify-between items-center">
          {infoCard.map((i) => (
            <button
              key={i.title}
              className="
                bg-primary w-25 text-sm font-bold text-background
                cursor-pointer rounded p-1
                relative overflow-hidden group
              "
            >
              <span className="relative z-10">{i.title}</span>
              <span
                className="
                absolute inset-0 bg-secondary
                scale-x-0 origin-left
                transition-transform duration-300
                group-hover:scale-x-100
              "
              ></span>
            </button>
          ))}
        </div>

        {/* MOBILE */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary text-3xl flex items-center justify-center w-9 h-9 rounded-lg hover:bg-primary/10 transition-colors"
          >
            {isOpen ? <IoClose /> : <MdMenu />}
          </button>

          {/* Overlay */}
          <div
            onClick={() => setIsOpen(false)}
            className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
              isOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          />

          {/* Drawer */}
          <div
            className={`fixed top-0 right-0 h-full w-[72%] bg-[#111c14] z-50 flex flex-col transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Drawer top */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-white/5">
              <span className="text-primary font-bold text-sm">Onika</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-text w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors text-xl"
              >
                <IoClose />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col flex-1 py-3">
              {infoCard.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => {
                      document
                        .getElementById("cards")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 300);
                  }}
                  style={{
                    animationDelay: isOpen ? `${0.1 + index * 0.08}s` : "0s",
                  }}
                  className={`flex items-center gap-3 px-5 py-4 text-sm font-medium text-muted
            hover:text-primary hover:bg-primary/5 border-l-2 border-transparent
            hover:border-primary transition-all text-left w-full
            ${isOpen ? "animate-slideIn" : "opacity-0"}
          `}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BANNER */}
      <section className="flex flex-col gap-3 md:justify-center p-2 w-[98%] md:w-[90%] mx-auto md:h-[60vh]">
        <h3
          className={`${poppins.className} text-2xl md:text-4xl font-bold text-text md:max-w-[500px]`}
        >
          Connect with trusted artisans near you — fast, secure, and
          stress-free.
        </h3>

        <p className="text-muted md:w-[380px] text-sm font-medium">
          Post a job as a customer or get hired as an artisan. Payments are
          secured with escrow, so you only pay when the job is done right.
        </p>

        {/* CTA BUTTONS */}
        <div className="md:w-[25%] flex md:justify-between items-center p-2 gap-2">
          {joinCard.map((j) => (
            <Link
              key={j.title}
              href={j.link}
              className="
                bg-primary w-30 text-center text-sm font-bold text-background
                cursor-pointer rounded p-1
                relative overflow-hidden group
              "
            >
              <span className="relative z-10">{j.title}</span>
              <span
                className="
                absolute inset-0 bg-secondary
                scale-x-0 origin-left
                transition-transform duration-300
                group-hover:scale-x-100
              "
              ></span>
            </Link>
          ))}
        </div>
      </section>

      {/* CARDS */}
      <section id="cards" className="w-[98%] md:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
        {card.map((c) => (
          <div
            key={c.title}
            className="border border-border p-4 rounded flex flex-col items-center gap-3 justify-start h-full"
          >
            <h5 className="text-primary text-2xl">{c.icon}</h5>
            <h2 className="text-primary font-bold text-2xl">{c.title}</h2>
            <p className="text-sm text-muted font-medium text-center">
              {c.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default LandingPage;
