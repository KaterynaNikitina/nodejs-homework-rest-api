import Joi from "joi";

const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({ "any.required": "Enter name" }),
    email: Joi.string().required().messages({ "any.required": "Enter email" }),
    phone: Joi.string().required().messages({ "any.required": "Enter phone" }),
  });
  
  const contactUpdateSchema = Joi.object({
    name: Joi.string().messages({ "any.required": "Enter name" }),
    email: Joi.string().messages({ "any.required": "Enter email" }),
    phone: Joi.string().messages({ "any.required": "Enter phone" }),
  });

  export default {
    contactAddSchema,
    contactUpdateSchema
  }