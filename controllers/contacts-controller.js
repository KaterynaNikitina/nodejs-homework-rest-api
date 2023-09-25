
import Contact from "../models/Contact.js";
import { HttpError, cloudinary } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  let filter = { owner };

  const result = await Contact.find(filter)
    .skip(skip)
    .limit(limit)
    .populate("owner", "email subscription");
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} isn't found!`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);

  // const { _id: owner } = req.user;
  // const { path: oldPath} = req.file;

  // const { url: avatar } = await cloudinary.uploader.upload(oldPath, {
  //   folder: "avatars"
  // });
  // await fs.unlink(oldPath);

  // const result = await Contact.create({ ...req.body, avatar, owner });
  // res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, `Contact with id = ${contactId} not found!`);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const { favorite } = req.body;

  if (favorite === undefined) {
    throw HttpError(400, "Missing field favorite");
  }

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { favorite },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, `Contact with id = ${contactId} not found!`);
  }

  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: contactId, owner });
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
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
