import { Model, DataTypes, Sequelize } from "sequelize";
import type { Optional, ModelAttributes } from "sequelize";

export const LOCATION_TABLE = "locations";

export interface LocationAttributes {
	id: number;
	name: string;
	center_lng: number; // lng
	center_lat: number; // lat
	user_id: number;
	date: Date;

	createdAt: Date;
	updatedAt: Date;
}

export type LocationCreationAttributes = Optional<
	LocationAttributes,
	"id" | "date" | "createdAt" | "updatedAt"
>;

export class Location
	extends Model<LocationAttributes, LocationCreationAttributes>
	implements LocationAttributes
{
	declare id: number;
	declare name: string;
	declare center_lng: number;
	declare center_lat: number;
	declare user_id: number;
	declare date: Date;

	declare createdAt: Date;
	declare updatedAt: Date;

	static associate(_models: Sequelize["models"]) {
		// Afegir associacions si cal
	}

	static config(sequelize: Sequelize) {
		return {
			sequelize,
			tableName: LOCATION_TABLE,
			modelName: "Location",
			timestamps: true,
			underscored: true, // created_at / updated_at
		};
	}
}

export const LocationSchema: ModelAttributes<Location, LocationAttributes> = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	// Ús de DOUBLE perquè el driver retorni number (no string)
	center_lng: {
		type: DataTypes.DOUBLE,
		allowNull: false,
		validate: { min: -180, max: 180 },
		field: "center_lng",
	},
	center_lat: {
		type: DataTypes.DOUBLE,
		allowNull: false,
		validate: { min: -90, max: 90 },
		field: "center_lat",
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		field: "user_id",
		// references: { model: "users", key: "id" },
		// onUpdate: "CASCADE",
		// onDelete: "CASCADE",
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
		field: "date",
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
		field: "created_at",
	},
	updatedAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
		field: "updated_at",
	},
};
