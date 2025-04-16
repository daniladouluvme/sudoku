import { Game } from "@dbmodel/game.model";
import { createCrudRouter } from "../create-crud-router";
import { verifyToken } from "../../../database/utils/verify-token";
import { getUserId } from "../../../utils/get-user-id";
import { SudokuGenerator } from "../../../utils/sudoku";
import { GameRequest } from "@dbmodel/game-request.model";

export const gameRouter = () => {
  const router = createCrudRouter(Game, {
    patch: true,
  });

  router.get("/", verifyToken, async (req, res): Promise<any> => {
    try {
      const user = getUserId(req.cookies);
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

  router.get(
    "/:id/gameRequests",
    verifyToken,
    async (req, res): Promise<any> => {
      try {
        const user = getUserId(req.cookies);
        const { id } = req.params;

        const game = await Game.findOne({ _id: id });
        if (!game) return res.status(404).send();
        if (!game.user.equals(user)) return res.status(403).send();

        const gameRequests = await GameRequest.find({ game: id });
        res.send(gameRequests);
      } catch (error) {
        console.error(error);
        res.status(500).send();
      }
    }
  );

  router.get("/:id", verifyToken, async (req, res): Promise<any> => {
    try {
      const userId = getUserId(req.cookies);
      const { id } = req.params;

      const game = await Game.findById(id);
      if (!game) return res.status(404).send();
      if (game?.user.equals(userId)) return res.send(game);

      const gameRequests = await GameRequest.find({ game: id });
      if (gameRequests.every((gr) => !gr.user.equals(userId))) {
        return res.status(403).send();
      }

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
        user: getUserId(req.cookies),
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
