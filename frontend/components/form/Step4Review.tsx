import React from "react";
import { EventFormData } from "@/types/event";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Edit2 } from "lucide-react";

interface Step4ReviewProps {
  formData: EventFormData;
  goToStep: (step: number) => void;
  serverError: string | null;
}

export const Step4Review: React.FC<Step4ReviewProps> = ({
  formData,
  goToStep,
  serverError,
}) => {
  return (
    <div className="space-y-4">
      {serverError && (
        <div className="p-3 rounded-md border border-red-500/30 bg-red-500/10 text-red-300 flex items-start gap-2.5 text-xs">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
          <div>
            <span className="font-semibold block">Error saving event</span>
            <span>{serverError}</span>
          </div>
        </div>
      )}

      {/* Summary Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-850">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-zinc-100">
              {formData.name || "Untitled event"}
            </span>
            <Badge variant="planner" className="uppercase font-mono text-[10px]">
              {formData.category}
            </Badge>
          </div>
          <p className="text-xs text-zinc-500">
            {formData.eventType} • {formData.location}
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => goToStep(1)}
          className="h-7 text-xs"
        >
          <Edit2 className="h-3 w-3 mr-1" /> Edit role
        </Button>
      </div>

      {/* Section 1: Event Basics */}
      <div className="rounded-lg border border-zinc-850 bg-zinc-950/40 divide-y divide-zinc-850/60">
        <div className="p-3 px-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-300">
            Event basics
          </span>
          <button
            type="button"
            onClick={() => goToStep(1)}
            className="text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer"
          >
            Edit
          </button>
        </div>

        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-zinc-500 block mb-0.5">Title</span>
            <span className="text-zinc-200 font-medium">{formData.name}</span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-0.5">Type</span>
            <span className="text-zinc-200 font-medium">{formData.eventType}</span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-0.5">Start</span>
            <span className="text-zinc-200 font-mono text-[11px]">
              {formData.startDate ? new Date(formData.startDate).toLocaleString() : "—"}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-0.5">End</span>
            <span className="text-zinc-200 font-mono text-[11px]">
              {formData.endDate ? new Date(formData.endDate).toLocaleString() : "Same day"}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-0.5">Location</span>
            <span className="text-zinc-200 font-medium">{formData.location}</span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-0.5">Venue</span>
            <span className="text-zinc-200 font-medium">{formData.venue || "—"}</span>
          </div>
        </div>
      </div>

      {/* Section 2 & 3: Category details */}
      {formData.category === "PLANNER" && (
        <div className="rounded-lg border border-zinc-850 bg-zinc-950/40 divide-y divide-zinc-850/60">
          <div className="p-3 px-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-300">
              Planner logistics & milestones
            </span>
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer"
            >
              Edit
            </button>
          </div>

          <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-zinc-500 block mb-0.5">Budget</span>
              <span className="text-zinc-200 font-mono">
                ${Number(formData.planner.budget).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-0.5">Expected guests</span>
              <span className="text-zinc-200">{formData.planner.estimatedGuests}</span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-0.5">Theme</span>
              <span className="text-zinc-200">{formData.planner.eventTheme || "—"}</span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-0.5">Catering</span>
              <span className="text-zinc-200">{formData.planner.cateringType || "—"}</span>
            </div>
          </div>

          <div className="p-4 space-y-2 text-xs">
            <div>
              <span className="text-zinc-500 block mb-1">Services:</span>
              <div className="flex flex-wrap gap-1">
                {formData.planner.requiredServices.length > 0 ? (
                  formData.planner.requiredServices.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px]"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-zinc-600">None selected</span>
                )}
              </div>
            </div>

            {formData.planner.timelineMilestones && (
              <div>
                <span className="text-zinc-500 block mb-0.5">Run of show:</span>
                <p className="text-zinc-300 font-mono text-[11px] bg-zinc-900/60 p-2 rounded border border-zinc-850">
                  {formData.planner.timelineMilestones}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {formData.category === "PERFORMER" && (
        <div className="rounded-lg border border-zinc-850 bg-zinc-950/40 divide-y divide-zinc-850/60">
          <div className="p-3 px-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-300">
              Performer act & technical rider
            </span>
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer"
            >
              Edit
            </button>
          </div>

          <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-zinc-500 block mb-0.5">Act format</span>
              <span className="text-zinc-200">{formData.performer.performanceType}</span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-0.5">Genre</span>
              <span className="text-zinc-200">{formData.performer.genre || "—"}</span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-0.5">Duration</span>
              <span className="text-zinc-200">
                {formData.performer.performanceDurationMinutes} mins ({formData.performer.numberOfSets} sets)
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-0.5">Travel request</span>
              <span className="text-zinc-200">
                {formData.performer.travelAccommodationNeeded ? "Yes" : "No"}
              </span>
            </div>
          </div>

          <div className="p-4 space-y-2 text-xs">
            <div>
              <span className="text-zinc-500 block mb-1">Audio equipment:</span>
              <div className="flex flex-wrap gap-1">
                {formData.performer.audioEquipmentNeeds.length > 0 ? (
                  formData.performer.audioEquipmentNeeds.map((a) => (
                    <span
                      key={a}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px]"
                    >
                      {a}
                    </span>
                  ))
                ) : (
                  <span className="text-zinc-600">Standard venue audio</span>
                )}
              </div>
            </div>

            {formData.performer.greenRoomRequirements && (
              <div>
                <span className="text-zinc-500 block mb-0.5">Hospitality notes:</span>
                <p className="text-zinc-300 text-[11px] bg-zinc-900/60 p-2 rounded border border-zinc-850">
                  {formData.performer.greenRoomRequirements}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {formData.category === "CREW" && (
        <div className="rounded-lg border border-zinc-850 bg-zinc-950/40 divide-y divide-zinc-850/60">
          <div className="p-3 px-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-300">
              Crew staffing & gear specs
            </span>
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer"
            >
              Edit
            </button>
          </div>

          <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-zinc-500 block mb-0.5">Department</span>
              <span className="text-zinc-200">{formData.crew.department}</span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-0.5">Headcount</span>
              <span className="text-zinc-200">{formData.crew.crewCountRequired} staff</span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-0.5">Hours</span>
              <span className="text-zinc-200 font-mono text-[11px]">
                {formData.crew.callTime} – {formData.crew.wrapTime}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-0.5">Gear responsibility</span>
              <span className="text-zinc-200">
                {formData.crew.gearResponsibility.replace(/_/g, " ")}
              </span>
            </div>
          </div>

          <div className="p-4 space-y-2 text-xs">
            <div>
              <span className="text-zinc-500 block mb-1">Safety badges:</span>
              <div className="flex flex-wrap gap-1">
                {formData.crew.safetyCertificationsRequired.length > 0 ? (
                  formData.crew.safetyCertificationsRequired.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px]"
                    >
                      {c}
                    </span>
                  ))
                ) : (
                  <span className="text-zinc-600">None required</span>
                )}
              </div>
            </div>

            {formData.crew.loadInNotes && (
              <div>
                <span className="text-zinc-500 block mb-0.5">Dock instructions:</span>
                <p className="text-zinc-300 text-[11px] bg-zinc-900/60 p-2 rounded border border-zinc-850">
                  {formData.crew.loadInNotes}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
