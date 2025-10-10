import Joi from "joi";

const ISO_UTC_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;

const id = Joi.number().integer();
const title = Joi.string().min(1);

const isoUtc = Joi.date().iso();
const bool = Joi.boolean();
const textNullable = Joi.string().allow(null);

const isoArrayNullable = Joi.array()
	.items(Joi.string().pattern(ISO_UTC_REGEX, "ISO-UTC"))
	.allow(null);

/** Forma mínima que ens interessa per la regla end > start */
type DateRangePayload = {
	start?: Date | null;
	end?: Date | null;
	allDay?: boolean | null;
};

/**
 * Validació d'objecte: si no és allDay i hi ha end -> end > start
 */
const withEndAfterStartIfNeeded = (
	value: unknown,
	helpers: Joi.CustomHelpers,
) => {
	const payloadValue = (value ?? {}) as DateRangePayload;

	const isAllDay = Boolean(payloadValue.allDay);
	const startIso = payloadValue.start;
	const endIso = payloadValue.end;

	if (!isAllDay && startIso instanceof Date && endIso instanceof Date) {
		const parsedStartMs = startIso.getTime();
		const parsedEndMs = endIso.getTime();
		const invalidDates =
			!Number.isFinite(parsedStartMs) || !Number.isFinite(parsedEndMs);
		const endNotAfterStart = parsedEndMs <= parsedStartMs;

		if (invalidDates || endNotAfterStart) {
			return helpers.error("any.invalid", {
				message: "end must be after start when allDay=false",
			});
		}
	}
	return value;
};

export const getEventSchema = Joi.object({
	id: id.required(),
});

export const createEventSchema = Joi.object({
	title: title.required(),
	start: isoUtc.required(), // entra ISO, Joi el converteix a Date
	end: isoUtc.allow(null), // entra ISO|null, Joi el converteix a Date|null
	allDay: bool.default(false),
	location: textNullable,
	notes: textNullable,

	// Recurrència
	rrule: textNullable,
	exdates: isoArrayNullable, // ISO strings[]
	seriesId: textNullable,
})
	.custom(withEndAfterStartIfNeeded, "end > start rule")
	.prefs({ abortEarly: false, convert: true, stripUnknown: true });

export const updateEventSchema = Joi.object({
	title,
	start: isoUtc,
	end: isoUtc.allow(null),
	allDay: bool,
	location: textNullable,
	notes: textNullable,

	rrule: textNullable,
	exdates: isoArrayNullable,
	seriesId: textNullable,
})
	.custom(withEndAfterStartIfNeeded, "end > start rule")
	.prefs({ abortEarly: false, convert: true, stripUnknown: true });
