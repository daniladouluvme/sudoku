export interface GameMove {
  type: "GAME_MOVE";
  data: {
    gameId: string;
    index: number;
    value: number;
  };
}

export function isGameMove(object: any): object is GameMove {
  if (object?.type === "GAME_MOVE") return true;
  return false;
}
