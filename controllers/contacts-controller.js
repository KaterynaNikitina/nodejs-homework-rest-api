import contactsServices from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const result = await contactsServices.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsServices.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "No such contact found!");
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await contactsServices.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsServices.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id = ${contactId} not found!`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsServices.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id = ${contactId} not found!`);
  }
  res.json({
    message: "Contact successfully deleted",
  });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};