import { decode } from "jsonwebtoken";

export function getUserId(cookies: Record<string, any>): string {
  const token: string = cookies?.token;
  const payload = decode(token, { json: true });
  return payload?.userId;
}
