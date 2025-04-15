import { Loading } from "@components/shared";
import { Sudoku } from "@components/Sudoku/Sudoku";
import { useService } from "@hooks";
import { Game } from "@model/game.model";
import { cloneDeep } from "lodash";
import { useCallback, useEffect, useState } from "react";

export const Home = () => {
  const { gameService } = useService();
  const [game, setGame] = useState<Game>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gameService
      .createUnauthorizedGame()
      .then(setGame)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const setValue = useCallback(
    (index: number, value: number): number => {
      const newNotSolved = [...game.notSolvedSudoku];
      const newValue = value === newNotSolved[index] ? 0 : value;
      newNotSolved[index] = newValue;
      const newGame = cloneDeep(game);
      setGame({ ...newGame, notSolvedSudoku: newNotSolved });
      return newValue;
    },
    [game]
  );

  return (
    <Loading loading={loading}>
      <Sudoku game={game} setValue={setValue} />
    </Loading>
  );
};
