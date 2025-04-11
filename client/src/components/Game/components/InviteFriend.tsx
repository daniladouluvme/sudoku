import { useAppSelector, useService } from "@hooks";
import { GameRequest } from "@model/game-request.model";
import { Game } from "@model/game.model";
import { User } from "@model/user.model";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";

interface Props {
  game: Game;
  invite: (gameRequest: GameRequest) => void;
}

export const InviteFriend = ({ game, invite }: Props) => {
  const { userService, gameRequestService } = useService();
  const friends = useAppSelector((s) => s.friends);
  const currentUser = useAppSelector((s) => s.user);
  const [anchor, setAnchor] = useState<HTMLElement>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const friendIds = friends.map((f) =>
      f.friendOne === currentUser._id ? f.friendTwo : f.friendOne
    );

    Promise.all(friendIds.map((fid) => userService.get(fid)))
      .then(setUsers)
      .catch(console.error);
  }, [friends]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => setAnchor(null);

  const handleGameRequest = (user: User) => {
    gameRequestService
      .sendGameRequest(user._id, game._id)
      .then(invite)
      .catch(console.error);
  };

  return (
    <>
      <IconButton size="medium" onClick={handleClick}>
        <PersonAddIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchor}
        open={!!anchor}
        onClose={handleClose}
      >
        {users.map((u) => (
          <MenuItem key={u._id} onClick={() => handleGameRequest(u)}>
            {u.login}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
