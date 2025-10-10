import type { QueryInterface } from "sequelize";
import type * as SequelizeNS from "sequelize";
import { EVENT_TABLE } from "../models/eventModel.js";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(
		queryInterface: QueryInterface,
		Sequelize: typeof SequelizeNS,
	): Promise<void> {
		await queryInterface.createTable(EVENT_TABLE, {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			title: {
				type: Sequelize.STRING(200),
				allowNull: false,
			},
			start: {
				// TIMESTAMP WITH TIME ZONE (sequelize.DATE) al dialecte Postgres
				type: Sequelize.DATE,
				allowNull: false,
			},
			end: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			all_day: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			location: {
				type: Sequelize.STRING(200),
				allowNull: true,
			},
			notes: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			rrule: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			exdates: {
				type: Sequelize.JSONB,
				allowNull: true,
			},
			series_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn("NOW"),
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn("NOW"),
			},
		});

		// Índexos útils (opcionales però recomanables)
		await queryInterface.addIndex(EVENT_TABLE, ["start"], {
			name: "events_start_idx",
		});
		await queryInterface.addIndex(EVENT_TABLE, ["series_id"], {
			name: "events_series_id_idx",
		});
	},

	async down(queryInterface: QueryInterface): Promise<void> {
		await queryInterface.dropTable(EVENT_TABLE);
	},
};
