"use client";

import {
  useRef,
  useState,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
} from "react";
import Button from "@/component/button";
import { Form } from "@/component/form";
import auth from "@/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import logo from "../../public/logo1.png";
import { verifySchema, verifyFormDTO } from "@/schema/userSchema";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 30;

function OTPBoxes({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const digits = value
    .split("")
    .concat(Array(OTP_LENGTH).fill(""))
    .slice(0, OTP_LENGTH);

  const setDigit = (index: number, digit: string) => {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join(""));
  };

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    setDigit(index, digit);
    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
      setDigit(index - 1, "");
    }
    if (e.key === "ArrowLeft" && index > 0)
      inputsRef.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1)
      inputsRef.current[index + 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;
    onChange(
      pasted.padEnd(OTP_LENGTH, "").slice(0, OTP_LENGTH).replace(/ /g, ""),
    );
    const lastIndex = Math.min(pasted.length, OTP_LENGTH) - 1;
    inputsRef.current[lastIndex]?.focus();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            aria-label={`Digit ${i + 1} of ${OTP_LENGTH}`}
            className={`h-14 w-11 sm:h-16 sm:w-13 rounded-xl border-2 bg-white text-center text-xl font-semibold font-sans text-neutral-900 outline-none transition-colors focus:border-[#0F6E5E] focus:ring-4 focus:ring-[#0F6E5E]/15 ${
              error ? "border-red-400" : "border-neutral-200"
            }`}
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm font-sans text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function VerifyPage() {
  const router = useRouter();
  const { mutate, isPending } = auth.useVerifyOTP();
  const { mutate: resendMutate, isPending: isResending } = auth.useResendOTP();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");

  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);

  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setInterval(
      () => setCooldown((s) => Math.max(s - 1, 0)),
      1000,
    );
    return () => clearInterval(timer);
  }, [cooldown]);

  const onSubmit = (data: verifyFormDTO) => {
    if (!email || isPending) {
      return;
    }
    mutate(
      { ...data, email },
      {
        onSuccess: (user) => {
          router.push(
            user.role === "artisan" ? "/artisan-profile" : "/dashboard",
          );
        },
      },
    );
  };

  const handleResend = () => {
    if (cooldown > 0 || isResending) return;
    resendMutate();
    setCode("");
    setCooldown(RESEND_COOLDOWN);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF9F6] px-4 py-10">
      <div className="w-full max-w-sm flex flex-col items-center gap-8 text-center">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="" width={32} height={32} />
          <span className="font-heading text-xl font-bold text-neutral-900">
            Onika
          </span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h1 className="font-heading text-3xl font-bold text-neutral-900">
            Enter your code
          </h1>
          <p className="font-sans text-sm text-neutral-500">
            We texted a {OTP_LENGTH}-digit code to{" "}
            <span className="font-medium text-neutral-700">{email}</span>
          </p>
        </div>

        <Form
          className="flex w-full flex-col items-center gap-6"
          onSubmit={onSubmit}
          schema={verifySchema}
        >
          {(methods) => {
            const error = methods.formState.errors.OTP?.message as
              | string
              | undefined;

            return (
              <>
                <OTPBoxes
                  value={code}
                  onChange={(val) => {
                    setCode(val);
                    methods.setValue("OTP", val, { shouldValidate: true });
                  }}
                  error={error}
                />

                <Button
                  type="submit"
                  isLoading={isPending}
                  loadingText="Verifying..."
                  disabled={code.length < OTP_LENGTH}
                  className="w-full"
                >
                  Verify and continue
                </Button>
              </>
            );
          }}
        </Form>

        <p className="font-sans text-sm text-neutral-500">
          Didn&apos;t get it?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0 || isResending}
            className="font-medium text-[#0F6E5E] transition-colors hover:text-[#0B5548] disabled:cursor-not-allowed disabled:text-neutral-400"
          >
            {isResending
              ? "Sending..."
              : cooldown > 0
                ? `Resend in ${cooldown}s`
                : "Resend code"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default VerifyPage;
