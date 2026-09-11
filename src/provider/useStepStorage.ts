import { useEffect, useState } from "react";

export function useStepStorage(storageKey: string, totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(`${storageKey}-step`);
      const saved = raw ? Number(raw) : 1;
      if (saved >= 1 && saved <= totalSteps) setCurrentStep(saved);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(`${storageKey}-step`, String(currentStep));
    } catch {}
  }, [storageKey, currentStep]);

  return [currentStep, setCurrentStep] as const;
}
