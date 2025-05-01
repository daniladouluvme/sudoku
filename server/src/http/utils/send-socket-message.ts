import type WebSocket from "ws";

export function sendSocketMessage(
  socket: WebSocket,
  message: ISocketMessage
): void {
  try {
    if (!message) throw new Error("No message");
    const stringMessage = JSON.stringify(message);

    socket.send(stringMessage);
  } catch (error) {
    console.error(error);
  }
}

export interface ISocketMessage {
  type: "CREATE" | "UPDATE" | "DELETE";
  collection: string;
  data: any;
}
