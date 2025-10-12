import type { Request, Response, NextFunction } from "express";
import { Router } from "express";

import { UserService } from "../services/userService.js";
import { validatorHandler } from "../middlewares/validatorHandler.js";
import {
	getUserSchema,
	createUserSchema,
	updateUserSchema,
} from "../schemas/userSchema.js";

export const locationsRouter = Router();
const service = new UserService();

locationsRouter.get(
	"/",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const users = await service.find();

			return res.json(users);
		} catch (error) {
			return next(error);
		}
	},
);

locationsRouter.get(
	"/:id",
	validatorHandler(getUserSchema, "params"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return res.status(400).json({ message: "Missing id param" });
			}

			const user = await service.findById(id);

			return res.status(200).json(user);
		} catch (error) {
			return next(error);
		}
	},
);

locationsRouter.post(
	"/",
	validatorHandler(createUserSchema, "body"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const body = req.body;
			const newUser = await service.create(body);

			return res.status(201).json(newUser);
		} catch (error) {
			return next(error);
		}
	},
);

locationsRouter.patch(
	"/:id",
	validatorHandler(getUserSchema, "params"),
	validatorHandler(updateUserSchema, "body"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return res.status(400).json({ message: "Missing id param" });
			}

			const body = req.body;
			const user = await service.updatePatch(id, body);

			return res.json(user);
		} catch (error) {
			return next(error);
		}
	},
);

locationsRouter.delete(
	"/:id",
	validatorHandler(getUserSchema, "params"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return res.status(400).json({ message: "Missing id param" });
			}

			const user = await service.deleteById(id);

			return res.status(204).json(user);
		} catch (error) {
			return next(error);
		}
	},
);

// usersRouter.get("/", (req: Request, res: Response) => {
// 	const { limit, offset } = req.query;

// 	if (limit && offset) {
// 		res.json({ limit, offset });
// 	}
// 	res.send("No query params");
// });
