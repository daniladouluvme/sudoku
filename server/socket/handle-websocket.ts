import { WebSocket } from "ws";
import type { Server } from "ws";

export const handleWebSocket = (socket: Server) => {
  const clients = new Set<WebSocket>();

  socket.on("connection", (ws) => {
    clients.add(ws);
    console.log("New client connected");

    ws.on("message", (message) => {
      console.log(`Received: ${message}`);
      // Broadcast to all clients
      clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    ws.on("close", () => {
      clients.delete(ws);
      console.log("Client disconnected");
    });
  });
};
