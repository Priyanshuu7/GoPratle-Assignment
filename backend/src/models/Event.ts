import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  name: string;
  eventType: string;
  startDate: Date;
  endDate: Date;
  location: string;
  venue?: string;
  category: "PLANNER" | "PERFORMER" | "CREW";
  details: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    eventType: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    venue: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      enum: ["PLANNER", "PERFORMER", "CREW"],
      required: true,
      index: true,
    },
    details: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for common queries
EventSchema.index({ name: 1, startDate: 1, location: 1 });
EventSchema.index({ category: 1, createdAt: -1 });
EventSchema.index({ name: "text", location: "text" });

export const Event: Model<IEvent> = mongoose.model<IEvent>("Event", EventSchema);
