import React from "react";
import { PlannerDetails } from "@/types/event";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";

interface Step3PlannerProps {
  data: PlannerDetails;
  updateData: (fields: Partial<PlannerDetails>) => void;
  errors: Record<string, string>;
}

export const Step3Planner: React.FC<Step3PlannerProps> = ({
  data,
  updateData,
}) => {
  const availableServices = [
    "Audio / Visual Equipment",
    "Stage Lighting & Rigging",
    "Photography & Video",
    "Security Personnel",
    "Decor & Furniture Hire",
    "Valet & Transport",
  ];

  const toggleService = (service: string) => {
    const current = data.requiredServices || [];
    if (current.includes(service)) {
      updateData({ requiredServices: current.filter((s) => s !== service) });
    } else {
      updateData({ requiredServices: [...current, service] });
    }
  };

  return (
    <div className="space-y-4">
      <div className="pb-2 border-b border-zinc-850">
        <h4 className="text-xs font-semibold text-zinc-100">
          Vendor Coordination & Schedule
        </h4>
        <p className="text-[11px] text-zinc-500">
          Specify vendor dependencies and preliminary run-of-show timeline.
        </p>
      </div>

      {/* Services */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Required vendor services</Label>
          <span className="text-[11px] text-zinc-500 font-mono">
            {data.requiredServices.length} selected
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {availableServices.map((service) => {
            const isSelected = data.requiredServices.includes(service);
            return (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`flex items-center justify-between p-2.5 rounded border text-left text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "border-zinc-500 bg-zinc-850 text-zinc-100"
                    : "border-zinc-850 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                <span>{service}</span>
                {isSelected && <Check className="h-3.5 w-3.5 text-zinc-300 shrink-0 ml-1.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <Label htmlFor="timelineMilestones">
          Run-of-show milestones <span className="text-zinc-500 font-normal">(optional)</span>
        </Label>
        <Textarea
          id="timelineMilestones"
          placeholder="e.g. 14:00 Vendor load-in, 17:00 Soundcheck, 18:30 Doors open"
          value={data.timelineMilestones}
          onChange={(e) => updateData({ timelineMilestones: e.target.value })}
        />
      </div>

      {/* Notes */}
      <div>
        <Label htmlFor="specialPermissionsNotes">
          Compliance & permit notes <span className="text-zinc-500 font-normal">(optional)</span>
        </Label>
        <Textarea
          id="specialPermissionsNotes"
          placeholder="e.g. Sound curfew at 23:00, outdoor tent fire inspection approved"
          value={data.specialPermissionsNotes}
          onChange={(e) =>
            updateData({ specialPermissionsNotes: e.target.value })
          }
        />
      </div>
    </div>
  );
};
