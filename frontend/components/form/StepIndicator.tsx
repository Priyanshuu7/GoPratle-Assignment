import React from "react";
import { Check } from "lucide-react";
import { CategoryType } from "@/types/event";

interface StepIndicatorProps {
  currentStep: number;
  category: CategoryType;
  onStepClick: (step: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  category,
  onStepClick,
}) => {
  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return "Basics";
      case 2:
        if (category === "PLANNER") return "Logistics";
        if (category === "PERFORMER") return "Act details";
        return "Shift roles";
      case 3:
        if (category === "PLANNER") return "Milestones";
        if (category === "PERFORMER") return "Tech rider";
        return "Equipment";
      case 4:
        return "Review";
      default:
        return "";
    }
  };

  const steps = [1, 2, 3, 4];

  return (
    <nav aria-label="Progress" className="w-full mb-6">
      <ol className="flex items-center w-full gap-2 border-b border-zinc-850 pb-4">
        {steps.map((step, idx) => {
          const isCompleted = currentStep > step;
          const isCurrent = currentStep === step;

          return (
            <li key={step} className="flex-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (step < currentStep) onStepClick(step);
                }}
                disabled={step > currentStep}
                className={`group flex items-center gap-2 text-left w-full transition-colors ${
                  step <= currentStep ? "cursor-pointer" : "cursor-not-allowed opacity-40"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-[11px] font-mono font-medium transition-colors ${
                    isCompleted
                      ? "bg-zinc-800 text-zinc-300"
                      : isCurrent
                      ? "bg-white text-zinc-950 font-bold"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-500"
                  }`}
                >
                  {isCompleted ? <Check className="h-3 w-3 stroke-[2.5]" /> : step}
                </span>

                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-xs font-medium truncate ${
                      isCurrent
                        ? "text-zinc-100"
                        : isCompleted
                        ? "text-zinc-400 group-hover:text-zinc-200"
                        : "text-zinc-600"
                    }`}
                  >
                    {getStepTitle(step)}
                  </span>
                </div>
              </button>

              {idx < steps.length - 1 && (
                <div className="h-px w-6 bg-zinc-850 shrink-0 hidden sm:block" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
