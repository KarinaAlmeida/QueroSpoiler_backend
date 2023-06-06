import joi from "joi";

export const postSum = joi.object({
    title: joi.string().required(),
    author: joi.string().required(),
    coverUrl: joi.string().uri().required(),
    summary: joi.string().required(),
  });