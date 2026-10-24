"use client";

import React, { useState, useEffect } from "react";
import {
  EventFormData,
  CategoryType,
  CreatedEvent,
} from "@/types/event";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StepIndicator } from "@/components/form/StepIndicator";
import { Step1Basics } from "@/components/form/Step1Basics";
import { Step2Planner } from "@/components/form/planner/Step2Planner";
import { Step3Planner } from "@/components/form/planner/Step3Planner";
import { Step2Performer } from "@/components/form/performer/Step2Performer";
import { Step3Performer } from "@/components/form/performer/Step3Performer";
import { Step2Crew } from "@/components/form/crew/Step2Crew";
import { Step3Crew } from "@/components/form/crew/Step3Crew";
import { Step4Review } from "@/components/form/Step4Review";
import { EventsExplorer } from "@/components/events/EventsExplorer";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Plus,
  Layers,
} from "lucide-react";

const initialFormData: EventFormData = {
  name: "",
  eventType: "Conference",
  startDate: "",
  endDate: "",
  location: "",
  venue: "",
  category: "PLANNER",

  planner: {
    budget: "",
    estimatedGuests: "",
    eventTheme: "",
    cateringType: "Buffet stations",
    requiredServices: ["Audio / Visual Equipment", "Photography & Video"],
    timelineMilestones: "",
    specialPermissionsNotes: "",
  },

  performer: {
    performanceType: "Live band",
    genre: "",
    performanceDurationMinutes: 60,
    numberOfSets: 1,
    stageSizeRequirement: "",
    audioEquipmentNeeds: ["Wireless vocal mic (Shure Beta 58)", "Floor stage wedge monitors"],
    lightingNeeds: "",
    greenRoomRequirements: "",
    travelAccommodationNeeded: false,
  },

  crew: {
    department: "Lighting & DMX Control",
    crewCountRequired: 4,
    callTime: "08:00",
    wrapTime: "22:00",
    gearResponsibility: "HYBRID",
    safetyCertificationsRequired: ["Working at Heights / Fall Protection"],
    loadInNotes: "",
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<"wizard" | "explorer">("wizard");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEvent, setSubmittedEvent] = useState<CreatedEvent | null>(null);
  const [backendStatus, setBackendStatus] = useState<"checking" | "online" | "offline">("checking");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${baseUrl}/health`);
        if (res.ok) setBackendStatus("online");
        else setBackendStatus("offline");
      } catch {
        setBackendStatus("offline");
      }
    };
    checkBackend();
  }, []);

  const updateFormData = (fields: Partial<EventFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    setStepErrors({});
    setServerError(null);
  };

  const updatePlannerData = (fields: Partial<EventFormData["planner"]>) => {
    setFormData((prev) => ({
      ...prev,
      planner: { ...prev.planner, ...fields },
    }));
    setStepErrors({});
    setServerError(null);
  };

  const updatePerformerData = (fields: Partial<EventFormData["performer"]>) => {
    setFormData((prev) => ({
      ...prev,
      performer: { ...prev.performer, ...fields },
    }));
    setStepErrors({});
    setServerError(null);
  };

  const updateCrewData = (fields: Partial<EventFormData["crew"]>) => {
    setFormData((prev) => ({
      ...prev,
      crew: { ...prev.crew, ...fields },
    }));
    setStepErrors({});
    setServerError(null);
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim() || formData.name.trim().length < 2) {
        errors.name = "Title must be at least 2 characters";
      }
      if (!formData.eventType.trim()) {
        errors.eventType = "Event type is required";
      }
      if (!formData.startDate) {
        errors.startDate = "Start date & time is required";
      }
      if (!formData.location.trim()) {
        errors.location = "City / location is required";
      }
    } else if (step === 2) {
      if (formData.category === "PLANNER") {
        if (formData.planner.budget === "" || Number(formData.planner.budget) < 0) {
          errors.budget = "Valid budget (0 or higher) is required";
        }
        if (formData.planner.estimatedGuests === "" || Number(formData.planner.estimatedGuests) < 1) {
          errors.estimatedGuests = "Guest count must be at least 1";
        }
      } else if (formData.category === "PERFORMER") {
        if (!formData.performer.performanceType.trim()) {
          errors.performanceType = "Performance type is required";
        }
        if (formData.performer.performanceDurationMinutes === "" || Number(formData.performer.performanceDurationMinutes) < 1) {
          errors.performanceDurationMinutes = "Duration must be at least 1 minute";
        }
        if (formData.performer.numberOfSets === "" || Number(formData.performer.numberOfSets) < 1) {
          errors.numberOfSets = "Must have at least 1 set";
        }
      } else if (formData.category === "CREW") {
        if (!formData.crew.department.trim()) {
          errors.department = "Department is required";
        }
        if (formData.crew.crewCountRequired === "" || Number(formData.crew.crewCountRequired) < 1) {
          errors.crewCountRequired = "Crew count must be at least 1";
        }
        if (!formData.crew.callTime) {
          errors.callTime = "Call time is required";
        }
        if (!formData.crew.wrapTime) {
          errors.wrapTime = "Wrap time is required";
        }
      }
    } else if (step === 3) {
      if (formData.category === "CREW" && !formData.crew.gearResponsibility) {
        errors.gearResponsibility = "Gear responsibility is required";
      }
    }

    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setServerError(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      let details: Record<string, any> = {};
      if (formData.category === "PLANNER") {
        details = {
          budget: Number(formData.planner.budget),
          estimatedGuests: Number(formData.planner.estimatedGuests),
          eventTheme: formData.planner.eventTheme,
          cateringType: formData.planner.cateringType,
          requiredServices: formData.planner.requiredServices,
          timelineMilestones: formData.planner.timelineMilestones,
          specialPermissionsNotes: formData.planner.specialPermissionsNotes,
        };
      } else if (formData.category === "PERFORMER") {
        details = {
          performanceType: formData.performer.performanceType,
          genre: formData.performer.genre,
          performanceDurationMinutes: Number(formData.performer.performanceDurationMinutes),
          numberOfSets: Number(formData.performer.numberOfSets),
          stageSizeRequirement: formData.performer.stageSizeRequirement,
          audioEquipmentNeeds: formData.performer.audioEquipmentNeeds,
          lightingNeeds: formData.performer.lightingNeeds,
          greenRoomRequirements: formData.performer.greenRoomRequirements,
          travelAccommodationNeeded: formData.performer.travelAccommodationNeeded,
        };
      } else if (formData.category === "CREW") {
        details = {
          department: formData.crew.department,
          crewCountRequired: Number(formData.crew.crewCountRequired),
          callTime: formData.crew.callTime,
          wrapTime: formData.crew.wrapTime,
          gearResponsibility: formData.crew.gearResponsibility,
          safetyCertificationsRequired: formData.crew.safetyCertificationsRequired,
          loadInNotes: formData.crew.loadInNotes,
        };
      }

      const payload = {
        name: formData.name.trim(),
        eventType: formData.eventType.trim(),
        startDate: formData.startDate,
        endDate: formData.endDate || formData.startDate,
        location: formData.location.trim(),
        venue: formData.venue.trim(),
        category: formData.category,
        details,
      };

      const response = await fetch(`${baseUrl}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors && Array.isArray(result.errors)) {
          const fieldMsg = result.errors
            .map((e: any) => `${e.field}: ${e.message}`)
            .join(", ");
          throw new Error(fieldMsg || result.message || "Validation failed");
        }
        throw new Error(result.message || "Failed to save event");
      }

      setSubmittedEvent(result.data);
    } catch (err: any) {
      setServerError(err.message || "Something went wrong saving the event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setSubmittedEvent(null);
    setServerError(null);
    setStepErrors({});
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-zinc-100 flex items-center justify-center text-zinc-950 font-black text-xs">
              G
            </div>
            <span className="text-xs font-semibold tracking-tight text-zinc-200">
              GoPratle <span className="text-zinc-500 font-normal">/ Events</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Tab switch */}
            <div className="inline-flex bg-zinc-900 p-0.5 rounded-md border border-zinc-800 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("wizard")}
                className={`px-3 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  activeTab === "wizard"
                    ? "bg-zinc-800 text-zinc-100 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                New event
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("explorer")}
                className={`px-3 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  activeTab === "explorer"
                    ? "bg-zinc-800 text-zinc-100 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                All events
              </button>
            </div>

            {/* Health status */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-zinc-800 text-[11px] text-zinc-500 font-mono">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  backendStatus === "online"
                    ? "bg-emerald-500"
                    : backendStatus === "checking"
                    ? "bg-amber-500"
                    : "bg-red-500"
                }`}
              />
              <span className="hidden sm:inline">
                {backendStatus === "online" ? "API connected" : "API offline"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 sm:py-10">
        {activeTab === "wizard" ? (
          <div>
            {submittedEvent ? (
              <Card className="p-8 text-center border-zinc-800 bg-[#0c0c0e]">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-200 mb-4">
                  <CheckCircle className="h-5 w-5" />
                </div>

                <h3 className="text-base font-semibold text-zinc-100">
                  Event created successfully
                </h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                  Record stored under category{" "}
                  <span className="font-mono text-zinc-200">{submittedEvent.category}</span>.
                </p>

                <div className="my-5 p-3 rounded border border-zinc-850 bg-zinc-950 max-w-sm mx-auto text-left font-mono text-[11px] space-y-1 text-zinc-400">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">ID:</span>
                    <span className="text-zinc-300">{submittedEvent._id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Title:</span>
                    <span className="text-zinc-300 truncate max-w-[200px]">{submittedEvent.name}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Button onClick={resetForm} variant="default" size="sm">
                    <Plus className="h-3.5 w-3.5 mr-1" /> Create another
                  </Button>
                  <Button
                    onClick={() => setActiveTab("explorer")}
                    variant="outline"
                    size="sm"
                  >
                    View in table
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="border-zinc-800 bg-[#0c0c0e]">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-semibold">
                        Create event
                      </CardTitle>
                      <CardDescription className="text-xs text-zinc-500 mt-0.5">
                        Step-by-step role registration form.
                      </CardDescription>
                    </div>

                    <Badge variant="planner" className="uppercase font-mono text-[10px]">
                      {formData.category}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  <StepIndicator
                    currentStep={currentStep}
                    category={formData.category}
                    onStepClick={(step) => {
                      if (validateStep(currentStep)) setCurrentStep(step);
                    }}
                  />

                  {currentStep === 1 && (
                    <Step1Basics
                      formData={formData}
                      updateFormData={updateFormData}
                      errors={stepErrors}
                    />
                  )}

                  {currentStep === 2 && (
                    <>
                      {formData.category === "PLANNER" && (
                        <Step2Planner
                          data={formData.planner}
                          updateData={updatePlannerData}
                          errors={stepErrors}
                        />
                      )}
                      {formData.category === "PERFORMER" && (
                        <Step2Performer
                          data={formData.performer}
                          updateData={updatePerformerData}
                          errors={stepErrors}
                        />
                      )}
                      {formData.category === "CREW" && (
                        <Step2Crew
                          data={formData.crew}
                          updateData={updateCrewData}
                          errors={stepErrors}
                        />
                      )}
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                      {formData.category === "PLANNER" && (
                        <Step3Planner
                          data={formData.planner}
                          updateData={updatePlannerData}
                          errors={stepErrors}
                        />
                      )}
                      {formData.category === "PERFORMER" && (
                        <Step3Performer
                          data={formData.performer}
                          updateData={updatePerformerData}
                          errors={stepErrors}
                        />
                      )}
                      {formData.category === "CREW" && (
                        <Step3Crew
                          data={formData.crew}
                          updateData={updateCrewData}
                          errors={stepErrors}
                        />
                      )}
                    </>
                  )}

                  {currentStep === 4 && (
                    <Step4Review
                      formData={formData}
                      goToStep={(s) => setCurrentStep(s)}
                      serverError={serverError}
                    />
                  )}
                </CardContent>

                <CardFooter>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleBack}
                    disabled={currentStep === 1 || isSubmitting}
                  >
                    <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back
                  </Button>

                  <span className="text-[11px] font-mono text-zinc-500">
                    {currentStep} of 4
                  </span>

                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleNext}
                    >
                      Next <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Confirm & Save"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-semibold text-zinc-100">
                All events
              </h3>
              <p className="text-xs text-zinc-500">
                Database records fetched from the REST API.
              </p>
            </div>

            <EventsExplorer />
          </div>
        )}
      </main>
    </div>
  );
}
