import { type Express } from "express";
import { apiRouter } from "./router/api-router";

export const handleServer = (app: Express) => {
  app.use("/api", apiRouter());
};
