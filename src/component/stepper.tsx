import { GrStatusGood } from "react-icons/gr";

interface Step {
  label: string;
}

interface stepperProps {
  steps: Step[];
  currentNumber: number;
}

function Steppers({ steps, currentNumber }: stepperProps) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentNumber;
        const isActive = stepNumber === currentNumber;

        return (
          <div
            className="flex items-center flex-1 last:flex-none"
            key={step.label}
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0
                  ${isCompleted ? "bg-green-500 text-white" : ""}
                  ${isActive ? "bg-orange-500 text-white" : ""}
                  ${!isCompleted && !isActive ? "bg-gray-200 text-gray-500" : ""}
                `}
              >
                {isCompleted ? <GrStatusGood /> : stepNumber}
              </div>
              <p
                className={`mt-2 text-[2px] whitespace-nowrap font-sans ${
                  isActive ? "text-gray-900 font-light" : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-2 mb-6 ${
                  isCompleted ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Steppers;