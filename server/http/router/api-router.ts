import { Router } from "express";
import { userRouter } from "./user-router/user-router";
import { gameRouter } from "./game-router/game-router";

export const apiRouter = () => {
  const router = Router();

  router.use("/users", userRouter());
  router.use("/games", gameRouter());

  return router;
};
