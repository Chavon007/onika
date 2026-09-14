"use cleint";
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


function getStepFromStatus(status:string): number {
    const map: Record<string, number> = {
    pending: 1,
    accepted: 3,
    in_progress: 4,
    awaiting_confirmation: 5,
    completed: 6,
    }
    return map[status] ?? 1;
}

export function CustomerActiveJob({ jobs }: { jobs: jobDetails }) {
  const formattedDate = new Date(jobs.createdAt).toLocaleDateString("en-NG");
  const [releasePayemt, setReleasePayment] = useState(false);
  const [dispute, setDispute] = useState(false);
 const currentStep = getStepFromStatus(jobs.status);
 const [disputeText, setDisputeText] = useState("");
  return (
    <div>
      <div>
  
          <h3><span>Service:</span> <span>{jobs.category}</span></h3>
        <small>{jobs.status}</small>
        <p><span>Artisan:</span> <span>{jobs.artisanId?.fullName}</span></p>
        <p><small>{formattedDate}</small> <small>📍 {jobs.address}</small></p>
        <span>Budget: ₦{jobs.price.toLocaleString()}</span>

        <Steppers steps={stepLabels} currentNumber={currentStep} />


          {/* Action button */}

           {currentStep === 5 && (
          <div>
            <Button type="button" onClick={() => setReleasePayment(true)}>
              Confirm Completion and Release Payment
            </Button>
            <Button type="button" onClick={() => setDispute(true)}>
              Raise Dispute
            </Button>
          </div>
        )}
        </div>

        {/* payment modal */}

        {releasePayemt && (
          <div>
            <div>
              <small>✅</small>
              <h4>Confirm Job Completion</h4>
              <p>
                By confirming, you release the escrowed funds to the artisan.
                This action cannot be undone.
              </p>

              <Button onClick={() => setReleasePayment(false)}>Cancel</Button>
              <Button onClick={()}>Release Payment</Button>
            </div>
          </div>
        )}

        {dispute && (
            <div>
                <div>
                    <small>❌</small>
                    <h4>What is the issue?</h4>
                    <TextArea registration={}/>
                    <Button onClick={() => setDispute(false)}>Cancel</Button>
                    <Button loadingText="sending...">Send</Button>
                </div>
            </div>
        )}
      </div>

  );
}
