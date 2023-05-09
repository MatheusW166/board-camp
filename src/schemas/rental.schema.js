import Joi from "joi";

const rentalSchema = Joi.object({
  customerId: Joi.number().positive().required(),
  gameId: Joi.number().positive().required(),
  daysRented: Joi.number().min(1).required(),
});

export default rentalSchema;
