export type CategoryType = "PLANNER" | "PERFORMER" | "CREW";

export interface PlannerDetails {
  budget: number | string;
  estimatedGuests: number | string;
  eventTheme: string;
  cateringType: string;
  requiredServices: string[];
  timelineMilestones: string;
  specialPermissionsNotes: string;
}

export interface PerformerDetails {
  performanceType: string;
  genre: string;
  performanceDurationMinutes: number | string;
  numberOfSets: number | string;
  stageSizeRequirement: string;
  audioEquipmentNeeds: string[];
  lightingNeeds: string;
  greenRoomRequirements: string;
  travelAccommodationNeeded: boolean;
}

export interface CrewDetails {
  department: string;
  crewCountRequired: number | string;
  callTime: string;
  wrapTime: string;
  gearResponsibility: "PROVIDED_BY_VENUE" | "CREW_PROVIDED" | "HYBRID";
  safetyCertificationsRequired: string[];
  loadInNotes: string;
}

export interface EventFormData {
  // Step 1 Basics
  name: string;
  eventType: string;
  startDate: string;
  endDate: string;
  location: string;
  venue: string;
  category: CategoryType;

  // Category details
  planner: PlannerDetails;
  performer: PerformerDetails;
  crew: CrewDetails;
}

export interface CreatedEvent {
  _id: string;
  name: string;
  eventType: string;
  startDate: string;
  endDate: string;
  location: string;
  venue?: string;
  category: CategoryType;
  details: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
