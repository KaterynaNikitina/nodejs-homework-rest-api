import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import jimp from "jimp";

import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });
  console.log('avatarURL :>> ', avatarURL);


  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Unauthorized");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Unauthorized");
  }

  const { _id: id } = user;

  const payload = {
    id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.status(200).json({
    token,
  });
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const avatarDir = path.resolve("public", "avatars")

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  console.log('req.body :>> ', req.body);
  console.log('req.file :>> ', req.file);
  
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);

  await jimp
  .read(tempUpload)
  .then(avatar => avatar.resize(250, 250).write(tempUpload))
  .catch(err => console.error(err));

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
}

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar)
};
