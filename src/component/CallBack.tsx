"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useGetFundingReference } from "@/api/wallet";
import Button from "@/component/button";

const REDIRECT_DELAY = 3000;
const PENDING_STATUSES = ["pending", "ongoing", "processing", "queued"];

function CallBack() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const reference =
    searchParams?.get("reference") ?? searchParams?.get("trxref");

  const { data, isError, isLoading, isFetching, refetch } =
    useGetFundingReference(reference || null);

  const paid = data?.paid === true;
  const stillProcessing =
    Boolean(data) && !paid && PENDING_STATUSES.includes(data?.status ?? "");
  const notCompleted = Boolean(data) && !paid && !stillProcessing;
  const shouldRedirect = !reference || paid || notCompleted;

  // Refresh the wallet data once the payment is confirmed
  useEffect(() => {
    if (!paid) return;
    queryClient.invalidateQueries({ queryKey: ["transaction-history"] });
    queryClient.invalidateQueries({ queryKey: ["wallet"] });
  }, [paid, queryClient]);

  // Send the user back to the dashboard after a short pause
  useEffect(() => {
    if (!shouldRedirect) return;
    const timer = setTimeout(
      () => router.replace("/dashboard"),
      REDIRECT_DELAY,
    );
    return () => clearTimeout(timer);
  }, [shouldRedirect, router]);

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-primary" />
          <h2 className="font-heading text-lg font-bold text-[#1c1917]">
            Confirming your payment
          </h2>
          <p className="max-w-sm font-sans text-sm text-muted">
            Please wait while we confirm your payment with Paystack. Don't close
            or refresh this page.
          </p>
        </div>
      </div>
    );
  }

  let icon: string;
  let title: string;
  let message: string;

  if (!reference) {
    icon = "🔍";
    title = "No payment found";
    message =
      "We couldn't find a payment to confirm. Taking you back to your dashboard...";
  } else if (isError) {
    icon = "⚠️";
    title = "We couldn't confirm your payment";
    message =
      "Something went wrong while checking your payment. If money was taken from your account, contact support with the reference below.";
  } else if (paid) {
    icon = "✅";
    title = "Payment successful";
    message =
      "Your wallet has been funded. Taking you back to your dashboard...";
  } else if (stillProcessing) {
    icon = "⏳";
    title = "Payment still processing";
    message =
      "Your bank hasn't confirmed this payment yet. Wait a moment and check again. If you were debited and your wallet doesn't update, contact support with the reference below.";
  } else {
    icon = "❌";
    title = "Payment not completed";
    message =
      "No money was added to your wallet. If you were debited, contact support with the reference below. Taking you back to your dashboard...";
  }

  return (
    <div className="flex h-full min-h-[60vh] items-center justify-center p-4">
      <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-2xl border border-border bg-[#fff] p-8 text-center">
        <span className="text-4xl">{icon}</span>
        <h2 className="font-heading text-xl font-bold text-[#1c1917]">
          {title}
        </h2>
        <p className="font-sans text-sm text-[#78716c]">{message}</p>

        {reference && !paid && (
          <p className="break-all font-sans text-xs text-black/50">
            Reference: {reference}
          </p>
        )}

        <div className="mt-2 flex gap-2">
          {(stillProcessing || isError) && reference && (
            <Button onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Checking..." : "Check again"}
            </Button>
          )}
          <Button
            className="bg-white"
            onClick={() => router.replace("/dashboard")}
          >
            Back to dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CallBack;
