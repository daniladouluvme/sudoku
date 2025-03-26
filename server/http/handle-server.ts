import { type Express } from "express";
import { apiRouter } from "./router/api-router";

export const handleServer = (server: Express) => {
  server.use("/api", apiRouter());
};
