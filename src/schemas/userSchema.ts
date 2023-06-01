import joi from "joi";

 export const signup = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().valid(joi.ref('password')).required(),
  picture: joi.string().uri().required(),
});

export const signin= joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

