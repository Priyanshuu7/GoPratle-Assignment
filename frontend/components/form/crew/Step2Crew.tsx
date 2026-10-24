import React from "react";
import { CrewDetails } from "@/types/event";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Step2CrewProps {
  data: CrewDetails;
  updateData: (fields: Partial<CrewDetails>) => void;
  errors: Record<string, string>;
}

export const Step2Crew: React.FC<Step2CrewProps> = ({
  data,
  updateData,
  errors,
}) => {
  const commonDepartments = [
    "Audio / FOH Sound",
    "Lighting & DMX Control",
    "Rigging & Stage Structure",
    "General Stagehands",
    "Video & LED Displays",
    "Security & Crowd Logistics",
  ];

  return (
    <div className="space-y-4">
      <div className="pb-2 border-b border-zinc-850">
        <h4 className="text-xs font-semibold text-zinc-100">
          Staffing & Shifts
        </h4>
        <p className="text-[11px] text-zinc-500">
          Select primary department, crew head count, and call/wrap shift hours.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Department */}
        <div className="sm:col-span-2">
          <Label required htmlFor="department">
            Department / Specialization
          </Label>
          <Input
            id="department"
            placeholder="Select from below or enter custom..."
            value={data.department}
            onChange={(e) => updateData({ department: e.target.value })}
            error={!!errors.department}
            className="mb-2"
          />
          <div className="flex flex-wrap gap-1.5">
            {commonDepartments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => updateData({ department: dept })}
                className={`text-[11px] px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                  data.department === dept
                    ? "border-zinc-600 bg-zinc-800 text-zinc-100 font-medium"
                    : "border-zinc-850 bg-zinc-900/40 text-zinc-500 hover:text-zinc-300 hover:border-zinc-750"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
          {errors.department && (
            <p className="mt-1 text-[11px] text-red-400">
              {errors.department}
            </p>
          )}
        </div>

        {/* Headcount */}
        <div className="sm:col-span-2">
          <Label required htmlFor="crewCountRequired">
            Headcount required
          </Label>
          <Input
            id="crewCountRequired"
            type="number"
            min="1"
            placeholder="e.g. 6"
            value={
              data.crewCountRequired === "" ? "" : data.crewCountRequired
            }
            onChange={(e) =>
              updateData({
                crewCountRequired:
                  e.target.value === "" ? "" : Number(e.target.value),
              })
            }
            error={!!errors.crewCountRequired}
          />
          {errors.crewCountRequired && (
            <p className="mt-1 text-[11px] text-red-400">
              {errors.crewCountRequired}
            </p>
          )}
        </div>

        {/* Call Time */}
        <div>
          <Label required htmlFor="callTime">
            Call time (start)
          </Label>
          <Input
            id="callTime"
            type="time"
            value={data.callTime}
            onChange={(e) => updateData({ callTime: e.target.value })}
            error={!!errors.callTime}
          />
          {errors.callTime && (
            <p className="mt-1 text-[11px] text-red-400">{errors.callTime}</p>
          )}
        </div>

        {/* Wrap Time */}
        <div>
          <Label required htmlFor="wrapTime">
            Wrap time (end)
          </Label>
          <Input
            id="wrapTime"
            type="time"
            value={data.wrapTime}
            onChange={(e) => updateData({ wrapTime: e.target.value })}
            error={!!errors.wrapTime}
          />
          {errors.wrapTime && (
            <p className="mt-1 text-[11px] text-red-400">{errors.wrapTime}</p>
          )}
        </div>
      </div>
    </div>
  );
};
