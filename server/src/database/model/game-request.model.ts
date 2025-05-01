import { model, Schema } from "mongoose";

const gameRequestSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: "game" },
  user: { type: Schema.Types.ObjectId, ref: "user" },
});

export const GameRequest = model("gameRequest", gameRequestSchema);
