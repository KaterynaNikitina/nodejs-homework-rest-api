import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} isn't found!`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with id = ${contactId} not found!`);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body.favorite;
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with id = ${contactId} not found!`);
  }
  if (body === undefined) {
    throw HttpError(400,'Missing field favorite');
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
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
  updateStatusContact: ctrlWrapper(updateStatusContact)
};
