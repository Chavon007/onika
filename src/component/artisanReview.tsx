import { IoIosHourglass } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import Button from "./button";
import Link from "next/link";
const review = [
  {
    title: "Identity Verification (NIN/BVN)",
    icon: <IoSearchOutline />,
    status: "In review",
    color: "#293e5a",
  },
  {
    title: "Skill Portfolio Review",
    icon: <IoSearchOutline />,
    status: "In review",
    color: "#293e5a",
  },
  {
    title: "Background Check",
    icon: <IoIosHourglass />,
    status: "Queued",
    color: "#ec6b2a",
  },
  {
    title: "Profile Approval",
    icon: <IoIosHourglass />,
    status: "Pending",
    color: "#ec6b2a",
  },
];

function ArtisanReview() {
  return (
    <div className="min-h-screen p-4 flex items-center">
      <div className="container flex flex-col gap-2 items-center  justify-center w-[50%] mx-auto ">
        <section className="p-3 flex gap-3 flex-col justify-center items-center">
          <IoIosHourglass className="bg-primary/20 rounded rounded-full p-4 text-[80px] text-primary" />
          <h3 className="font-heading text-2xl font-bold text-black">
            Under Review
          </h3>
          <p className="text-xs font-light text-center max-w-[400px] leading-5 tracking-wider text-black/70">
            Your application has been submitted. Our team will verify your
            NIN/BVN and review your portfolio within 24–48 hours. You'll receive
            an email once approved.
          </p>
        </section>

        <section className="grid grid-col-1 gap-3">
          {review.map((r) => (
            <div
              className="border rounded-xl border-accent/20 w-[500px] p-2"
              key={r.title}
            >
              <div className="flex justify-between items-center p-1">
                <h5 className="flex items-center gap-3">
                  <span style={{ color: r.color }}>{r.icon}</span>
                  <span className="text-muted text-sm font-sans font-normal">
                    {r.title}
                  </span>
                </h5>
                <p className="text-xs font-sans text-black bg-accent/30 font-normal p-2 w-[80px] text-center rounded rounded-full">
                  {r.status}
                </p>
              </div>
            </div>
          ))}
        </section>
        <Button type="button" className="w-[140px] mt-2">
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}

export default ArtisanReview;
