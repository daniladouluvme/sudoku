import type { WebSocketServer } from "../../socket/web-socket-server";

declare global {
  namespace Express {
    interface Request {
      wss: WebSocketServer;
    }
  }
}
