import Image from "next/image";
import logo from "../../public/logo1.png";

const footer = [
  {
    title: "Services",
    text1: "Cleaning",
    text2: "Plumbing",
    text3: "Car Wash",
    text4: "Electrical",
    text5: "Painting",
  },
  {
    title: "Company",
    text1: "About us",
    text2: "How it works",
    text3: "Testimonials",
    text4: "",
    text5: "",
  },
  {
    title: "Support",
    text1: "Help Centre",
    text2: "Safety",
    text3: "Terms of Service",
    text4: "Privacy Policy",
    text5: "Contact Us",
  },
];

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="bg-background transition-colors duration-300 md:h-auto">
      <div className="container mx-auto flex flex-col items-center">
        <section className="mx-auto mt-5 h-auto w-[95%] p-2 md:flex md:justify-between lg:h-[50vh]">
          <div className="mb-2 flex flex-col gap-3 md:w-[30%]">
            <div className="flex items-center gap-2">
              <Image src={logo} alt="" width={50} height={50} />
              <h2 className="font-heading text-2xl font-bold text-muted">
                Onika
              </h2>
            </div>
            <p className="font-sans text-sm font-medium leading-6 tracking-wide text-text/60">
              Nigeria's trust layer for skilled work. NIN-verified artisans,
              escrow-protected payments, and disputes resolved in 48 hours.
            </p>
          </div>

          <div className="mt-5 flex w-[65%] flex-col gap-2 md:mt-0 md:flex-row md:justify-between md:gap-0">
            {footer.map((f) => (
              <div className="flex flex-col pb-3" key={f.title}>
                <h4 className="font-heading text-base font-bold text-text">
                  {f.title}
                </h4>
                <p className="mt-1 flex flex-col font-sans text-sm font-medium text-text/50 md:mt-3">
                  <span className="cursor-pointer py-2 hover:text-primary">
                    {f.text1}
                  </span>
                  <span className="cursor-pointer py-2 hover:text-primary">
                    {f.text2}
                  </span>
                  <span className="cursor-pointer py-2 hover:text-primary">
                    {f.text3}
                  </span>
                  <span className="cursor-pointer py-2 hover:text-primary">
                    {f.text4}
                  </span>
                  <span className="cursor-pointer py-2 hover:text-primary">
                    {f.text5}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <p className="h-auto w-full flex-1 bg-[#f0efe9] p-2 text-center font-sans text-sm font-medium tracking-wide text-muted transition-colors duration-300 dark:bg-secondary">
          &copy; {year} Onika. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;