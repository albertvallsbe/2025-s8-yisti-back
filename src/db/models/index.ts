import type { Sequelize } from "sequelize";

import { User, UserSchema } from "./userModel.js";
import { Customer, CustomerSchema } from "./customerModel.js";
import { Event, EventSchema } from "./eventModel.js";
import { Location, LocationSchema } from "./locationModel.js";

export const setupModels = (sequelize: Sequelize): void => {
	User.init(UserSchema, User.config(sequelize));
	Customer.init(CustomerSchema, Customer.config(sequelize));
	Event.init(EventSchema, Event.config(sequelize));
	Location.init(LocationSchema, Location.config(sequelize));

	User.associate?.(sequelize.models);
	Location.associate(sequelize.models);
	Event.associate?.(sequelize.models);
	Customer.associate?.(sequelize.models);
};
