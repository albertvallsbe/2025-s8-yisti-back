import Joi from "joi";
const id = Joi.number().integer().positive();
const name = Joi.string().min(1);

const center = Joi.array().items(Joi.number()).length(2);

export const getLocationSchema = Joi.object({
	id: id.required(),
});

export const createLocationSchema = Joi.object({
	name: name.required(),
	center: center.required(), // [lng, lat]
	userId: Joi.number().integer().positive().required(),
}).prefs({ abortEarly: false, convert: true, stripUnknown: true });

export const updateLocationSchema = Joi.object({
	name,
	center, // [lng, lat]
	userId: Joi.number().integer().positive(),
}).prefs({ abortEarly: false, convert: true, stripUnknown: true });
