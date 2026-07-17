"use client";

import Button from "@/component/button";
import { InputField } from "@/component/inputField";
import { Form } from "@/component/form";
import auth from "@/api/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../public/logo1.png";
import { verifySchema, verifyFormDTO } from "@/schema/userSchema";

function VerifyPage() {
  const router = useRouter();
  const { mutate, isPending } = auth.useVerifyOTP();
  const { mutate: resendMutate, isPending: isResending } = auth.useResendOTP();

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
    <div>
      <div>
        {/* logo */}
        <section>
          <Image src={logo} alt="" width={50} height={50} />
          <h2>Onika</h2>
        </section>
        <button type="button">📱</button>
        <section>
          <h3>Verify your phone</h3>
          <p>We sent a 6-digit code via SMS to</p>
          <Form onSubmit={onSubmit} schema={verifySchema}>
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

                <button
                  type="submit"
                  onClick={handleResend}
                  disabled={isResending}
                >
                  {isResending ? "Sending..." : "Resend code"}
                </button>
              </>
            )}
          </Form>
        </section>
      </div>
    </div>
  );
}

export default VerifyPage;
