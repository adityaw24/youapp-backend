import { Schema, model } from "mongoose";
import Joi from "joi";
import validator from "validator";

//validation schema
export const userSchemaValidate = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginSchemaValidate = Joi.object({
  email: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Enter an email address"],
    unique: [true, "Email already exists"],
    validate: [validator.isEmail, "Enter a valid email address."],
  },
  username: {
    type: String,
    required: [true, "Enter a username"],
    unique: [true, "Username already exists"],
    validate: [
      validator.isAlphanumeric,
      "Username may only have letters and numbers.",
    ],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password must be at least 6 characters"],
  },
});

//creating a model
export const User = model("User", userSchema);
