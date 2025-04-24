export interface GameEnterOut {
  type: "GAME_ENTER" | "GAME_OUT";
  data: {
    gameId: string;
    userId: string;
  };
}

export function isGameEnter(object: any): object is GameEnterOut {
  if (object?.type === "GAME_ENTER") return true;
  return false;
}

export function isGameOut(object: any): object is GameEnterOut {
  if (object?.type === "GAME_OUT") return true;
  return false;
}
