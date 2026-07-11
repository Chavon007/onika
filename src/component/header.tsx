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
  },
  {
    title: "Services",
  },
  {
    title: "How it works",
  },
  {
    title: "Top artisans",
  },
  {
    title: "Testimonies",
  },
  {
    title: "Join us",
  },
];
function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-1 overflow-hidden bg-background ">
      <div className="flex justify-between items-center w-[98%] mx-auto">
        {/* logo */}
        <section className="w-[10%] flex gap-2 items-center p-1">
          <Image src={logo} alt="" width={50} height={50} />
          <h2 className="font-heading text-muted text-xl font-bold uppercase">
            onika
          </h2>
        </section>

        {/* large screen */}
        <section className="hidden w-[70%]  p-2  lg:flex justify-between items-center">
          <nav className="flex justify-between items-center w-[80%] p-2">
            {navlink.map((n) => (
              <Link
                className="font-sans text-sm font-bold text-[#1a2d4a]/60"
                key={n.title}
                href="#"
              >
                {n.title}
              </Link>
            ))}
          </nav>

          <Link
            className="bg-primary p-3  w-30 text-center text-white font-sans text-sm font-bold rounded-xl"
            href="/login"
          >
            Get Started
          </Link>
        </section>

        {/* mobile */}
        <section className="lg:hidden">
          <div className="text-2xl text-muted font-bold" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <IoCloseOutline /> : <CiMenuBurger />}
          </div>

          {isOpen && (
            <div className="">
              <nav>
                {navlink.map((n) => (
                  <Link key={n.title} href="#">
                    {n.title}
                  </Link>
                ))}
              </nav>

              <Link href="/login">Get Started</Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Header;
