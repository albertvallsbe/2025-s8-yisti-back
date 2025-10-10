import {
	ValidationError,
	UniqueConstraintError,
	DatabaseError,
} from "sequelize";
import Boom from "@hapi/boom";

import type { CalendarEvent } from "../types/eventTypes.js";
import { Event as EventModel } from "../db/models/eventModel.js";

export class EventService {
	async create(data: Omit<CalendarEvent, "id">): Promise<CalendarEvent> {
		try {
			const created = await EventModel.create({
				title: data.title,
				start: data.start,
				end: data.end ?? null,
				allDay: Boolean(data.allDay),
				location: data.location ?? null,
				notes: data.notes ?? null,
				rrule: data.rrule ?? null,
				exdates: data.exdates ?? null, // string[] | null
				seriesId: data.seriesId ?? null,
			});

			return created.toJSON() as CalendarEvent;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof UniqueConstraintError) {
				throw Boom.conflict("Event already exists");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to create event");
		}
	}

	async find(): Promise<CalendarEvent[]> {
		try {
			const items = await EventModel.findAll({
				order: [["start", "ASC"]],
			});
			return items as unknown as CalendarEvent[];
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while fetching events");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to fetch events");
		}
	}

	async findById(eventId: number): Promise<CalendarEvent> {
		try {
			const item = await EventModel.findByPk(eventId);
			if (!item) {
				throw Boom.notFound(`Event ${eventId} not found`);
			}
			return item.toJSON() as CalendarEvent;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while fetching event");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to fetch event");
		}
	}

	async updatePatch(
		eventId: number,
		changes: Partial<Omit<CalendarEvent, "id">>,
	): Promise<CalendarEvent> {
		try {
			const item = await EventModel.findByPk(eventId);
			if (!item) {
				throw Boom.notFound(`Event ${eventId} not found`);
			}

			const {
				createdAt: _ignoreCreatedAt,
				updatedAt: _ignoreUpdatedAt,
				...safeChanges
			} = changes;

			const updated = await item.update(safeChanges);
			return updated.toJSON() as CalendarEvent;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof UniqueConstraintError) {
				throw Boom.conflict("Event conflicts with existing data");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while updating event");
			}
			throw Boom.badImplementation("Failed to update event");
		}
	}

	async deleteById(eventId: number): Promise<void> {
		try {
			const item = await EventModel.findByPk(eventId);
			if (!item) {
				throw Boom.notFound(`Event ${eventId} not found`);
			}
			await item.destroy();
			return;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while deleting event");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to delete event");
		}
	}
}
