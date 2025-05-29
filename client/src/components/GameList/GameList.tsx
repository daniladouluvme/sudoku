import ExtensionIcon from "@mui/icons-material/Extension";
import { useService } from "@hooks/use-service";
import { Game } from "@model/game.model";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { CreateGameButton } from "./components";
import { Loading } from "@components/shared";

export const GameList = () => {
  const { gameService } = useService();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gameService
      .getUserGames()
      .then((games) => {
        setGames(games);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <Loading loading={loading}>
      <CreateGameButton />
      <List>
        {games
          .toSorted((a, b) => -a.date.localeCompare(b.date))
          .map((g) => (
            <ListItemButton
              key={g._id}
              to={`/games/${g._id}`}
              component={Link}
              color="inherit"
            >
              <ListItemIcon>
                <ExtensionIcon />
              </ListItemIcon>

              <ListItemText primary={new Date(g.date).toLocaleString()} />
            </ListItemButton>
          ))}
      </List>
    </Loading>
  );
};
