// src/services/locationService.ts
import {
	ValidationError,
	UniqueConstraintError,
	DatabaseError,
} from "sequelize";
import Boom from "@hapi/boom";

import { Location as LocationModel } from "../db/models/locationModel.js";
import type {
	Location as LocationDTO,
	CreateLocationDto,
	UpdateLocationDto,
	LocationRow,
} from "../types/locationTypes.js";

// Helpers sense conversions innecessàries
const toIso = (d: Date): string => d.toISOString();

const mapRowToLocation = (row: LocationRow): LocationDTO => ({
	id: row.id,
	name: row.name,
	center: [row.center_lng, row.center_lat],
	userId: row.user_id,
	date: toIso(row.date),
});

// Tipus estrictes per a update() del model (el que DEMANA el model)
type LocationUpdateAttrs = {
	name?: string;
	center_lng?: number;
	center_lat?: number;
	user_id?: number;
	date?: Date;
};

const buildSafeChanges = (changes: UpdateLocationDto): LocationUpdateAttrs => {
	const safe: LocationUpdateAttrs = {};

	if (typeof changes.name === "string") safe.name = changes.name;
	if (typeof changes.userId === "number") safe.user_id = changes.userId;
	if (Array.isArray(changes.center) && changes.center.length === 2) {
		const [lng, lat] = changes.center;
		safe.center_lng = lng; // ja són number des del front
		safe.center_lat = lat;
	}
	return safe;
};

export class LocationService {
	async create(data: CreateLocationDto): Promise<LocationDTO> {
		try {
			const [lng, lat] = data.center;

			const created = await LocationModel.create({
				name: data.name,
				center_lng: lng,
				center_lat: lat,
				user_id: data.userId,
				// date té default al model
			});

			const row = created.toJSON() as LocationRow;
			return mapRowToLocation(row);
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof UniqueConstraintError) {
				throw Boom.conflict("Location already exists");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while creating location");
			}
			throw Boom.badImplementation("Failed to create location");
		}
	}

	async find(): Promise<LocationDTO[]> {
		try {
			const items = await LocationModel.findAll({
				order: [["date", "ASC"]],
			});
			return items.map((it) => mapRowToLocation(it.toJSON() as LocationRow));
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while fetching locations");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to fetch locations");
		}
	}

	async findById(id: number): Promise<LocationDTO> {
		try {
			const item = await LocationModel.findByPk(id);
			if (!item) throw Boom.notFound(`Location ${id} not found`);
			return mapRowToLocation(item.toJSON() as LocationRow);
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while fetching location");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to fetch location");
		}
	}

	async updatePatch(
		id: number,
		changes: UpdateLocationDto,
	): Promise<LocationDTO> {
		try {
			const item = await LocationModel.findByPk(id);
			if (!item) throw Boom.notFound(`Location ${id} not found`);

			const safeChanges = buildSafeChanges(changes);
			const updated = await item.update(safeChanges);

			return mapRowToLocation(updated.toJSON() as LocationRow);
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof UniqueConstraintError) {
				throw Boom.conflict("Location conflicts with existing data");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while updating location");
			}
			throw Boom.badImplementation("Failed to update location");
		}
	}

	async deleteById(id: number): Promise<void> {
		try {
			const item = await LocationModel.findByPk(id);
			if (!item) throw Boom.notFound(`Location ${id} not found`);
			await item.destroy();
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while deleting location");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to delete location");
		}
	}
}
