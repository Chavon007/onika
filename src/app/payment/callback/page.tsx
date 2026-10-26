import { Suspense } from "react";
import CallBack from "@/component/CallBack";

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={null}>
      <CallBack />
    </Suspense>
  );
}