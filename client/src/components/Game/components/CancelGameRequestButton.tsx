import ClearIcon from "@mui/icons-material/Clear";
import { useService } from "@hooks";
import { GameRequest } from "@model/game-request.model";
import { User } from "@model/user.model";
import { Button } from "@mui/material";

interface Props {
  user: User;
  gameRequest: GameRequest;
  cancel: (gamerRequest: GameRequest) => void;
}

export const CancelGameRequestButton = ({
  user,
  gameRequest,
  cancel,
}: Props) => {
  const { gameRequestService } = useService();

  const handleClick = () => {
    gameRequestService
      .cancelGameRequest(gameRequest._id)
      .then(cancel)
      .catch(console.error);
  };

  return (
    <Button
      variant="outlined"
      color="inherit"
      size="small"
      onClick={handleClick}
      endIcon={<ClearIcon />}
    >
      {user.login}
    </Button>
  );
};
