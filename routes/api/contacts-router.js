import express from "express";

import contactsController from '../../controllers/contacts-controller.js';
// import contactValidation from "../../middleware/validation/contact-validation.js";

import contactSchema from "../../schemas/contact-schema.js";
import {validateBody} from '../../decorators/index.js';

const contactAddValidate = validateBody(contactSchema.contactAddSchema);
const contactUpdateValidate = validateBody(contactSchema.contactUpdateSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", contactsController.getById);

contactsRouter.post("/", contactAddValidate, contactsController.add);

contactsRouter.delete("/:contactId", contactsController.deleteById);

contactsRouter.put("/:contactId", contactUpdateValidate, contactsController.updateById);

export default contactsRouter;
