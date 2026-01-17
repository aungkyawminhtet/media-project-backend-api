const Joi = require("joi");

export const catSchema = {
  bodySchema: Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
  }),

  paramSchema: Joi.object({
    id: Joi.string().regex(/^[0-9a-f-A-F]{24}$/),
  }),

  imageSchema: Joi.object({
    image: Joi.string().required(),
    name: Joi.string().required(),
  }),
};

export const postSchema = {
  bodySchema: Joi.object({
    cat: Joi.string().regex(/^[0-9a-f-A-F]{24}$/),
    image: Joi.string().required(),
    name: Joi.string().required(),
    desc: Joi.string().required(),
    user: Joi.optional()
  }),
};

export const userSchema = {
  bodySchema: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required().min(9).max(11),
    password: Joi.string().required().min(8).max(16),
  }),
  loginSchema: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(16),
  }),
};
