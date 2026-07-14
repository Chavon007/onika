"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo1.png";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

const navlink = [
  {
    title: "Home",
    href: "#",
  },
  {
    title: "Services",
    href: "#",
  },
  {
    title: "How it works",
    href: "#",
  },
  {
    title: "Top artisans",
    href: "#",
  },
  {
    title: "Testimonies",
    href: "#",
  },
  {
    title: "Join us",
    href: "#",
  },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-background shadow-sm relative">
      <div className="w-[95%]  mx-auto flex justify-between items-center py-3">
        {/* Logo */}
        <section className="flex items-center gap-2">
          <Image src={logo} alt="Onika Logo" width={20} height={20} />
          <h2 className="font-heading text-muted text-xl font-bold uppercase">
            Onika
          </h2>
        </section>

        {/* Desktop Navigation */}
        <section className="hidden lg:flex items-center justify-between w-[70%]">
          <nav className="flex items-center gap-8">
            {navlink.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="font-sans text-sm font-bold text-[#1a2d4a]/60 hover:text-primary transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <Link
            href="/login"
            className="bg-primary p-2 w-full md:w-30 text-center text-white font-sans text-xs md:text-sm hover:bg-primary/80 font-bold rounded-xl"
          >
            Get Started
          </Link>
        </section>

        {/* Mobile Menu Button */}
        <section className="lg:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="text-3xl cursor-pointer text-muted"
          >
            <CiMenuBurger />
          </button>
        </section>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen md:h-[100vh] w-[80%] max-w-[320px] bg-background shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="Onika Logo" width={45} height={45} />

            <h2 className="font-heading text-muted text-xl font-bold uppercase">
              Onika
            </h2>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="text-4xl cursor-pointer text-muted"
          >
            <IoCloseOutline />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col gap-6 p-6">
          {navlink.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="font-sans text-lg font-semibold text-[#1a2d4a]/70 hover:text-primary transition-colors"
            >
              {item.title}
            </Link>
          ))}

          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="mt-6 bg-primary text-white text-center py-3 rounded-xl font-sans font-bold hover:opacity-90 transition"
          >
            Get Started
          </Link>
        </nav>
      </aside>
    </header>
  );
}

export default Header;