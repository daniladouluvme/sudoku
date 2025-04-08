import { Game } from "@dbmodel/game.model";
import { createCrudRouter } from "./create-crud-router";
import { verifyToken } from "../../database/utils/verify-token";
import { getUserId } from "../utils/get-user-id";
import { SudokuGenerator } from "../../utils/sudoku";

export const gameRouter = () => {
  const router = createCrudRouter(Game, {
    get: true,
    patch: true,
  });

  router.get("/", verifyToken, async (req, res): Promise<any> => {
    try {
      const games = await Game.find({ user: getUserId(req) });
      res.send(games);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  });

  router.post("/", verifyToken, async (req, res): Promise<any> => {
    try {
      const { solvedSudoku, notSolvedSudoku } = new SudokuGenerator(
        40
      ).getSudoku();
      const game = await Game.create({
        user: getUserId(req),
        date: new Date(),
        solvedSudoku,
        notSolvedSudoku,
        initialSudoku: notSolvedSudoku,
        solved: false,
      });
      res.send(game);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  });

  return router;
};
