import type { Request } from "express";
import { decode } from "jsonwebtoken";

export function getUserId(request: Request) {
  const token: string = request.cookies.token;
  const payload = decode(token, { json: true });
  return payload?.userId;
}
