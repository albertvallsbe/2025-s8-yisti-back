import type { QueryInterface } from "sequelize";
import { DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
	await queryInterface.createTable("locations", {
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
		center_lng: {
			type: DataTypes.DOUBLE, // <- DOUBLE per tenir number al model
			allowNull: false,
		},
		center_lat: {
			type: DataTypes.DOUBLE, // <- DOUBLE per tenir number al model
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			// Si vols FK explícita:
			// references: { model: "users", key: "id" },
			// onUpdate: "CASCADE",
			// onDelete: "CASCADE",
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	});

	await queryInterface.addIndex("locations", ["user_id"]);
	await queryInterface.addIndex("locations", ["date"]);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
	await queryInterface.dropTable("locations");
}
