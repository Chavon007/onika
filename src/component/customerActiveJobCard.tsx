"use client";

import { useState } from "react";
import { jobDetails } from "@/lib/types";
import Button from "./button";
import toast from "react-hot-toast";
import TextArea from "./TextArea";
import Steppers from "./stepper";

const stepLabels = [
  { label: "Job Posted" },
  { label: "Artisan Matched" },
  { label: "Payment Escrowed" },
  { label: "Job In Progress" },
  { label: "Awaiting Your Confirmation" },
  { label: "Payment Released" },
];

function getStepFromStatus(status: string): number {
  const map: Record<string, number> = {
    pending: 1,
    accepted: 3,
    in_progress: 4,
    awaiting_confirmation: 5,
    completed: 6,
  };

  return map[status] ?? 1;
}

export function CustomerActiveJob({ jobs }: { jobs: jobDetails }) {
  const formattedDate = new Date(jobs.createdAt).toLocaleDateString("en-NG");

  const [releasePayemt, setReleasePayment] = useState(false);
  const [dispute, setDispute] = useState(false);
  const currentStep = getStepFromStatus(jobs.status);
  const [disputeText, setDisputeText] = useState("");

  const isCompleted = jobs.status === "completed";

  const statusLabel = jobs.status.replace("_", " ");

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      {/* Main Job Information */}
      <div className="p-6">
        <div className="flex flex-col gap-6">
          {/* Top section */}
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            {/* Job identity */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-heading text-xl font-bold text-text">
                  {jobs.category}
                </h3>

                {/* Status */}
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-semibold capitalize ${
                    isCompleted
                      ? "bg-green-100 text-green-700"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isCompleted ? "bg-green-600" : "bg-primary"
                    }`}
                  />

                  {statusLabel}
                </span>
              </div>

              {/* Artisan */}
              <p className="mt-3 font-sans text-sm text-muted">
                Artisan{" "}
                <span className="font-semibold text-text">
                  {jobs.artisanId?.fullName}
                </span>
              </p>
            </div>

            {/* Budget */}
            <div className="shrink-0 md:text-right">
              <p className="font-sans text-xs font-medium uppercase tracking-wide text-muted">
                Budget
              </p>

              <p className="mt-0.5 font-heading text-xl font-bold text-text">
                ₦{jobs.price.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Job Meta */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-border py-4 font-sans text-sm text-muted">
            <span className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-xs">
                📅
              </span>

              {formattedDate}
            </span>

            <span className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-xs">
                📍
              </span>

              {jobs.address}
            </span>
          </div>

          {/* Description */}
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="font-heading text-base font-bold  tracking-wide text-text">
              Job Description
            </p>

            <p className="mt-2 font-sans text-sm leading-6 text-muted">
              {jobs.description}
            </p>
          </div>

          {/* Progress */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="font-sans text-sm font-semibold text-text">
                Job Progress
              </p>

              <span className="font-sans text-xs text-muted">
                Step {currentStep} of {stepLabels.length}
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border bg-background px-4 py-5">
              <Steppers steps={stepLabels} currentNumber={currentStep} />
            </div>
          </div>
        </div>

        
        {/* Actions */}
        <div className="mt-6 grid grid-cols-1 gap-3 border-t border-border pt-5 md:grid-cols-2">
          <Button
            type="button"
            className="bg-main text-white hover:bg-main/90"
            onClick={() => {
              if (jobs.status !== "awaiting_confirmation") {
                toast.error(
                  "You can only confirm completion when the job is awaiting your confirmation.",
                );
                return;
              }

              setReleasePayment(true);
            }}
          >
            Confirm Completion & Release Payment
          </Button>

          <Button
            type="button"
            className="border border-red-200 bg-white text-red-600 hover:bg-red-50"
            onClick={() => setDispute(true)}
          >
            Raise Dispute
          </Button>
        </div>
      </div>

      {/* Payment Modal */}
      {releasePayemt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-main/50 px-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-xl">
            <div className="flex flex-col">
              {/* Icon */}
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
                <span className="text-lg">✓</span>
              </div>

              {/* Content */}
              <h4 className="mt-5 font-heading text-lg font-bold text-text">
                Confirm Job Completion
              </h4>

              <p className="mt-2 font-sans text-sm leading-6 text-muted">
                By confirming, you release the escrowed funds to the artisan.
                This action cannot be undone.
              </p>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  className="border border-border bg-white text-muted hover:bg-secondary"
                  onClick={() => setReleasePayment(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  className="bg-primary text-white hover:bg-primary/90"
                  onClick={() => setReleasePayment(true)}
                >
                  Release Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dispute Modal */}
      {dispute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-main/50 px-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-xl">
            <div className="flex flex-col">
              {/* Icon */}
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
                <span className="text-lg text-red-600">!</span>
              </div>

              {/* Content */}
              <h4 className="mt-5 font-heading text-lg font-bold text-text">
                What is the issue?
              </h4>

              <p className="mt-2 font-sans text-sm leading-6 text-muted">
                Tell us what went wrong with the job.
              </p>

              {/* Text Area */}
              {/* <TextArea registration={} /> */}

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  className="border border-border bg-white text-muted hover:bg-secondary"
                  onClick={() => setDispute(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  loadingText="sending..."
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
