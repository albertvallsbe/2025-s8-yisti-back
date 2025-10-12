import type { Request, Response, NextFunction } from "express";
import { Router } from "express";
import passport from "passport";

import { LocationService } from "../services/locationService.js";
import { validatorHandler } from "../middlewares/validatorHandler.js";
import {
	getLocationSchema,
	createLocationSchema,
	updateLocationSchema,
} from "../schemas/locationSchema.js";
import type { AuthUser } from "../types/userTypes.js";

export const locationsRouter = Router();
const service = new LocationService();

/**
 * 🔐 Totes les rutes de /locations requereixen JWT
 * (seguint el patró que heu indicat: “si totes les pàgines has d’estar logejat”)
 */
locationsRouter.use(passport.authenticate("jwt", { session: false }));

/**
 * GET /locations
 * Retorna totes les localitzacions (sense filtratge per usuari de moment).
 */
locationsRouter.get(
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
 * GET /locations/:id
 */
locationsRouter.get(
	"/:id",
	validatorHandler(getLocationSchema, "params"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);
			if (!id) {
				return res.status(400).json({ message: "Missing id param" });
			}
			const item = await service.findById(id);
			return res.status(200).json(item);
		} catch (error) {
			return next(error);
		}
	},
);

/**
 * POST /locations
 * Crea una localització. Si l’usuari està logejat, fem servir el seu `id` del token.
 * (De moment no filtrem per usuari al GET; això es pot afegir més endavant.)
 */
locationsRouter.post(
	"/",
	validatorHandler(createLocationSchema, "body"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const tokenUser = req.user as AuthUser | undefined;

			// Prioritza l'id del token si hi és; sinó, conserva el que vingui al body (compatibilitat)
			const userId = tokenUser?.id ?? req.body.userId;

			const payload = {
				name: req.body.name,
				center: req.body.center as [number, number],
				userId,
			};

			const created = await service.create(payload);
			return res.status(201).json(created);
		} catch (error) {
			return next(error);
		}
	},
);

/**
 * PATCH /locations/:id
 */
locationsRouter.patch(
	"/:id",
	validatorHandler(getLocationSchema, "params"),
	validatorHandler(updateLocationSchema, "body"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);
			if (!id) {
				return res.status(400).json({ message: "Missing id param" });
			}

			const changes = req.body as Partial<{
				name: string;
				center: [number, number];
				userId: number;
			}>;

			const updated = await service.updatePatch(id, changes);
			return res.json(updated);
		} catch (error) {
			return next(error);
		}
	},
);

/**
 * DELETE /locations/:id
 */
locationsRouter.delete(
	"/:id",
	validatorHandler(getLocationSchema, "params"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);
			if (!id) {
				return res.status(400).json({ message: "Missing id param" });
			}
			await service.deleteById(id);
			return res.status(204).send();
		} catch (error) {
			return next(error);
		}
	},
);
