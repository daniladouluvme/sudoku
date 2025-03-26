import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // Разрешаем фронтенду доступ
    credentials: true, // ❗ Обязательно для отправки куков
  })
);
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("Hello client");
});

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});
