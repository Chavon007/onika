"use client";

import auth from "@/api/auth";
import { signupFormDTO, signUpSchema } from "../schema/userSchema";
import { Form } from "@/component/form";
import { InputField } from "../component/inputField";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import { UserRole } from "@/lib/types";
import { useState, useEffect } from "react";
import Link from "next/link";
import logo from "../../public/logo1.png";
import { poppins } from "@/lib/fonts";

const images = [
  "https://i.pinimg.com/736x/65/9a/a2/659aa2282572a132c9fa145f166f07da.jpg",
  "https://i.pinimg.com/1200x/77/7e/b4/777eb4f68ce664bdaacaff05111d5128.jpg",
  "https://images.unsplash.com/photo-1542013936693-884638332954?w=600&auto=format&fit=crop&q=60",
];

function SignupPage() {
  const router = useRouter();
  const { mutate, isPending } = auth.useSignupMutation();

  const [role, setRole] = useState<UserRole>("customer");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data: signupFormDTO) => {
    mutate(
      { ...data, role },
      {
        onSuccess: () => router.push("/login"),
      },
    );
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
     
     {/* image */}
      <div className="hidden md:block w-1/2 min-h-screen relative">
        <Image
          key={currentImage}
          src={images[currentImage]}
          alt="Signup visual"
          fill
          priority
          className="object-cover transition-all duration-700"
        />
      </div>

     {/* form */}
      <div className="w-full md:w-1/2 bg-background flex items-center justify-center p-4 overflow-y-auto">
        <div className="w-full max-w-md">
         
          <div className="flex flex-col items-center text-center mb-4">
            <Image src={logo} alt="Logo" width={100} height={80} />
            <h3 className={`${poppins.className} text-2xl font-bold text-text`}>
              Create an account
            </h3>
            <p className="text-muted text-sm">Join as a customer or artisan</p>
          </div>

          {/* FORM CARD */}
          <div className="w-full max-w-md py-10">
            <Form
              className="flex flex-col gap-3 p-5 border border-primary/30 rounded-2xl bg-card shadow-md"
              onSubmit={onSubmit}
              schema={signUpSchema}
            >
              {(methods) => (
                <>
                  {/* ROLE */}
                  <div className="flex justify-center gap-6 mb-2">
                    <button
                      type="button"
                      onClick={() => setRole("customer")}
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
                      onClick={() => setRole("artisan")}
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

                  {/* STATE + LGA SIDE BY SIDE */}
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

                  <button
                    type="submit"
                    disabled={isPending}
                    className="bg-primary w-full text-sm font-bold text-background rounded p-2 flex items-center justify-center gap-2"
                  >
                    {isPending ? (
                      <>
                        <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                        Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs">
                    <p className="text-text">Already have an account?</p>
                    <Link
                      className="text-blue-400 hover:underline"
                      href="/login"
                    >
                      Login
                    </Link>
                  </div>
                </>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
