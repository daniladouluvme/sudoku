import config from "@config";
import { createServer } from "./http/create-server";
import { connectDatabase } from "./database/connect-database";
import { handleWebSocket } from "./socket/handle-websocket";
import { handleServer } from "./http/handle-server";
import http from 'http';
import { WebSocketServer } from "ws";

const SERVER_PORT = config.server.port;

// Connecting to the database
connectDatabase();

// Configuring the http server
const expressApp = createServer();
const server = http.createServer(expressApp);
server.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});

// Configuring the WebSocket
const socket = new WebSocketServer({ noServer: true });
handleWebSocket(socket, server);

handleServer(expressApp);
