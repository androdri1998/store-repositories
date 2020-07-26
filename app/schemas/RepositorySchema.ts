import Joi from "@hapi/joi";

export const createRepository = {
  body: Joi.object({
    title: Joi.string().required(),
    url: Joi.string().required(),
    techs: Joi.array().items(Joi.string()).min(1).required(),
  }),
};

export const updateRepository = {
  params: Joi.object({
    repository_id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    title: Joi.string(),
    url: Joi.string(),
    techs: Joi.array().items(Joi.string()).min(1),
  }),
};
