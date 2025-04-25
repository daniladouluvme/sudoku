import { getUserId } from "@utils/get-user-id";
import { parse } from "cookie";
import { type Server } from "http";
import WebSocket, { WebSocketServer as WSServer } from "ws";
import { isGameEnter, isGameOut } from "./utils/game-enter-out";
import { Game } from "@dbmodel/game.model";
import { GameRequest } from "@dbmodel/game-request.model";
import { isGameMove } from "./utils/game-move";

export class WebSocketServer {
  protected wss = new WSServer({ noServer: true });
  protected gameGamers = new Map<string, Set<WebSocket>>();
  public clients = new Map<WebSocket, string>();

  constructor(protected server: Server) {
    server.on("upgrade", (req, socket, head) => {
      if (req.url === "/ws") {
        const userId = getUserId(parse(req.headers.cookie));
        if (!userId) return socket.destroy();

        this.wss.handleUpgrade(req, socket, head, (ws) => {
          this.clients.set(ws, userId);
          this.wss.emit("connection", ws, req);
        });
      } else {
        socket.destroy();
      }
    });

    this.wss.on("connection", (ws) => {
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
            if (this.clients.get(ws) !== message.data.userId) return;

            const gamers = this.gameGamers.get(message.data.gameId);
            if (!gamers)
              this.gameGamers.set(message.data.gameId, new Set([ws]));
            else gamers.add(ws);
          }

          if (isGameOut(message)) {
            if (!this.gameGamers.has(message.data.gameId)) return;

            const gamers = this.gameGamers.get(message.data.gameId);
            if (!gamers) return;
            gamers.delete(ws);
            if (!gamers.size) this.gameGamers.delete(message.data.gameId);
          }

          if (isGameMove(message)) {
            await Game.findByIdAndUpdate(message.data.gameId, {
              $set: {
                [`notSolvedSudoku.${message.data.index}`]: message.data.value,
              },
            });

            const gamers = this.gameGamers.get(message.data.gameId);
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
        this.gameGamers.forEach((gamers, key) => {
          if (!gamers.has(ws)) return;
          gamers.delete(ws);
          if (!gamers.size) this.gameGamers.delete(key);
        });

        this.clients.delete(ws);
        console.log(new Date().toLocaleString());
        console.log("Client disconnected");
      });
    });
  }
}
