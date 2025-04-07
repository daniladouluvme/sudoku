import type { Server } from "http";
import { WebSocketServer } from "ws";

export const createWebSocket = (server: Server) => {
  return new WebSocketServer({ server });
};
