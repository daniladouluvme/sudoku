import { Game } from "@model/game.model";
import { Cell } from "./components";
import { Box, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface Props {
  game: Game;
  setValue: (index: number, value: number) => void;
}

export const Sudoku = ({ game, setValue }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [selectedCell, setSelectedCell] = useState<number>();
  const selectedCellRef = useRef(null);
  const setValueRef = useRef(null);

  useEffect(() => {
    selectedCellRef.current = selectedCell;
  }, [selectedCell]);

  useEffect(() => {
    setValueRef.current = setValue;
  }, [setValue]);

  useEffect(() => {
    const keyEventListener = (event: KeyboardEvent) => {
      if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.key)) {
        if (
          typeof selectedCellRef.current === "number" &&
          !game.initialSudoku[selectedCellRef.current]
        ) {
          setValueRef.current(selectedCellRef.current, parseInt(event.key));
        }
      }
    };

    const parentResizeObserver = new ResizeObserver((entries) => {
      const parent = entries[0];
      setWidth(parent.contentRect.width);
      setHeight(parent.contentRect.height);
    });

    if (parentRef.current) {
      parentResizeObserver.observe(parentRef.current);
      window.addEventListener("keyup", keyEventListener);
    }

    return () => {
      if (parentRef.current) {
        parentResizeObserver.unobserve(parentRef.current);
        parentResizeObserver.disconnect();
        window.removeEventListener("keyup", keyEventListener);
      }
    };
  }, []);

  const gridTemplate = () => {
    const cellSize =
      width / 9 < height / 10
        ? `calc((${width}px - 8 * 0.25rem) / 9)`
        : `calc((${height}px - 9 * 0.25rem) / 10)`;
    return {
      gridTemplateColumns: `repeat(9, ${cellSize})`,
      gridTemplateRows: `repeat(10, ${cellSize})`,
    };
  };

  const fontSize = () => {
    const s = width < height ? width : height;

    if (s < 500) return "1rem";
    else if (s < 750) return "1.5rem";
    else return "2rem";
  };

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
          ...gridTemplate(),
          fontSize: fontSize(),
          display: "grid",
          gap: "0.25rem",
        }}
      >
        {game?.notSolvedSudoku.map((c, i) => (
          <Cell
            key={i}
            selected={i === selectedCell}
            disabled={!!game?.initialSudoku[i]}
            highlighted={
              game?.notSolvedSudoku[i] > 0 &&
              game?.notSolvedSudoku[i] === game?.notSolvedSudoku[selectedCell]
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
                fontSize: fontSize(),
              }}
            >
              {n}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
