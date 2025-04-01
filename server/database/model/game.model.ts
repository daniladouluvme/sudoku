import { model, Schema } from "mongoose";

const gameSchema = new Schema({
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: "user" },
});

export const Game = model("game", gameSchema);
