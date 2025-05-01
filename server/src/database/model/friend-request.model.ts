import { model, Schema } from "mongoose";

const friendRequestSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: "user" },
  to: { type: Schema.Types.ObjectId, ref: "user" },
  declined: Boolean,
});

export const FriendRequest = model("friendRequest", friendRequestSchema);
