import config from "@config";
import { createServer } from "./http/create-server";
import { connectDatabase } from "./database/connect-database";
import { createWebSocket } from "./socket/create-websocket";
import { handleWebSocket } from "./socket/handle-websocket";
import { handleServer } from "./http/handle-server";
import http from 'http';

const SERVER_PORT = config.server.port;

// Connecting to the database
connectDatabase();

// Configuring the http server
const expressApp = createServer();
const server = http.createServer(expressApp);
server.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
handleServer(expressApp);

// Configuring the WebSocket
const socket = createWebSocket(server);
handleWebSocket(socket);
