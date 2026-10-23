import { z } from "zod";

export const EventCategoryEnum = z.enum(["PLANNER", "PERFORMER", "CREW"]);
export type EventCategory = z.infer<typeof EventCategoryEnum>;

// Base Event Basics 
export const eventBasicsSchema = z.object({
    name: z.string().trim().min(2, "Event name must be at least 2 characters"),
    eventType: z.string().trim().min(2, "Event type is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().trim().optional().default(""),
    location: z.string().trim().min(2, "Location is required"),
    venue: z.string().trim().optional().default(""),
});

// Planner Details 
export const plannerDetailsSchema = z.object({
    // Logistics & Scope
    budget: z.number().nonnegative("Budget must be 0 or greater"),
    estimatedGuests: z.number().int().positive("Estimated guests must be at least 1"),
    eventTheme: z.string().trim().optional().default(""),
    cateringType: z.string().trim().optional().default(""),

    //Vendor Management & Timeline
    requiredServices: z.array(z.string().trim()).default([]),
    timelineMilestones: z.string().trim().optional().default(""),
    specialPermissionsNotes: z.string().trim().optional().default(""),
});

// Performer Details 
export const performerDetailsSchema = z.object({
    //  Performance Details & Act Specs
    performanceType: z.string().trim().min(1, "Performance type is required"),
    genre: z.string().trim().optional().default(""),
    performanceDurationMinutes: z.number().int().positive("Duration must be at least 1 minute"),
    numberOfSets: z.number().int().positive("Must have at least 1 set"),
    stageSizeRequirement: z.string().trim().optional().default(""),

    // Tech Rider & Hospitality
    audioEquipmentNeeds: z.array(z.string().trim()).default([]),
    lightingNeeds: z.string().trim().optional().default(""),
    greenRoomRequirements: z.string().trim().optional().default(""),
    travelAccommodationNeeded: z.boolean().default(false),
});

// Crew Details 
export const crewDetailsSchema = z.object({
    //  Roles, Department & Shifts
    department: z.string().trim().min(1, "Department is required"),
    crewCountRequired: z.number().int().positive("Crew count must be at least 1"),
    callTime: z.string().trim().min(1, "Call time is required"),
    wrapTime: z.string().trim().min(1, "Wrap time is required"),

    // Gear, Logistics & Safety
    gearResponsibility: z.enum(["PROVIDED_BY_VENUE", "CREW_PROVIDED", "HYBRID"], {
        error: "Gear responsibility is required",
    }),
    safetyCertificationsRequired: z.array(z.string().trim()).default([]),
    loadInNotes: z.string().trim().optional().default(""),
});

// Discriminated union for full submission
export const createEventSchema = z.discriminatedUnion("category", [
    eventBasicsSchema.extend({
        category: z.literal("PLANNER"),
        details: plannerDetailsSchema,
    }),
    eventBasicsSchema.extend({
        category: z.literal("PERFORMER"),
        details: performerDetailsSchema,
    }),
    eventBasicsSchema.extend({
        category: z.literal("CREW"),
        details: crewDetailsSchema,
    }),
]);

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type PlannerDetailsInput = z.infer<typeof plannerDetailsSchema>;
export type PerformerDetailsInput = z.infer<typeof performerDetailsSchema>;
export type CrewDetailsInput = z.infer<typeof crewDetailsSchema>;
