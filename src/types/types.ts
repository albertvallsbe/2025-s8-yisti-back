export interface Customer {
	id: number;
	name: string;
	firstSurname: string;
	secondSurname: string;
	phone: string;
	userId: number;
	createdAt: Date;
	updatedAt: Date;
}

export type ReqProperty = "body" | "params" | "query" | "headers";

export type CreationAttributes = "id" | "createdAt" | "updatedAt";
export type CreationAttributesFor<T> = Extract<CreationAttributes, keyof T>;

export type FindQuery = {
	limit?: number | string;
	offset?: number | string;
	price?: number | string;
	price_min?: number | string;
	price_max?: number | string;
};

export interface AppError extends Error {
	statusCode?: number;
	status?: number;
	code?: string | number;
	data?: unknown;
}
