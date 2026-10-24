import React from "react";
import { PerformerDetails } from "@/types/event";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";

interface Step3PerformerProps {
  data: PerformerDetails;
  updateData: (fields: Partial<PerformerDetails>) => void;
  errors: Record<string, string>;
}

export const Step3Performer: React.FC<Step3PerformerProps> = ({
  data,
  updateData,
}) => {
  const audioOptions = [
    "Wireless vocal mic (Shure Beta 58)",
    "In-Ear Monitors (IEM line)",
    "Drum mic package",
    "2x Stereo DI boxes",
    "Floor stage wedge monitors",
    "Pioneer CDJ / DJM setup",
  ];

  const toggleAudioNeed = (item: string) => {
    const current = data.audioEquipmentNeeds || [];
    if (current.includes(item)) {
      updateData({
        audioEquipmentNeeds: current.filter((i) => i !== item),
      });
    } else {
      updateData({
        audioEquipmentNeeds: [...current, item],
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="pb-2 border-b border-zinc-850">
        <h4 className="text-xs font-semibold text-zinc-100">
          Technical Rider & Hospitality
        </h4>
        <p className="text-[11px] text-zinc-500">
          Specify audio inputs, stage cues, and backstage arrangements.
        </p>
      </div>

      {/* Audio Gear */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Audio inputs & monitoring</Label>
          <span className="text-[11px] text-zinc-500 font-mono">
            {data.audioEquipmentNeeds.length} selected
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {audioOptions.map((item) => {
            const isSelected = data.audioEquipmentNeeds.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleAudioNeed(item)}
                className={`flex items-center justify-between p-2.5 rounded border text-left text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "border-zinc-500 bg-zinc-850 text-zinc-100"
                    : "border-zinc-850 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                <span>{item}</span>
                {isSelected && (
                  <Check className="h-3.5 w-3.5 text-zinc-300 shrink-0 ml-1.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lighting cues */}
      <div>
        <Label htmlFor="lightingNeeds">
          Lighting preferences <span className="text-zinc-500 font-normal">(optional)</span>
        </Label>
        <Textarea
          id="lightingNeeds"
          placeholder="e.g. Static amber mood lighting, blackout during speech"
          value={data.lightingNeeds}
          onChange={(e) => updateData({ lightingNeeds: e.target.value })}
        />
      </div>

      {/* Hospitality */}
      <div>
        <Label htmlFor="greenRoomRequirements">
          Hospitality & green room notes <span className="text-zinc-500 font-normal">(optional)</span>
        </Label>
        <Textarea
          id="greenRoomRequirements"
          placeholder="e.g. Quiet dressing room, water bottles, clean towels"
          value={data.greenRoomRequirements}
          onChange={(e) =>
            updateData({ greenRoomRequirements: e.target.value })
          }
        />
      </div>

      {/* Travel accommodation checkbox */}
      <div className="flex items-center justify-between p-3 rounded border border-zinc-850 bg-zinc-900/30">
        <div>
          <span className="text-xs font-medium text-zinc-200 block">
            Travel / Hotel lodging required
          </span>
          <span className="text-[11px] text-zinc-500">
            Check if flight or hotel booking is requested from organizer.
          </span>
        </div>

        <input
          type="checkbox"
          checked={data.travelAccommodationNeeded}
          onChange={(e) =>
            updateData({ travelAccommodationNeeded: e.target.checked })
          }
          className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-zinc-100 focus:ring-0 focus:ring-offset-0 cursor-pointer"
        />
      </div>
    </div>
  );
};
