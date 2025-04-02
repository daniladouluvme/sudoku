import { User } from "./user.model";

export interface Game {
  date: string;
  user: User["_id"];
  solvedSudoku: number[];
  notSolvedSudoku: number[];
  solved: boolean;
  _id: string;
  __v: string;
}
