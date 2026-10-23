import { Router } from "express";
import {
  createEvent,
  getEvents,
  getEventById,
} from "../controllers/event.controller.js";
import { validate } from "../middlewares/validate.js";
import { createEventSchema } from "../validations/event.schema.js";

const router = Router();

// Routes
router.post("/", validate(createEventSchema), createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);

export default router;
