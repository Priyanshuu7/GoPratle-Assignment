import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Event } from "../models/Event.js";
import { CreateEventInput } from "../validations/event.schema.js";

// Helper function to escape special characters for safe RegExp generation (prevents regex injection)
const escapeRegex = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// @route   POST /api/events
export const createEvent = async (
  req: Request<{}, {}, CreateEventInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const eventData = req.body;

    const startDate = new Date(eventData.startDate);
    const endDate = new Date(eventData.endDate || eventData.startDate);

    // Prevent duplicate events (same name on same calendar date at same location)
    const startOfDay = new Date(startDate);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(startDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const existingEvent = await Event.findOne({
      name: { $regex: new RegExp(`^${escapeRegex(eventData.name.trim())}$`, "i") },
      startDate: { $gte: startOfDay, $lte: endOfDay },
      location: { $regex: new RegExp(`^${escapeRegex(eventData.location.trim())}$`, "i") },
    });

    if (existingEvent) {
      res.status(409).json({
        success: false,
        message: "An event with the same name, date, and location already exists.",
      });
      return;
    }

    const event = await Event.create({
      name: eventData.name,
      eventType: eventData.eventType,
      startDate,
      endDate,
      location: eventData.location,
      venue: eventData.venue || "",
      category: eventData.category,
      details: eventData.details,
    });

    res.status(201).json({
      success: true,
      message: `Event successfully created under category: ${event.category}`,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/events
export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, search, eventType } = req.query;

    const filter: Record<string, any> = {};

    // 1. Safe category matching (ensures uppercase enum alignment)
    if (category && typeof category === "string") {
      const normalizedCategory = category.trim().toUpperCase();
      if (["PLANNER", "PERFORMER", "CREW"].includes(normalizedCategory)) {
        filter.category = normalizedCategory;
      }
    }

    // 2. Safe RegExp for eventType with regex escaping
    if (eventType && typeof eventType === "string" && eventType.trim()) {
      filter.eventType = new RegExp(escapeRegex(eventType.trim()), "i");
    }

    // 3. Safe RegExp for search across event name & location
    if (search && typeof search === "string" && search.trim()) {
      const safeSearch = escapeRegex(search.trim());
      filter.$or = [
        { name: { $regex: safeSearch, $options: "i" } },
        { location: { $regex: safeSearch, $options: "i" } },
      ];
    }

    // 4. Pagination support (page & limit)
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string, 10) || 20));
    const skip = (page - 1) * limit;

    const total = await Event.countDocuments(filter);
    const events = await Event.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: events.length,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get event by ID

export const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
      return;
    }

    const event = await Event.findById(id);

    if (!event) {
      res.status(404).json({
        success: false,
        message: "Event not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};
