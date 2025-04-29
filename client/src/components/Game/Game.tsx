import { Loading } from "@components/shared";
import { Sudoku } from "@components/Sudoku/Sudoku";
import { useAppSelector, useService } from "@hooks";
import { Game as IGame } from "@model/game.model";
import { Box, Divider, Typography } from "@mui/material";
import { isGameMove } from "@utils/is-game-move";
import { cloneDeep } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Partner } from "./components/Partner";

export const Game = () => {
  const { gameId } = useParams();
  const { gameService, socketService } = useService();
  const user = useAppSelector((s) => s.user);
  const [game, setGame] = useState<IGame>();
  const [loading, setLoading] = useState(true);
  const setValueRef = useRef(null);

  const gameInit = async () => {
    setLoading(true);
    try {
      const g = await gameService.getGame(gameId);
      setGame(g);
      setLoading(false);
    } catch (error) {
      console.error();
    }
  };

  const handleSocketMessage = useCallback((message: MessageEvent<any>) => {
    try {
      const data = JSON.parse(message.data);
      if (isGameMove(data)) {
        setValueRef.current(data.data.index, data.data.value);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    gameInit();
    socketService.addHandler(handleSocketMessage);
    socketService.send(
      JSON.stringify({
        type: "GAME_ENTER",
        data: {
          gameId,
          userId: user._id,
        },
      })
    );

    return () => {
      socketService.removeHandler(handleSocketMessage);
      socketService.send(
        JSON.stringify({
          type: "GAME_OUT",
          data: {
            gameId,
            userId: user._id,
          },
        })
      );
    };
  }, [gameId]);

  const setValueCallback = useCallback(
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

  useEffect(() => {
    setValueRef.current = setValueCallback;
  }, [setValueCallback]);

  const handleSetValue = (index: number, value: number) => {
    const newValue = setValueCallback(index, value);
    socketService.send(
      JSON.stringify({
        type: "GAME_MOVE",
        data: {
          gameId,
          index,
          value: newValue,
        },
      })
    );
  };

  return (
    <Loading loading={loading}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "2rem",
          }}
        >
          <Typography sx={{ alignSelf: "center" }}>
            {new Date(game?.date).toLocaleString()}
          </Typography>
          <Partner game={game} />
        </Box>
        <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
        <Box sx={{ flexGrow: "1", overflow: "hidden" }}>
          <Sudoku game={game} setValue={handleSetValue} />
        </Box>
      </Box>
    </Loading>
  );
};
