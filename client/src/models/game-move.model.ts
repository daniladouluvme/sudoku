export interface GameMove {
  type: "GAME_MOVE";
  data: {
    gameId: string;
    index: number;
    value: number;
  };
}
