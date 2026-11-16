import { Suspense } from "react";
import VerifyPage from "@/views/verifyPage";

function Verify() {
  return (
    <Suspense fallback={null}>
      <VerifyPage />
    </Suspense>
  );
}

export default Verify;