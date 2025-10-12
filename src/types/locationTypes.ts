export interface Location {
	id: number;
	name: string;
	center: [number, number]; // [lng, lat]
	userId: number;
	date: string; // ISO 8601
}

export type CreateLocationDto = {
	name: string;
	center: [number, number];
	userId: number;
};

export type UpdateLocationDto = Partial<CreateLocationDto>;

export interface LocationRow {
	id: number;
	name: string;
	center_lng: number;
	center_lat: number;
	user_id: number;
	date: Date;
	created_at?: Date;
	updated_at?: Date;
}
