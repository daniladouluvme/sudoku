import { useAppSelector, useService } from "@hooks";
import { GameRequest } from "@model/game-request.model";
import { Game } from "@model/game.model";
import { User } from "@model/user.model";
import { useEffect, useState } from "react";
import { CancelGameRequestButton } from "./CancelGameRequestButton";
import { InviteFriend } from "./InviteFriend";
import { Typography } from "@mui/material";

interface Props {
  game: Game;
}

export const Partner = ({ game }: Props) => {
  const { userService, gameRequestService } = useService();
  const currentUser = useAppSelector((s) => s.user);
  const [gameRequests, setGameRequests] = useState<GameRequest[]>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setGameRequests([]);
    gameRequestService
      .getGameGameRequests(game._id)
      .then(setGameRequests)
      .catch(console.error);
  }, []);

  useEffect(() => {
    setUser(null);
    const userId =
      game.user === currentUser._id ? gameRequests[0]?.user : currentUser._id;
    if (userId) {
      userService.get(userId).then(setUser).catch(console.error);
    }
  }, [gameRequests]);

  const handleCancel = (gameRequest: GameRequest) => {
    setGameRequests((grs) => grs.filter((gr) => gr._id !== gameRequest._id));
  };

  const handleInvite = (gameRequest: GameRequest) => {
    setGameRequests((grs) => [...grs, gameRequest]);
  };

  if (!game) return <></>;

  if (game.user !== currentUser._id && user) {
    return <Typography>{user.login}</Typography>;
  }    

  return user ? (
    <CancelGameRequestButton
      user={user}
      gameRequest={gameRequests[0]}
      cancel={handleCancel}
    />
  ) : (
    <InviteFriend game={game} invite={handleInvite} />
  );
};
