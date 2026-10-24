import React from "react";
import { PlannerDetails } from "@/types/event";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Step2PlannerProps {
  data: PlannerDetails;
  updateData: (fields: Partial<PlannerDetails>) => void;
  errors: Record<string, string>;
}

export const Step2Planner: React.FC<Step2PlannerProps> = ({
  data,
  updateData,
  errors,
}) => {
  const cateringOptions = [
    "Plated dinner",
    "Buffet stations",
    "Cocktail reception",
    "Casual food trucks",
    "None required",
  ];

  return (
    <div className="space-y-4">
      <div className="pb-2 border-b border-zinc-850">
        <h4 className="text-xs font-semibold text-zinc-100">
          Scope & Logistics
        </h4>
        <p className="text-[11px] text-zinc-500">
          Enter projected financial limits and expected guest volume.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Estimated Budget */}
        <div>
          <Label required htmlFor="budget">
            Estimated budget (USD)
          </Label>
          <Input
            id="budget"
            type="number"
            min="0"
            step="500"
            placeholder="e.g. 25000"
            value={data.budget === "" ? "" : data.budget}
            onChange={(e) =>
              updateData({
                budget: e.target.value === "" ? "" : Number(e.target.value),
              })
            }
            error={!!errors.budget}
          />
          {errors.budget && (
            <p className="mt-1 text-[11px] text-red-400">{errors.budget}</p>
          )}
        </div>

        {/* Guest Count */}
        <div>
          <Label required htmlFor="estimatedGuests">
            Expected guest count
          </Label>
          <Input
            id="estimatedGuests"
            type="number"
            min="1"
            placeholder="e.g. 150"
            value={data.estimatedGuests === "" ? "" : data.estimatedGuests}
            onChange={(e) =>
              updateData({
                estimatedGuests:
                  e.target.value === "" ? "" : Number(e.target.value),
              })
            }
            error={!!errors.estimatedGuests}
          />
          {errors.estimatedGuests && (
            <p className="mt-1 text-[11px] text-red-400">
              {errors.estimatedGuests}
            </p>
          )}
        </div>

        {/* Theme */}
        <div className="sm:col-span-2">
          <Label htmlFor="eventTheme">
            Design theme <span className="text-zinc-500 font-normal">(optional)</span>
          </Label>
          <Input
            id="eventTheme"
            placeholder="e.g. Minimalist Monochrome or Scandinavian Modern"
            value={data.eventTheme}
            onChange={(e) => updateData({ eventTheme: e.target.value })}
          />
        </div>

        {/* Catering */}
        <div className="sm:col-span-2">
          <Label htmlFor="cateringType">
            Catering format <span className="text-zinc-500 font-normal">(optional)</span>
          </Label>
          <Input
            id="cateringType"
            placeholder="Select from options below or enter custom..."
            value={data.cateringType}
            onChange={(e) => updateData({ cateringType: e.target.value })}
            className="mb-2"
          />
          <div className="flex flex-wrap gap-1.5">
            {cateringOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => updateData({ cateringType: opt })}
                className={`text-[11px] px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                  data.cateringType === opt
                    ? "border-zinc-600 bg-zinc-800 text-zinc-100 font-medium"
                    : "border-zinc-850 bg-zinc-900/40 text-zinc-500 hover:text-zinc-300 hover:border-zinc-750"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
