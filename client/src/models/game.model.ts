import { User } from "./user.model";

export interface Game {
  date: string;
  user: User["_id"];
  solvedSudoku: number[];
  notSolvedSudoku: number[];
  initialSudoku: number[];
  _id: string;
  __v: string;
}
