import type { Request, Response, NextFunction } from "express";
import { Router } from "express";

import { EventService } from "../services/eventService.js";
import { validatorHandler } from "../middlewares/validatorHandler.js";
import {
	getEventSchema,
	createEventSchema,
	updateEventSchema,
} from "../schemas/eventSchema.js";

export const eventsRouter = Router();
const service = new EventService();

/**
 * GET /events
 * Retorna tots els events (sense paginació) tal com espera el front.
 */
eventsRouter.get(
	"/",
	async (_req: Request, res: Response, next: NextFunction) => {
		try {
			const items = await service.find();

			return res.json(items);
		} catch (error) {
			return next(error);
		}
	},
);

/**
 * GET /events/:id
 */
eventsRouter.get(
	"/:id",
	validatorHandler(getEventSchema, "params"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const eventId = Number(req.params.id);
			if (!eventId) {
				return res.status(400).json({ message: "Missing id param" });
			}

			const item = await service.findById(eventId);
			return res.status(200).json(item);
		} catch (error) {
			return next(error);
		}
	},
);

/**
 * POST /events
 * Crea un event i el torna amb id.
 */
eventsRouter.post(
	"/",
	validatorHandler(createEventSchema, "body"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const payload = req.body;
			const created = await service.create(payload);

			return res.status(201).json(created);
		} catch (error) {
			return next(error);
		}
	},
);

/**
 * PATCH /events/:id
 * Actualitza parcialment un event existent.
 */
eventsRouter.patch(
	"/:id",
	validatorHandler(getEventSchema, "params"),
	validatorHandler(updateEventSchema, "body"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const eventId = Number(req.params.id);
			if (!eventId) {
				return res.status(400).json({ message: "Missing id param" });
			}

			const changes = req.body;
			const updated = await service.updatePatch(eventId, changes);
			return res.json(updated);
		} catch (error) {
			return next(error);
		}
	},
);

/**
 * DELETE /events/:id
 */
eventsRouter.delete(
	"/:id",
	validatorHandler(getEventSchema, "params"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const eventId = Number(req.params.id);
			if (!eventId) {
				return res.status(400).json({ message: "Missing id param" });
			}

			await service.deleteById(eventId);
			return res.status(204).send();
		} catch (error) {
			return next(error);
		}
	},
);
