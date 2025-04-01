import { Typography } from "@mui/material";
import { useParams } from "react-router";

export const Game = () => {
  const { gameId } = useParams();

  return <Typography variant="h3">{gameId}</Typography>;
};
