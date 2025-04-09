import { Game } from "@dbmodel/game.model";
import { createCrudRouter } from "../create-crud-router";
import { verifyToken } from "../../../database/utils/verify-token";
import { getUserId } from "../../utils/get-user-id";
import { SudokuGenerator } from "../../../utils/sudoku";
import { GameRequest } from "@dbmodel/game-request.model";

export const gameRouter = () => {
  const router = createCrudRouter(Game, {
    patch: true,
  });

  router.get("/", verifyToken, async (req, res): Promise<any> => {
    try {
      const user = getUserId(req);
      const gameRequests = await GameRequest.find({ user });
      const games = await Game.find({
        $or: [{ user }, { _id: { $in: gameRequests.map((gr) => gr.game) } }],
      });
      res.send(games);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  });

  router.get("/:id", verifyToken, async (req, res): Promise<any> => {
    try {
      const userId = getUserId(req);
      const { id } = req.params;
      const game = await Game.findById(id);
      if (!game?.user.equals(userId)) return res.status(403).send();
      res.send(game);
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
