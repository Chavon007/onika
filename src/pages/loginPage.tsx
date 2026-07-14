"use client";

import auth from "@/api/auth";
import { Form } from "@/component/form";
import { InputField } from "@/component/inputField";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { loginFormDTO, loginSchema } from "../schema/userSchema";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import logo from "../../public/logo1.png";
import Link from "next/link";

const features = [
  {
    title: "Escrow-Protected Payments",
    desc: "Funds helid until job confirmed done",
    icon: "🔒",
  },
  {
    title: "NIN/BVN Verified Artisans",
    desc: "Every artisan identity-checked before approval",
    icon: "✅",
  },
  {
    title: "Behavioral Trust Score",
    desc: "Real ratings + completion rate on every profile",
    icon: "🌟",
  },
  {
    title: "Masked Phone Numbers",
    desc: "Contact stays inside the platform, no bypass",
    icon: "📱",
  },
];

function LoginPage() {
  const router = useRouter();
  const { mutate, isPending } = auth.useLoginMutation();

  const onSubmit = (data: loginFormDTO) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

  return (
    <div className="flex min-h-screen overflow-hidden ">
      {/* LEFT IMAGE */}
      <div className="hidden md:block w-1/2 min-h-screen relative bg-main  p-9">
        {/* logo */}
        <div className="flex w-[80%] mx-auto items-center gap-2">
          <Image src={logo} alt="onika" width={40} height={40} />
          <h2 className="font-heading text-3xl font-bold text-background">
            Onika
          </h2>
        </div>

        {/* content */}
        <div className=" w-[80%] mx-auto flex flex-col mt-7">
          <h2 className="w-[450px] text-4xl font-semibold font-heading text-background">
            Nigeria's most trusted artisan marketplace
          </h2>
          <p className="font-sans mt-4 text-xs text-gray-400 font-medium">
            Verified professionals. Escrow-protected payments. Zero scam risk.
          </p>

          <div className=" flex flex-col gap-5 mt-5 p-2">
            {features.map((f) => (
              <div
                key={f.title}
                className=" flex gap-3 bg-text rounded-2xl p-3"
              >
                <h6 className="text-xl">{f.icon}</h6>
                <p className="flex flex-col gap-1 text-white">
                  <strong className="font-heading text-base font-bold">
                    {f.title}
                  </strong>{" "}
                  <span className="text-sm text-gray-400 font-sans font-light">
                    {f.desc}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 bg-background flex items-center justify-center p-4 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* HEADER */}
          <div className="flex flex-col gap-2">
            <h3 className={` text-4xl text-muted font-heading font-bold`}>
              Welcome back
            </h3>
            <div className="flex items-center gap-2 text-xs">
              <p className="text-text font-light font-sans text-sm">
                Don't have an account?
              </p>
              <Link
                className="text-accent font-sans font-bold text-sm hover:underline"
                href="/signup"
              >
                Sign up free
              </Link>
            </div>
          </div>

          {/* FORM CARD */}
          <div className="w-full mt-3">
            <Form
              className="flex flex-col gap-3"
              onSubmit={onSubmit}
              schema={loginSchema}
            >
              {(methods) => (
                <>
                  <InputField
                    label="Email"
                    type="email"
                    placeholder="test@example.com"
                    registration={methods.register("email")}
                    error={methods.formState.errors.email}
                  />

                  <InputField
                    label="Password"
                    type="password"
                    placeholder="********"
                    registration={methods.register("password")}
                    error={methods.formState.errors.password}
                  />

                  <button
                    type="submit"
                    disabled={isPending}
                    className="bg-primary w-full text-sm font-bold text-background rounded-xl p-3 flex items-center justify-center gap-2"
                  >
                    {isPending ? (
                      <>
                        <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
