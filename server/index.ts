process.env.NODE_CONFIG_DIR = `${__dirname}/config`
import config from "@config";
import { createServer } from "./src/http/create-server";
import { connectDatabase } from "./src/database/connect-database";
import { handleServer } from "./src/http/handle-server";
import http from "http";
import { WebSocketServer } from "./src/socket/web-socket-server";

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
const wsServer = new WebSocketServer(server);
expressApp.use((req, _, next) => {
  req.wss = wsServer;
  next();
});
handleServer(expressApp);
