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
import { useEffect, useState } from "react";
import { poppins } from "@/lib/fonts";

const images = [
  "https://i.pinimg.com/736x/65/9a/a2/659aa2282572a132c9fa145f166f07da.jpg",
  "https://i.pinimg.com/1200x/77/7e/b4/777eb4f68ce664bdaacaff05111d5128.jpg",
  "https://images.unsplash.com/photo-1542013936693-884638332954?w=600&auto=format&fit=crop&q=60",
];

function LoginPage() {
  const router = useRouter();
  const { mutate, isPending } = auth.useLoginMutation();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data: loginFormDTO) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

  return (
    <div className="flex min-h-screen overflow-hidden">

      {/* LEFT IMAGE */}
      <div className="hidden md:block w-1/2 min-h-screen relative">
        <Image
          key={currentImage}
          src={images[currentImage]}
          alt="Login visual"
          fill
          priority
          className="object-cover transition-all duration-700"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 bg-background flex items-center justify-center p-4 overflow-y-auto">
        <div className="w-full max-w-md">

          {/* HEADER */}
          <div className="flex flex-col items-center text-center mb-4">
            <Image src={logo} alt="Logo" width={100} height={80} />
            <h3 className={`${poppins.className} text-2xl font-bold text-text`}>
              Welcome back
            </h3>
            <p className="text-muted text-sm">
              Login into your account
            </p>
          </div>

          {/* FORM CARD */}
          <div className="w-full max-w-md py-10">
            <Form
              className="flex flex-col gap-3 p-5 border border-primary/30 rounded-2xl bg-card shadow-md"
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
                    className="bg-primary w-full text-sm font-bold text-background rounded p-2 flex items-center justify-center gap-2"
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

                  <div className="flex items-center justify-center gap-2 text-xs">
                    <p className="text-text">
                      You don't have an account?
                    </p>
                    <Link
                      className="text-blue-400 hover:underline"
                      href="/signup"
                    >
                      Signup
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

export default LoginPage;