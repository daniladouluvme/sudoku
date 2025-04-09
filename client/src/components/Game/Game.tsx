import { Loading } from "@components/shared";
import { Sudoku } from "@components/Sudoku/Sudoku";
import { useService } from "@hooks";
import { Game as IGame } from "@model/game.model";
import { Box, Divider, Typography } from "@mui/material";
import { isGameMove } from "@utils/game-move";
import { cloneDeep } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { InviteFriend } from "./components";
import { GameRequest } from "@model/game-request.model";

export const Game = () => {
  const { gameId } = useParams();
  const { gameService, gameRequestService } = useService();
  const [game, setGame] = useState<IGame>();
  const [gameRequests, setGameRequests] = useState<GameRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef<WebSocket>(null);
  const setValueRef = useRef(null);

  const gameInit = async () => {
    setLoading(true);
    try {
      const g = await gameService.getGame(gameId);
      setGame(g);

      const gr = await gameRequestService.getGameGameRequests(g._id);
      setGameRequests(gr);
      
      handleSocket();
      setLoading(false);
    } catch (error) {
      console.error();
    }
  };

  const handleSocket = () => {
    socketRef.current = new WebSocket("ws://localhost:9999");

    socketRef.current.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);
        if (isGameMove(data)) {
          setValueRef.current(data.data.index, data.data.value);
        }
      } catch (error) {
        console.error(error);
      }
    };
  };

  useEffect(() => {
    gameInit();

    return () => {
      socketRef.current?.close();
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
    socketRef.current.send(
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ alignSelf: "center" }}>
            {new Date(game?.date).toLocaleString()}
          </Typography>
          <InviteFriend />
        </Box>
        <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
        <Box sx={{ flexGrow: "1", overflow: "hidden" }}>
          <Sudoku game={game} setValue={handleSetValue} />
        </Box>
      </Box>
    </Loading>
  );
};
