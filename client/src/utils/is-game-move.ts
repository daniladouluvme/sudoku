import { GameMove } from "@model/game-move.model";

export function isGameMove(object: any): object is GameMove {
  if (object?.type === "GAME_MOVE") return true;
  return false;
}
