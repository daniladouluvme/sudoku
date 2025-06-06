import { model, Schema } from "mongoose";

const gameSchema = new Schema({
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: "user" },
  solvedSudoku: { type: [Number] },
  notSolvedSudoku: { type: [Number] },
  initialSudoku: { type: [Number] }
});

export const Game = model("game", gameSchema);
