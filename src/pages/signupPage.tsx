"use client";

import auth from "@/api/auth";
import { signupFormDTO, signUpSchema } from "../schema/userSchema";
import { Form } from "@/component/form";
import { InputField } from "../component/inputField";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import { UserRole } from "@/lib/types";
import { useState } from "react";
import Link from "next/link";
function SignupPage() {
  const router = useRouter();
  const { mutate, isPending } = auth.useSignupMutation();
  const [role, setRole] = useState<UserRole>("customer");
  const onSubmit = (data: signupFormDTO) => {
    mutate(data, {
      onSuccess: () => {
        router.push("./push");
      },
    });
  };
  return (
    <div>
      {/* image */}
      <div></div>
      {/* form */}
      <div>
        <Image src={} alt="Onika logo" width={100} height={100} />
        <h3>Create an account as a customer or artisan</h3>
        <Form onSubmit={onSubmit} schema={signUpSchema}>
          {(methods) => (
            <div>
              <button
                type="button"
                onClick={() => setRole("customer")}
                className={`${role === "customer"}`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole("artisan")}
                className={`${role === "artisan"}`}
              ></button>
              <InputField
                label="Full name"
                type="text"
                placeholder="John Sam"
                registration={methods.register("fullName")}
                error={methods.formState.errors.fullName}
              />
              <InputField
                label="email"
                type="email"
                placeholder="testexample@gmail.com"
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
              <InputField
                label="State"
                type="text"
                placeholder="Lagos"
                registration={methods.register("state")}
                error={methods.formState.errors.state}
              />
              <InputField
                label="Local Government"
                type="text"
                placeholder="Ikeja"
                registration={methods.register("lga")}
                error={methods.formState.errors.lga}
              />
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
              <button disabled={isPending}>
                {isPending ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </button>

              <div>
                <p>You have an account?</p>{" "}
                <Link href="/login">Login</Link>
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}

export default SignupPage;
