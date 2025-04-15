import { Game } from "@model/game.model";
import { Cell } from "./components";
import { Box, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Grid } from "./components/Grid";

interface Props {
  game: Game;
  setValue: (index: number, value: number) => void;
}

export const Sudoku = ({ game, setValue }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState<string>("0px");
  const [fontSize, setFontSize] = useState<string>("1rem");
  const [selectedCell, setSelectedCell] = useState<number>();
  const selectedCellRef = useRef(null);
  const setValueRef = useRef(null);
  const handleSetValueRef = useRef(null);

  useEffect(() => {
    selectedCellRef.current = selectedCell;
  }, [selectedCell]);

  useEffect(() => {
    setValueRef.current = setValue;
  }, [setValue]);

  useEffect(() => {
    handleSetValueRef.current = (value: number) => {
      if (
        typeof selectedCellRef.current === "number" &&
        !game.initialSudoku[selectedCellRef.current]
      ) {
        setValueRef.current(selectedCellRef.current, value);
      }
    };
  }, [game]);

  useEffect(() => {
    const keyEventListener = (event: KeyboardEvent) => {
      if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.key)) {
        handleSetValueRef.current(parseInt(event.key));
      }
    };

    const parentResizeObserver = new ResizeObserver((entries) => {
      const parent = entries[0];
      const width = parent.contentRect.width;
      const height = parent.contentRect.height;

      setCellSize(
        width / 9 < height / 10
          ? `calc((${width}px - 8 * 0.25rem) / 9)`
          : `calc((${height}px - 9 * 0.25rem) / 10)`
      );

      const s = width < height ? width : height;
      let fontSize = "1rem";
      if (s < 500) fontSize = "1rem";
      else if (s < 750) fontSize = "1.5rem";
      else fontSize = "2rem";

      setFontSize(fontSize);
    });

    if (parentRef.current) {
      parentResizeObserver.observe(parentRef.current);
      window.addEventListener("keyup", keyEventListener);
    }

    return () => {
      window.removeEventListener("keyup", keyEventListener);
      if (parentRef.current) {
        parentResizeObserver.unobserve(parentRef.current);
        parentResizeObserver.disconnect();
      }
    };
  }, []);

  return (
    <Box
      ref={parentRef}
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "relative",
          fontSize,
          display: "grid",
          gridTemplateColumns: `repeat(9, ${cellSize})`,
          gridTemplateRows: `repeat(10, ${cellSize})`,
          gap: "0.25rem",
        }}
      >
        <Grid cellSize={cellSize} />
        {game?.notSolvedSudoku.map((c, i) => (
          <Cell
            key={i}
            selected={i === selectedCell}
            disabled={!!game?.initialSudoku[i]}
            highlighted={
              game?.notSolvedSudoku[i] > 0 &&
              game?.notSolvedSudoku[i] === game?.notSolvedSudoku[selectedCell]
            }
            wrong={
              typeof game?.notSolvedSudoku[i] === "number" &&
              game?.notSolvedSudoku[i] !== game?.solvedSudoku[i]
            }
            value={c}
            selectCell={() => setSelectedCell(i)}
          />
        ))}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <Box key={n}>
            <Button
              sx={{
                height: "100%",
                width: "100%",
                minWidth: "100%",
                fontSize,
              }}
              onClick={() => handleSetValueRef.current(n)}
            >
              {n}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
