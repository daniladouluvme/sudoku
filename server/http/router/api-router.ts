import { Router } from "express";
import { userRouter } from "./user-router/user-router";

export const apiRouter = () => {
  const router = Router();

  router.use("/users", userRouter());

  return router;
};
