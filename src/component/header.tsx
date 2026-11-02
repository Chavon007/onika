
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo1.png";
import auth from "@/api/auth";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

const landingNav = [
  { title: "Home", href: "#" },
  { title: "Services", href: "#" },
  { title: "How it works", href: "#" },
  { title: "Top artisans", href: "#" },
  { title: "Testimonies", href: "#" },
  { title: "Join us", href: "#" },
];

const customerNav = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Browse", link: "/browse-artisan" },
  { title: "Post a job", link: "/post-job" },
  { title: "Messages", link: "/messages" },
];

const artisanNav = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Messages", link: "/messages" },
  { title: "Subscription", link: "/subscription" },
];

const adminNav = [
  { title: "Admin Panel", link: "/admin" },
  { title: "Browse", link: "/browse" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleLogout = async () => {
    try {
      await auth.logout();
      useAuthStore.getState().logout();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const role = user?.role ?? "customer";

  const authedNav =
    role === "customer"
      ? customerNav
      : role === "artisan"
        ? artisanNav
        : adminNav;

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-border bg-background/95 shadow-sm backdrop-blur-md">
        <div className="container mx-auto flex w-[90%] items-center justify-between py-3">
          {/* Logo */}
          <section className="flex items-center gap-2">
            <Image src={logo} alt="Onika Logo" width={20} height={20} />
            <h2 className="font-heading text-xl font-bold uppercase text-muted">
              Onika
            </h2>
          </section>

          {/* Desktop Navigation */}
          <section className="hidden w-[70%] items-center justify-between lg:flex">
            <nav className="flex items-center gap-8">
              {!isAuthenticated
                ? landingNav.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="font-sans text-sm font-bold text-main/60 transition-colors hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  ))
                : authedNav.map((item) => (
                    <Link
                      key={item.title}
                      href={item.link}
                      className="font-sans text-sm font-bold text-main/60 transition-colors hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  ))}
            </nav>

            {!isAuthenticated ? (
              <Link
                href="/login"
                className="w-full rounded-xl bg-primary p-2 text-center font-sans text-xs font-bold text-white transition-colors hover:bg-primary/80 md:w-30 md:text-sm"
              >
                Get Started
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/profile" className="text-right">
                  <h4 className="font-sans text-sm font-bold text-muted">
                    {user?.fullName}
                  </h4>
                  <p className="font-sans text-xs capitalize text-muted/60">
                    {user?.role}
                  </p>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="font-sans text-sm font-bold text-primary transition-colors hover:underline"
                >
                  Logout
                </button>
              </div>
            )}
          </section>

          {/* Mobile Menu Button */}
          <section className="lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="cursor-pointer text-3xl text-muted transition-colors hover:text-primary"
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
            >
              <CiMenuBurger />
            </button>
          </section>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/50 transition-all duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-[70] h-screen w-[80%] max-w-[320px] transform bg-background shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-border p-5">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="Onika Logo" width={45} height={45} />
            <h2 className="font-heading text-xl font-bold uppercase text-muted">
              Onika
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-4xl text-muted transition-colors hover:text-primary"
            aria-label="Close navigation menu"
          >
            <IoCloseOutline />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col gap-6 p-6">
          {!isAuthenticated
            ? landingNav.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="font-sans text-lg font-semibold text-main/70 transition-colors hover:text-primary"
                >
                  {item.title}
                </Link>
              ))
            : authedNav.map((item) => (
                <Link
                  key={item.title}
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className="font-sans text-lg font-semibold text-main/70 transition-colors hover:text-primary"
                >
                  {item.title}
                </Link>
              ))}

          {!isAuthenticated ? (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="mt-6 rounded-xl bg-primary py-3 text-center font-sans font-bold text-white transition hover:opacity-90"
            >
              Get Started
            </Link>
          ) : (
            <>
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="border-t border-border pt-5 font-sans text-sm font-semibold text-text"
              >
                {user?.fullName}
                <span className="mt-1 block text-xs capitalize text-muted">
                  {user?.role}
                </span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="mt-2 rounded-xl bg-primary py-3 text-center font-sans font-bold text-white transition hover:opacity-90"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}

export default Header;
