import { Router } from "express";
import { authRouter } from "./authRouter.js";
import { usersRouter } from "./users.js";
import { customersRouter } from "./customers.js";
import { locationsRouter } from "./locations.js";
import { eventsRouter } from "./events.js";

export const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/customers", customersRouter);
router.use("/locations", locationsRouter);
router.use("/events", eventsRouter);
