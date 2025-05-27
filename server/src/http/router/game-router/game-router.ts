import { Router, type Request } from "express";
import { SudokuGenerator } from "@utils/sudoku";

export const gameRouter = () => {
  const router = Router();

  router.get(
    "/create",
    (req: Request<any, any, any, { difficulty?: string }>, res) => {
      try {
        const { difficulty } = req.query;
        const parsedDifficulty = parseInt(difficulty);

        const { notSolvedSudoku, solvedSudoku } = new SudokuGenerator(
          isNaN(parsedDifficulty) ? 40 : parsedDifficulty
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
    }
  );

  return router;
};
