import { Model, DataTypes, Sequelize } from "sequelize";
import type { Optional, ModelAttributes } from "sequelize";

export const EVENT_TABLE = "events";

export type EventAttributes = {
	id: number;
	title: string;
	start: Date;
	end: Date | null;
	allDay: boolean;
	location: string | null;
	notes: string | null;
	rrule: string | null;
	exdates: string[] | null; // es desa com JSONB
	seriesId: number | null;

	createdAt: Date;
	updatedAt: Date;
};

export type EventCreationAttributes = Optional<
	EventAttributes,
	| "id"
	| "end"
	| "allDay"
	| "location"
	| "notes"
	| "rrule"
	| "exdates"
	| "seriesId"
	| "createdAt"
	| "updatedAt"
>;

export class Event
	extends Model<EventAttributes, EventCreationAttributes>
	implements EventAttributes
{
	declare id: number;
	declare title: string;
	declare start: Date;
	declare end: Date | null;
	declare allDay: boolean;
	declare location: string | null;
	declare notes: string | null;
	declare rrule: string | null;
	declare exdates: string[] | null;
	declare seriesId: number | null;

	declare createdAt: Date;
	declare updatedAt: Date;

	static associate(_models: Sequelize["models"]) {
		// Exemple futur:
		// const { Calendar } = models as { Calendar: typeof import("./calendarModel.js").Calendar };
		// this.belongsTo(Calendar, { as: "calendar", foreignKey: "calendarId" });
	}

	static config(sequelize: Sequelize) {
		return {
			sequelize,
			tableName: EVENT_TABLE,
			modelName: "Event",
			timestamps: true,
			underscored: true,
		};
	}
}

export const EventSchema: ModelAttributes<Event, EventAttributes> = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	title: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	start: {
		type: DataTypes.DATE, // guardem en UTC si arriba ISO amb Z
		allowNull: false,
	},
	end: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	allDay: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
		field: "all_day",
	},
	location: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	notes: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	rrule: {
		type: DataTypes.STRING(255),
		allowNull: true,
	},
	exdates: {
		// array d’ISO strings → JSONB a Postgres
		type: DataTypes.JSONB,
		allowNull: true,
		validate: {
			isArrayOfIsoStrings(value: unknown) {
				if (value == null) return;
				if (!Array.isArray(value)) {
					throw new Error("exdates must be an array of ISO strings or null");
				}
				for (const iso of value) {
					if (typeof iso !== "string" || Number.isNaN(Date.parse(iso))) {
						throw new Error("exdates must contain valid ISO datetime strings");
					}
				}
			},
		},
	},
	seriesId: {
		type: DataTypes.INTEGER,
		allowNull: true,
		field: "series_id",
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
