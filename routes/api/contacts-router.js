import express from "express";

import contactsController from '../../controllers/contacts-controller.js';

import * as contactSchema from "../../models/Contact.js"

import {validateBody} from '../../decorators/index.js';
import {authenticate, isValidId} from "../../middlewares/index.js";

const contactAddValidate = validateBody(contactSchema.contactAddSchema);
const contactUpdateValidate = validateBody(contactSchema.contactUpdateSchema);
const contactUpdateFavValidate = validateBody(contactSchema.contactUpdateFavouriteSchema);

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidId, contactsController.getById);

contactsRouter.post("/", contactAddValidate, contactsController.add);

contactsRouter.put("/:contactId", isValidId, contactUpdateValidate, contactsController.updateById);

contactsRouter.patch("/:contactId/favorite", isValidId, contactUpdateFavValidate, contactsController.updateStatusContact);

contactsRouter.delete("/:contactId", isValidId, contactsController.deleteById);

export default contactsRouter;
