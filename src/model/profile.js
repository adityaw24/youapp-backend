import { Schema, model } from "mongoose";
import Joi from "joi";

//validation schema
export const profileSchemaValidate = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string(),
  gender: Joi.string(),
  birthday: Joi.string(),
  horoscope: Joi.string(),
  zodiac: Joi.string(),
  height: Joi.number(),
  weight: Joi.number(),
  interest: Joi.array(),
  image: Joi.string(),
});

const profileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  birthday: {
    type: Date,
    required: false,
  },
  horoscope: {
    type: String,
    required: false,
  },
  zodiac: {
    type: String,
    required: false,
  },
  height: {
    type: Number,
    required: false,
  },
  weight: {
    type: Number,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  interest: {
    type: Array,
    required: false,
  },
});

//creating a model
export const Profile = model("Profile", profileSchema);
