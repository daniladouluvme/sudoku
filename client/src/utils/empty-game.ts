import { Game } from "@model/game.model";
import { range } from "lodash";

export function emptyGame(): Game {
  return {
    __v: null,
    _id: null,
    date: null,
    initialSudoku: range(81).map(() => 0),
    notSolvedSudoku: range(81).map(() => 0),
    solvedSudoku: range(81).map(() => 0),
    user: null,
  };
}
