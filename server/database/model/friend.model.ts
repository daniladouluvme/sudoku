import { model, Schema } from "mongoose";

const friendSchema = new Schema({
  friendOne: { type: Schema.Types.ObjectId, ref: "user" },
  friendTwo: { type: Schema.Types.ObjectId, ref: "user" },
});

export const Friend = model("friend", friendSchema);
