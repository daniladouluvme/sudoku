import { model, Schema } from "mongoose";

const userSchema = new Schema({
  login: String,
  password: String,
  email: String,
  emailVerified: Boolean,
});

export const User = model("user", userSchema);
