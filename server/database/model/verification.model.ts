import { model, Schema } from "mongoose";

const verificationSchema = new Schema({
  code: String,
  user: { type: Schema.Types.ObjectId, ref: "user" },
  validUntil: Date,
});

export const Verification = model("verification", verificationSchema);
