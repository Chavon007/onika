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
    <div className="bg-background  md:h-auto">
      {" "}
      <div className="container mx-auto flex flex-col items-center">
        <section className="md:flex w-[95%] mx-auto md:justify-between h-auto lg:h-[50vh] mt-5 p-2">
          <div className="mb:6 md:mb:0 md:w-[30%] flex flex-col gap-3 mb-2">
            <div className="flex items-center gap-2">
              <Image src={logo} alt="" width={50} height={50} />
              <h2 className="font-heading font-bold text-2xl text-muted">
                Onika
              </h2>
            </div>
            <p className=" text-sm font-sans leading-6 tracking-wide text-black/55 font-medium">
              Nigeria's trust layer for skilled work. NIN-verified artisans,
              escrow-protected payments, and disputes resolved in 48 hours.
            </p>
          </div>

          {/*  */}
          <div className="w-[65%] flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between mt-5 md:mt-0">
            {footer.map((f) => (
              <div className="flex flex-col  pb-3">
                <h4 className="text-base font-heading text-black font-bold">
                  {f.title}
                </h4>
                <p className=" mt-1 md:mt-3 flex flex-col  text-sm text-black/40 font-sans font-medium">
                  <span className="py-2 cursor-pointer hover:text-muted">
                    {f.text1}
                  </span>
                  <span className="py-2 cursor-pointer hover:text-muted">
                    {f.text2}
                  </span>
                  <span className="py-2 cursor-pointer hover:text-muted">
                    {f.text3}
                  </span>
                  <span className="py-2 cursor-pointer hover:text-muted">
                    {f.text4}
                  </span>
                  <span className="py-2 cursor-pointer hover:text-muted">
                    {f.text5}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>
        <p className="bg-[#f0efe9] text-sm font-sans font-medium w-full text-center p-2 tracking-wide  flex-1 h-auto text-muted">
          &copy; {year} Onika. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
