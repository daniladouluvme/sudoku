import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "@config";

const ORIGINS = config.origings;

const app = express();

app.use(
  cors({
    origin: ORIGINS, // Разрешаем фронтенду доступ
    credentials: true, // ❗ Обязательно для отправки куков
  })
);
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("Hello client");
});

export default app;
