import type { Sequelize } from "sequelize";

import { User, UserSchema } from "./userModel.js";
import { Customer, CustomerSchema } from "./customerModel.js";
import { Event, EventSchema } from "./eventModel.js";

export const setupModels = (sequelize: Sequelize): void => {
	User.init(UserSchema, User.config(sequelize));
	Customer.init(CustomerSchema, Customer.config(sequelize));
	Event.init(EventSchema, Event.config(sequelize));

	User.associate?.(sequelize.models);
	Customer.associate?.(sequelize.models);
};
