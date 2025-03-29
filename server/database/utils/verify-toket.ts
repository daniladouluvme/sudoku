import config from "@config";
import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token: string = req.cookies.token;

  if (!token) {
    res.status(401).send();
    return;
  }

  verify(token, config.jwtSecretKey, (error) => {
    if (error) {
      console.error(error);
      return res.status(403).send();
    }
    next();
  });
}
