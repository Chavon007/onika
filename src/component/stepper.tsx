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
    <div>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentNumber;
        const isActive = stepNumber === currentNumber;

        return (
          <div key={step.label}>
            <div>
              {isCompleted ? <GrStatusGood /> : stepNumber}
              <p>{step.label}</p>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`${isCompleted ? "bg-green-500" : "bg-gray-200"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Steppers;
