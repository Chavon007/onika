"use client";

import auth from "@/api/auth";
import { Form } from "@/component/form";
import { InputField } from "@/component/inputField";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { loginFormDTO, loginSchema } from "../schema/userSchema";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
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
    <div>
      {/* image */}
      <Image src={} alt="onika logo" width={100} height={100} />

      <div>
        <h3>Login into your account</h3>

        <Form onSubmit={onSubmit} schema={loginSchema}>
          {(methods) => (
            <div>
              <InputField
                label="email"
                type="email"
                placeholder="testexample@gmail.com"
                registration={methods.register("email")}
                error={methods.formState.errors.email}
              />
              <InputField
                label="password"
                type="password"
                placeholder="*********"
                registration={methods.register("password")}
                error={methods.formState.errors.password}
              />

              <button type="button" disabled={isPending}>
                {" "}
                {isPending ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>

              <div>
                <p>You don't have an account yet?</p>{" "}
                <Link href="/signup">Signup</Link>
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
export default LoginPage;
