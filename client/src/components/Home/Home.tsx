import { Loading } from "@components/shared";
import { Sudoku } from "@components/Sudoku/Sudoku";
import { useService } from "@hooks";
import { Game } from "@model/game.model";
import { Box } from "@mui/material";
import { emptyGame } from "@utils/empty-game";
import { cloneDeep } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { RegenerateButton } from "./components";

export const Home = () => {
  const { gameService } = useService();
  const [game, setGame] = useState<Game>();
  const [loading, setLoading] = useState(true);

  const createGame = () => {
    gameService
      .createUnauthorizedGame()
      .then(setGame)
      .catch((error) => {
        setGame(emptyGame());
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    createGame();
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
      <Box
        sx={{
          height: "100%",
          display: "flex",
          rowGap: "1rem",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <RegenerateButton
          sx={{
            alignSelf: "flex-end",
          }}
          onClick={createGame}
        />
        <Sudoku game={game} setValue={setValue} />
      </Box>
    </Loading>
  );
};
