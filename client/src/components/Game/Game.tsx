import { Loading } from "@components/shared";
import { Sudoku } from "@components/Sudoku/Sudoku";
import { useService } from "@hooks";
import { Game as IGame } from "@model/game.model";
import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const Game = () => {
  const { gameId } = useParams();
  const { gameService } = useService();
  const [game, setGame] = useState<IGame>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    gameService
      .get(gameId)
      .then((game) => {
        setGame(game);
        setLoading(false);
      })
      .catch(console.error);
  }, [gameId]);

  return (
    <Loading loading={loading}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Typography variant="h6" sx={{ alignSelf: "center" }}>
          {new Date(game?.date).toLocaleString()}
        </Typography>
        <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
        <Box sx={{ flexGrow: "1", overflow: "hidden" }}>
          <Sudoku game={game} />
        </Box>
      </Box>
    </Loading>
  );
};
