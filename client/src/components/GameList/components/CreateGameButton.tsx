import { useService } from "@hooks";
import {
  Box,
  Button,
  ButtonProps,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import { DIFFICULTIES } from "@utils/difficulties";
import { useState } from "react";
import { useNavigate } from "react-router";

export const CreateGameButton = (props: ButtonProps) => {
  const { gameService } = useService();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [difficulty, setDifficulty] = useState(DIFFICULTIES.normal);

  const createGame = () => {
    gameService
      .createGame(difficulty)
      .then((game) => navigate(game._id))
      .catch(console.error);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const parsedValue = parseInt((event.target as HTMLInputElement).value);
    setDifficulty(parsedValue);
  };

  return (
    <>
      <Button {...props} variant="outlined" color="inherit" onClick={openModal}>
        Create game
      </Button>

      <Modal open={modalOpen}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <FormControl>
            <FormLabel>Difficulty</FormLabel>
            <RadioGroup value={difficulty} onChange={handleDifficultyChange}>
              {Object.entries(DIFFICULTIES).map(([k, v]) => (
                <FormControlLabel
                  key={k}
                  value={v}
                  control={<Radio />}
                  label={k.charAt(0).toUpperCase() + k.slice(1).toLowerCase()}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              {...props}
              variant="outlined"
              color="inherit"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              {...props}
              variant="outlined"
              color="inherit"
              onClick={createGame}
            >
              Ok
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
