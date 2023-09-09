import {contactAddSchema, contactUpdateSchema} from "../../models/Contact.js";
import { validateBody } from "../../decorators/index.js";

const addContactValidate = validateBody(contactSchema.contactAddSchema);

const updateContactValidate = validateBody(contactSchema.contactUpdateSchema);

export default {
    addContactValidate,
    updateContactValidate
}