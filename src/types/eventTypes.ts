export type CalendarEvent = {
	id: number;
	title: string;
	start: Date;
	end?: Date | null;
	allDay?: boolean;
	location?: string | null;
	notes?: string | null;
	rrule?: string | null;
	exdates?: string[] | null;
	seriesId?: number | null;
	createdAt?: Date;
	updatedAt?: Date;
};

export type CreateEventPayload = Omit<
	CalendarEvent,
	"id" | "createdAt" | "updatedAt"
>;

export type UpdateEventPayload = Partial<CreateEventPayload>;
