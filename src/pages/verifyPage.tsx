"use client";

import Button from "@/component/button";
import { InputField } from "@/component/inputField";
import { Form } from "@/component/form";
import auth from "@/api/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../public/logo1.png";
import { verifySchema, verifyFormDTO } from "@/schema/userSchema";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function VerifyPage() {
  const router = useRouter();
  const { mutate, isPending } = auth.useVerifyOTP();
  const { mutate: resendMutate, isPending: isResending } = auth.useResendOTP();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams?.get("phone");

  const onSubmit = (data: verifyFormDTO) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

  const handleResend = () => {
    resendMutate();
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="w-full sm:w-[85%] md:w-[60%] lg:w-[40%] mx-auto flex flex-col gap-3 justify-center h-auto p-4 sm:p-6">
        <section className="flex items-center gap-3 font-sans text-sm sm:text-base text-black font-medium hover:text-muted/65 cursor-pointer">
          <FaArrowLeft />
          <Link href="/signup">Back</Link>
        </section>

        {/* logo */}
        <section className="flex items-center text-muted gap-1">
          <Image src={logo} alt="" width={35} height={35} />
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">Onika</h2>
        </section>

        <button type="button" className="p-2 flex text-4xl sm:text-5xl">
          📱
        </button>

        <section className="flex flex-col gap-3">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading">
            Verify your phone
          </h3>
          <p className="text-gray-400 text-sm font-light font-sans pl-2 break-words">
            We sent a 6-digit code via SMS to {phoneNumber}
          </p>

          <Form
            className="flex flex-col gap-3"
            onSubmit={onSubmit}
            schema={verifySchema}
          >
            {(methods) => (
              <>
                <InputField
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  registration={methods.register("OTP")}
                  error={methods.formState.errors.OTP}
                />

                <Button
                  type="submit"
                  isLoading={isPending}
                  loadingText="Verifying..."
                >
                  Verify & Contiune
                </Button>
              </>
            )}
          </Form>

          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="text-xs hover:text-accent/65 cursor-pointer text-accent font-sans"
          >
            {isResending ? "Sending..." : "Resend code"}
          </button>
        </section>
      </div>
    </div>
  );
}

export default VerifyPage;