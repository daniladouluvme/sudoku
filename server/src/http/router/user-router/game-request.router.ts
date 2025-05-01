import { createCrudRouter } from "../create-crud-router";
import { GameRequest } from "@dbmodel/game-request.model";
import { verifyToken } from "../../../database/utils/verify-token";
import { getUserId } from "../../../utils/get-user-id";
import { Game } from "@dbmodel/game.model";

export function gameRequestRouter() {
  const router = createCrudRouter(GameRequest, {
    post: {
      requestHandlers: [
        verifyToken,
        async (req, res, next) => {
          const user = getUserId(req.cookies);
          const { game: _id } = req.body;
          const result = await Game.find({ user, _id });
          if (!result) return res.status(403).send();
          next();
        },
      ],
    },
    delete: {
      requestHandlers: [
        verifyToken,
        async (req, res, next) => {
          const user = getUserId(req.cookies);
          const { id: _id } = req.params;
          const result = await Game.find({ user, _id });
          if (!result) return res.status(403).send();
          next();
        },
      ],
    },
  });

  return router;
}
