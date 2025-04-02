import { Game } from "@dbmodel/game.model";
import { createCrudRouter } from "./create-crud-router";

export const gameRouter = () => {
  const router = createCrudRouter(Game, {
    get: true,
    patch: true,
  });

  return router;
};
