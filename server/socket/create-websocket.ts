import { WebSocketServer } from "ws";

export const createWebSocket = (server: any) => {
  return new WebSocketServer({ server });
};
