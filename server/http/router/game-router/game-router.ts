import { Router } from "express";
import { SudokuGenerator } from "@utils/sudoku";

export const gameRouter = () => {
  const router = Router();

  router.get("/create", (_, res) => {
    try {
      const { notSolvedSudoku, solvedSudoku } = new SudokuGenerator(
        40
      ).getSudoku();

      res.send({
        notSolvedSudoku,
        solvedSudoku,
        initialSudoku: notSolvedSudoku,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  });

  return router;
};
