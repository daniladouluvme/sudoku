import { WebSocketServer } from "ws";
import { WebSocket } from "ws";

const clients = new Set<WebSocket>();

const setupWebSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
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

  return wss;
};

export { setupWebSocket };
