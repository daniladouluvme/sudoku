import { type WebSocketServer, WebSocket } from "ws";
import { type Server } from "http";
import { isGameMove } from "./utils/game-move";
import { Game } from "@dbmodel/game.model";
import { getUserId } from "@utils/get-user-id";
import { parse } from "cookie";

export const handleWebSocket = (wss: WebSocketServer, server: Server) => {
  server.on("upgrade", (req, socket, head) => {
    if (req.url === "/ws") {
      const userId = getUserId(parse(req.headers.cookie));
      if (!userId) return socket.destroy();

      wss.handleUpgrade(req, socket, head, (ws) =>
        wss.emit("connection", ws, req)
      );
    } else {
      socket.destroy();
    }
  });

  const clients = new Set<WebSocket>();

  wss.on("connection", (ws) => {
    clients.add(ws);
    console.log("New client connected");

    ws.on("message", async (message) => {
      try {
        const data = JSON.parse(message.toString());
        if (isGameMove(data)) {
          await Game.findByIdAndUpdate(data.data.gameId, {
            $set: { [`notSolvedSudoku.${data.data.index}`]: data.data.value },
          });

          clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(message.toString());
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    });

    ws.on("close", () => {
      clients.delete(ws);
      console.log("Client disconnected");
    });
  });
};
