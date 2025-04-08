import { useService } from "@hooks";
import { Button, ButtonProps } from "@mui/material";
import { useNavigate } from "react-router";

export const CreateGameButton = (props: ButtonProps) => {
  const { gameService } = useService();
  const navigate = useNavigate();

  const handleClick = () => {
    gameService
      .createGame()
      .then((game) => navigate(game._id))
      .catch(console.error);
  };

  return (
    <Button {...props} variant="outlined" color="inherit" onClick={handleClick}>
      Create game
    </Button>
  );
};
