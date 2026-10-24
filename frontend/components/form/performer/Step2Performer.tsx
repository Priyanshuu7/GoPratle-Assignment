import React from "react";
import { PerformerDetails } from "@/types/event";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Step2PerformerProps {
  data: PerformerDetails;
  updateData: (fields: Partial<PerformerDetails>) => void;
  errors: Record<string, string>;
}

export const Step2Performer: React.FC<Step2PerformerProps> = ({
  data,
  updateData,
  errors,
}) => {
  const commonPerformanceTypes = [
    "Live band",
    "Solo artist",
    "DJ set",
    "Keynote speaker",
    "Dance performance",
  ];

  return (
    <div className="space-y-4">
      <div className="pb-2 border-b border-zinc-850">
        <h4 className="text-xs font-semibold text-zinc-100">
          Performance Specs
        </h4>
        <p className="text-[11px] text-zinc-500">
          Enter your act type, set breakdown, and stage footprint.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Performance Type */}
        <div className="sm:col-span-2">
          <Label required htmlFor="performanceType">
            Act / Performance format
          </Label>
          <Input
            id="performanceType"
            placeholder="Select from below or enter custom..."
            value={data.performanceType}
            onChange={(e) => updateData({ performanceType: e.target.value })}
            error={!!errors.performanceType}
            className="mb-2"
          />
          <div className="flex flex-wrap gap-1.5">
            {commonPerformanceTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => updateData({ performanceType: type })}
                className={`text-[11px] px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                  data.performanceType === type
                    ? "border-zinc-600 bg-zinc-800 text-zinc-100 font-medium"
                    : "border-zinc-850 bg-zinc-900/40 text-zinc-500 hover:text-zinc-300 hover:border-zinc-750"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          {errors.performanceType && (
            <p className="mt-1 text-[11px] text-red-400">
              {errors.performanceType}
            </p>
          )}
        </div>

        {/* Genre */}
        <div>
          <Label htmlFor="genre">
            Genre / Specialty <span className="text-zinc-500 font-normal">(optional)</span>
          </Label>
          <Input
            id="genre"
            placeholder="e.g. Indie Electronic / Ambient"
            value={data.genre}
            onChange={(e) => updateData({ genre: e.target.value })}
          />
        </div>

        {/* Stage Footprint */}
        <div>
          <Label htmlFor="stageSize">
            Stage dimensions <span className="text-zinc-500 font-normal">(optional)</span>
          </Label>
          <Input
            id="stageSize"
            placeholder="e.g. 15ft x 12ft minimum"
            value={data.stageSizeRequirement}
            onChange={(e) =>
              updateData({ stageSizeRequirement: e.target.value })
            }
          />
        </div>

        {/* Duration */}
        <div>
          <Label required htmlFor="performanceDuration">
            Set duration (minutes)
          </Label>
          <Input
            id="performanceDuration"
            type="number"
            min="1"
            placeholder="e.g. 45"
            value={
              data.performanceDurationMinutes === ""
                ? ""
                : data.performanceDurationMinutes
            }
            onChange={(e) =>
              updateData({
                performanceDurationMinutes:
                  e.target.value === "" ? "" : Number(e.target.value),
              })
            }
            error={!!errors.performanceDurationMinutes}
          />
          {errors.performanceDurationMinutes && (
            <p className="mt-1 text-[11px] text-red-400">
              {errors.performanceDurationMinutes}
            </p>
          )}
        </div>

        {/* Number of Sets */}
        <div>
          <Label required htmlFor="numberOfSets">
            Number of sets
          </Label>
          <Input
            id="numberOfSets"
            type="number"
            min="1"
            placeholder="e.g. 2"
            value={data.numberOfSets === "" ? "" : data.numberOfSets}
            onChange={(e) =>
              updateData({
                numberOfSets:
                  e.target.value === "" ? "" : Number(e.target.value),
              })
            }
            error={!!errors.numberOfSets}
          />
          {errors.numberOfSets && (
            <p className="mt-1 text-[11px] text-red-400">
              {errors.numberOfSets}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
