export class SocketService {
  protected handlers = new Set<(message: MessageEvent<any>) => void>();
  protected socket: WebSocket;

  public addHandler(handler: (message: MessageEvent<any>) => void): void {
    this.handlers.add(handler);
  }

  public removeHandler(handler: (message: MessageEvent<any>) => void): void {
    this.handlers.delete(handler);
  }

  public hanleMessage(message: MessageEvent<any>) {
    this.handlers.forEach((h) => h?.(message));
  }

  public send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    console.log(data);
  }
}
