import { Loading } from "@components/shared";
import { Sudoku } from "@components/Sudoku/Sudoku";
import { useService } from "@hooks";
import { Game } from "@model/game.model";
import { Box } from "@mui/material";
import { emptyGame } from "@utils/empty-game";
import { cloneDeep } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { RegenerateButton, SettingsButton } from "./components";
import { DIFFICULTIES } from "@utils/difficulties";

export const Home = () => {
  const { gameService } = useService();
  const [game, setGame] = useState<Game>();
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState(DIFFICULTIES.normal);

  const createGame = () => {
    gameService
      .createUnauthorizedGame(difficulty)
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
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", rowGap: "1rem" }}
        >
          <SettingsButton
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
          <RegenerateButton onClick={createGame} />
        </Box>
        <Sudoku game={game} setValue={setValue} />
      </Box>
    </Loading>
  );
};
