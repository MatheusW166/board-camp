import Joi from "joi";

const gameSchema = Joi.object({
  name: Joi.string().trim().required(),
  image: Joi.string().uri().required(),
  stockTotal: Joi.number().integer().min(1),
  pricePerDay: Joi.number().integer().min(1),
});

export default gameSchema;
