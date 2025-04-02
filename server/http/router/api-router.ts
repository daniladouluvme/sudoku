import { Router } from "express";
import { userRouter } from "./user-router";
import { friendRequestRouter } from "./friend-request-router";
import { friendRouter } from "./friend-router";
import { gameRouter } from "./game.router";

export const apiRouter = () => {
  const router = Router();

  router.use("/users", userRouter());
  router.use("/friendRequests", friendRequestRouter());
  router.use("/friends", friendRouter());
  router.use("/games", gameRouter());

  return router;
};
