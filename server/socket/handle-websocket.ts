import { WebSocket } from "ws";
import type { Server } from "ws";
import { isGameMove } from "./utils/game-move";
import { Game } from "@dbmodel/game.model";

export const handleWebSocket = (socket: Server) => {
  const clients = new Set<WebSocket>();

  socket.on("connection", (ws) => {
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
