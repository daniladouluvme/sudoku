import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "@config";

export const createServer = () => {
  const ORIGINS = config.origings;
  const server = express();

  server.use(
    cors({
      origin: ORIGINS,
      credentials: true,
    })
  );
  server.use(json());
  server.use(cookieParser());
  server.use(urlencoded({ extended: true }));

  return server;
};
