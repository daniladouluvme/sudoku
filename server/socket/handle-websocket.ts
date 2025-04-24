import { type WebSocketServer, WebSocket } from "ws";
import { type Server } from "http";
import { isGameMove } from "./utils/game-move";
import { Game } from "@dbmodel/game.model";
import { getUserId } from "@utils/get-user-id";
import { parse } from "cookie";
import { isGameEnter, isGameOut } from "./utils/game-enter-out";
import { GameRequest } from "@dbmodel/game-request.model";

export const handleWebSocket = (wss: WebSocketServer, server: Server) => {
  const clients = new Map<WebSocket, string>();
  const gameGamers = new Map<string, Set<WebSocket>>();

  server.on("upgrade", (req, socket, head) => {
    if (req.url === "/ws") {
      const userId = getUserId(parse(req.headers.cookie));
      if (!userId) return socket.destroy();

      wss.handleUpgrade(req, socket, head, (ws) => {
        clients.set(ws, userId);
        wss.emit("connection", ws, req);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on("connection", (ws) => {
    console.log(new Date().toLocaleString());
    console.log("New client connected");

    ws.on("message", async (rawMessage) => {
      try {
        const message = JSON.parse(rawMessage.toString());

        if (isGameEnter(message)) {
          const game = await Game.findById(message.data.gameId);
          if (!game) return;
          if (!game.user.equals(message.data.userId)) {
            const gameRequest = await GameRequest.findOne({
              game: message.data.gameId,
              user: message.data.userId,
            });
            if (!gameRequest) return;
          }
          if (clients.get(ws) !== message.data.userId) return;

          const gamers = gameGamers.get(message.data.gameId);
          if (!gamers) gameGamers.set(message.data.gameId, new Set([ws]));
          else gamers.add(ws);
        }

        if (isGameOut(message)) {
          if (!gameGamers.has(message.data.gameId)) return;

          const gamers = gameGamers.get(message.data.gameId);
          if (!gamers) return;
          gamers.delete(ws);
          if (!gamers.size) gameGamers.delete(message.data.gameId);
        }

        if (isGameMove(message)) {
          await Game.findByIdAndUpdate(message.data.gameId, {
            $set: {
              [`notSolvedSudoku.${message.data.index}`]: message.data.value,
            },
          });

          const gamers = gameGamers.get(message.data.gameId);
          if (!gamers) return;
          gamers.forEach((gamer) => {
            if (gamer !== ws && gamer.readyState === WebSocket.OPEN) {
              gamer.send(JSON.stringify(message));
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    });

    ws.on("close", () => {
      gameGamers.forEach((gamers, key) => {
        if (!gamers.has(ws)) return;
        gamers.delete(ws);
        if (!gamers.size) gameGamers.delete(key);
      });

      clients.delete(ws);
      console.log(new Date().toLocaleString());
      console.log("Client disconnected");
    });
  });
};
