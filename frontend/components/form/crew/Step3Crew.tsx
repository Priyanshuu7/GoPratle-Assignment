import React from "react";
import { CrewDetails } from "@/types/event";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";

interface Step3CrewProps {
  data: CrewDetails;
  updateData: (fields: Partial<CrewDetails>) => void;
  errors: Record<string, string>;
}

export const Step3Crew: React.FC<Step3CrewProps> = ({
  data,
  updateData,
  errors,
}) => {
  const gearOptions: {
    id: "PROVIDED_BY_VENUE" | "CREW_PROVIDED" | "HYBRID";
    title: string;
    description: string;
  }[] = [
    {
      id: "PROVIDED_BY_VENUE",
      title: "Venue supplies all gear",
      description: "Sound, lights, cables, and tools provided on-site.",
    },
    {
      id: "CREW_PROVIDED",
      title: "Crew brings own tools",
      description: "Crew brings personal toolkits, meters, and safety gear.",
    },
    {
      id: "HYBRID",
      title: "Hybrid allocation",
      description: "Heavy production on-site, specialized gear brought by crew.",
    },
  ];

  const certificationOptions = [
    "OSHA 10 / 30",
    "Working at Heights / Fall Protection",
    "Boom & Scissor Lift",
    "Forklift Operator",
    "First Aid / CPR",
    "ETCP Rigging Certification",
  ];

  const toggleCertification = (cert: string) => {
    const current = data.safetyCertificationsRequired || [];
    if (current.includes(cert)) {
      updateData({
        safetyCertificationsRequired: current.filter((c) => c !== cert),
      });
    } else {
      updateData({
        safetyCertificationsRequired: [...current, cert],
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="pb-2 border-b border-zinc-850">
        <h4 className="text-xs font-semibold text-zinc-100">
          Equipment & Compliance
        </h4>
        <p className="text-[11px] text-zinc-500">
          Define equipment responsibility and required safety badges.
        </p>
      </div>

      {/* Gear Responsibility */}
      <div>
        <Label required>Gear responsibility</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {gearOptions.map((opt) => {
            const isSelected = data.gearResponsibility === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => updateData({ gearResponsibility: opt.id })}
                className={`p-3 rounded border cursor-pointer transition-colors ${
                  isSelected
                    ? "border-zinc-500 bg-zinc-850 text-zinc-100"
                    : "border-zinc-850 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-zinc-200">
                    {opt.title}
                  </span>
                  {isSelected && <Check className="h-3.5 w-3.5 text-zinc-300" />}
                </div>
                <p className="text-[11px] text-zinc-500 leading-snug">
                  {opt.description}
                </p>
              </div>
            );
          })}
        </div>
        {errors.gearResponsibility && (
          <p className="mt-1 text-[11px] text-red-400">
            {errors.gearResponsibility}
          </p>
        )}
      </div>

      {/* Safety Certifications */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Safety certifications</Label>
          <span className="text-[11px] text-zinc-500 font-mono">
            {data.safetyCertificationsRequired.length} selected
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {certificationOptions.map((cert) => {
            const isSelected = data.safetyCertificationsRequired.includes(cert);
            return (
              <button
                key={cert}
                type="button"
                onClick={() => toggleCertification(cert)}
                className={`flex items-center justify-between p-2.5 rounded border text-left text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "border-zinc-500 bg-zinc-850 text-zinc-100"
                    : "border-zinc-850 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                <span>{cert}</span>
                {isSelected && (
                  <Check className="h-3.5 w-3.5 text-zinc-300 shrink-0 ml-1.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Load-In Notes */}
      <div>
        <Label htmlFor="loadInNotes">
          Dock logistics & access notes <span className="text-zinc-500 font-normal">(optional)</span>
        </Label>
        <Textarea
          id="loadInNotes"
          placeholder="e.g. Loading dock #2 clearance, steel toe footwear mandatory"
          value={data.loadInNotes}
          onChange={(e) => updateData({ loadInNotes: e.target.value })}
        />
      </div>
    </div>
  );
};
