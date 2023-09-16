import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, runValidateAtUpdate } from "./hooks.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },

    token: {
      type: String,
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleSaveError);
// userSchema.pre("findOneAndUpdate", runValidateAtUpdate);
// userSchema.post("findOneAndUpdate", handleSaveError);

export const userRegisterSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string(),
});

export const userLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const User = model("user", userSchema);

export default User;
