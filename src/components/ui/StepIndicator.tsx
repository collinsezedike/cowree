import { Check } from "lucide-react";

interface Step {
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;

        return (
          <div key={idx} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                  transition-all duration-300
                  ${isCompleted ? "bg-forest-800 text-cream" : ""}
                  ${isActive ? "bg-gold-500 text-forest-900 ring-4 ring-gold-200" : ""}
                  ${!isCompleted && !isActive ? "bg-forest-100 text-forest-400" : ""}
                `}
              >
                {isCompleted ? <Check size={14} /> : idx + 1}
              </div>
              <span
                className={`mt-1 text-xs font-medium whitespace-nowrap
                  ${isActive ? "text-gold-600" : isCompleted ? "text-forest-700" : "text-forest-400"}
                `}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`h-0.5 w-12 mx-1 mb-5 transition-all duration-300
                  ${idx < currentStep ? "bg-forest-800" : "bg-forest-100"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
