import { type Express, static as staticMiddleware } from "express";
import { join } from "path";
import { apiRouter } from "./router/api-router";

export const handleServer = (app: Express) => {
  app.use("/api", apiRouter());

  app.use(staticMiddleware(join(process.cwd(), "dist")));

  app.get("*", (_, res) => {
    res.sendFile(join(process.cwd(), "dist", "index.html"));
  });
};
