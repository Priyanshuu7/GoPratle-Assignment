import React from "react";
import { EventFormData, CategoryType } from "@/types/event";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, Mic2, Wrench } from "lucide-react";

interface Step1BasicsProps {
  formData: EventFormData;
  updateFormData: (fields: Partial<EventFormData>) => void;
  errors: Record<string, string>;
}

export const Step1Basics: React.FC<Step1BasicsProps> = ({
  formData,
  updateFormData,
  errors,
}) => {
  const categories: {
    id: CategoryType;
    title: string;
    description: string;
    icon: React.ElementType;
  }[] = [
      {
        id: "PLANNER",
        title: "Event Planner",
        description: "Budgeting, guest logistics, catering, and vendor milestones.",
        icon: Briefcase,
      },
      {
        id: "PERFORMER",
        title: "Performer / Artist",
        description: "Set duration, stage specs, technical rider, and hospitality.",
        icon: Mic2,
      },
      {
        id: "CREW",
        title: "Crew / Production",
        description: "Department staffing, call/wrap hours, and equipment safety.",
        icon: Wrench,
      },
    ];

  return (
    <div className="space-y-6">
      {/* Role / Category Selection */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <Label required className="text-xs font-medium text-zinc-200">
            Select role
          </Label>
          <span className="text-[11px] text-zinc-500 font-mono">
            Customizes steps 2 & 3
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {categories.map((cat) => {
            const isSelected = formData.category === cat.id;
            const Icon = cat.icon;

            return (
              <div
                key={cat.id}
                onClick={() => updateFormData({ category: cat.id })}
                className={`relative flex flex-col justify-between p-4 rounded-lg border cursor-pointer transition-all ${isSelected
                  ? "border-zinc-400 bg-zinc-900/90 text-zinc-100 ring-1 ring-zinc-400/50"
                  : "border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/30"
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${isSelected ? "text-zinc-100" : "text-zinc-500"}`} />
                      <span className="text-xs font-semibold text-zinc-100">
                        {cat.title}
                      </span>
                    </div>
                    <div
                      className={`h-3.5 w-3.5 rounded-full border flex items-center justify-center ${isSelected
                        ? "border-zinc-100 bg-zinc-100"
                        : "border-zinc-700 bg-transparent"
                        }`}
                    >
                      {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-zinc-950" />}
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-zinc-850 pt-5 space-y-4">
        {/* Event Name */}
        <div>
          <Label required htmlFor="eventName">
            Event title
          </Label>
          <Input
            id="eventName"
            placeholder="e.g. Annual Architecture Summit"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            error={!!errors.name}
          />
          {errors.name && (
            <p className="mt-1 text-[11px] text-red-400">{errors.name}</p>
          )}
        </div>

        {/* Event Type */}
        <div>
          <Label required htmlFor="eventType">
            Event type
          </Label>
          <Input
            id="eventType"
            placeholder="Select from below or enter custom..."
            value={formData.eventType}
            onChange={(e) => updateFormData({ eventType: e.target.value })}
            error={!!errors.eventType}
            className="mb-2"
          />
          {errors.eventType && (
            <p className="mt-1 text-[11px] text-red-400">{errors.eventType}</p>
          )}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label required htmlFor="startDate">
              Start date & time
            </Label>
            <Input
              id="startDate"
              type="datetime-local"
              value={formData.startDate}
              onChange={(e) => updateFormData({ startDate: e.target.value })}
              error={!!errors.startDate}
            />
            {errors.startDate && (
              <p className="mt-1 text-[11px] text-red-400">{errors.startDate}</p>
            )}
          </div>

          <div>
            <Label htmlFor="endDate">
              End date & time <span className="text-zinc-500 font-normal">(optional if single-day)</span>
            </Label>
            <Input
              id="endDate"
              type="datetime-local"
              value={formData.endDate}
              onChange={(e) => updateFormData({ endDate: e.target.value })}
              error={!!errors.endDate}
            />
            {errors.endDate && (
              <p className="mt-1 text-[11px] text-red-400">{errors.endDate}</p>
            )}
          </div>
        </div>

        {/* Location & Venue */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label required htmlFor="location">
              City / Location
            </Label>
            <Input
              id="location"
              placeholder="e.g. San Francisco, CA"
              value={formData.location}
              onChange={(e) => updateFormData({ location: e.target.value })}
              error={!!errors.location}
            />
            {errors.location && (
              <p className="mt-1 text-[11px] text-red-400">{errors.location}</p>
            )}
          </div>

          <div>
            <Label htmlFor="venue">
              Venue name <span className="text-zinc-500 font-normal">(optional)</span>
            </Label>
            <Input
              id="venue"
              placeholder="e.g. Center Hall or Main Stage"
              value={formData.venue}
              onChange={(e) => updateFormData({ venue: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
