"use client";

import auth from "@/api/auth";
import { signupFormDTO, signUpSchema } from "../schema/userSchema";
import { Form } from "@/component/form";
import { InputField } from "../component/inputField";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UserRole } from "@/lib/types";
import { useState } from "react";
import Link from "next/link";
import logo from "../../public/logo1.png";
import Button from "@/component/button";

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
function SignupPage() {
  const router = useRouter();
  const { mutate, isPending } = auth.useSignupMutation();

  const [role, setRole] = useState<UserRole>("customer");

  const onSubmit = (data: signupFormDTO) => {
    mutate(
      { ...data },
      {
        onSuccess: () =>
          router.push(`/verify?email=${encodeURIComponent(data.email)}`),
      },
    );
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* image */}
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

      {/* form */}
      <div className="w-full md:w-1/2 bg-background flex items-center justify-center p-4 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="flex flex-col py-5 ">
            <h3 className={`text-4xl text-muted font-heading font-bold`}>
              Create an account
            </h3>
            <div className="flex items-center gap-2 text-xs">
              <p className="text-text font-light font-sans text-sm">
                Already registered?
              </p>
              <Link
                className="text-accent font-sans font-bold text-sm hover:underline"
                href="/login"
              >
                Log in
              </Link>
            </div>
          </div>

          {/* FORM CARD */}
          <div className="w-full max-w-md">
            <Form<signupFormDTO>
              className="flex flex-col gap-3 p-5 border border-primary/30 rounded-2xl bg-card shadow-md"
              onSubmit={onSubmit}
              schema={signUpSchema}
              defaultValues={{ role: "customer" }}
            >
              {(methods) => {
                return (
                  <>
                    {/* ROLE */}
                    <div className="flex justify-center gap-6 mb-2">
                      <button
                        type="button"
                        onClick={() => {
                          setRole("customer");
                          methods.setValue("role", "customer", {
                            shouldValidate: true,
                          });
                        }}
                        className={`text-sm font-medium pb-1 ${
                          role === "customer"
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted"
                        }`}
                      >
                        Customer
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setRole("artisan");
                          methods.setValue("role", "artisan", {
                            shouldValidate: true,
                          });
                        }}
                        className={`text-sm font-medium pb-1 ${
                          role === "artisan"
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted"
                        }`}
                      >
                        Artisan
                      </button>
                    </div>

                    <InputField
                      label="Full name"
                      type="text"
                      placeholder="John Sam"
                      registration={methods.register("fullName")}
                      error={methods.formState.errors.fullName}
                    />

                    <InputField
                      label="Email"
                      type="email"
                      placeholder="test@example.com"
                      registration={methods.register("email")}
                      error={methods.formState.errors.email}
                    />

                    <InputField
                      label="Phone Number"
                      type="tel"
                      placeholder="08131344765"
                      registration={methods.register("phoneNumber")}
                      error={methods.formState.errors.phoneNumber}
                    />

                    <div className="flex gap-3">
                      <div className="flex-1">
                        <InputField
                          label="State"
                          type="text"
                          placeholder="Lagos"
                          registration={methods.register("state")}
                          error={methods.formState.errors.state}
                        />
                      </div>

                      <div className="flex-1">
                        <InputField
                          label="LGA"
                          type="text"
                          placeholder="Ikeja"
                          registration={methods.register("lga")}
                          error={methods.formState.errors.lga}
                        />
                      </div>
                    </div>

                    <InputField
                      label="Password"
                      type="password"
                      placeholder="***********"
                      registration={methods.register("password")}
                      error={methods.formState.errors.password}
                    />

                    <InputField
                      label="Confirm Password"
                      type="password"
                      placeholder="***********"
                      registration={methods.register("confirmPassword")}
                      error={methods.formState.errors.confirmPassword}
                    />

                    <Button
                      type="submit"
                      isLoading={isPending}
                      loadingText="Creating account..."
                    >
                      {" "}
                      Create account
                    </Button>
                  </>
                );
              }}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
