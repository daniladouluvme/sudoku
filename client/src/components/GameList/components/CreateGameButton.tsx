import { useAppSelector, useService } from "@hooks";
import { Button, ButtonProps } from "@mui/material";
import { useNavigate } from "react-router";

export const CreateGameButton = (props: ButtonProps) => {
  const { gameService } = useService();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.user);

  const handleClick = () => {
    gameService
      .createGame(user._id)
      .then((game) => navigate(game._id))
      .catch(console.error);
  };

  return (
    <Button {...props} variant="outlined" color="inherit" onClick={handleClick}>
      Create game
    </Button>
  );
};
