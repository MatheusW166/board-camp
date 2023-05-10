import Joi from "joi";

const customerSchema = Joi.object({
  name: Joi.string().trim().required(),
  cpf: Joi.string().trim().replace(/\D/, "").required().length(11),
  phone: Joi.string().trim().required().min(10).max(11),
  birthday: Joi.string().isoDate().required(),
});

export default customerSchema;
