import config from "@config";
import { connectDB } from "./database";
import app from "./app";
import { setupWebSocket } from "./websocket";

const SERVER_PORT = config.server.port;

// Connecting to the database
connectDB();

// Configuring the http server
const server = app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});

// Configuring the WebSocket
setupWebSocket(server);
