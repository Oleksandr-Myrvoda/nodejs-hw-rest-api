const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(200).required(),
  email: Joi.string().min(2).max(50).required(),
  phone: Joi.string().min(10).max(20),
});

module.exports = contactSchema;
