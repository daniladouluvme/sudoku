import { Game } from "@model/game.model";
import { Cell } from "./components";
import { Box, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface Props {
  game: Game;
}

export const Sudoku = ({ game }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const [selectedCell, setSelectedCell] = useState<number>();

  useEffect(() => {
    const parentResizeObserver = new ResizeObserver((entries) => {
      const parent = entries[0];
      const width = parent.contentRect.width;
      const height =
        parent.contentRect.height - controlsRef.current.clientHeight;
      setSize(width > height ? height : width);
    });

    if (parentRef.current) {
      parentResizeObserver.observe(parentRef.current);
    }

    return () => {
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
        rowGap: "0.25rem",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "grid",
          height: size,
          width: size,
          gridTemplateColumns: "repeat(9, 1fr)",
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
      </Box>
      <Box ref={controlsRef} sx={{ width: size, height: size / 9 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <IconButton key={n} sx={{ aspectRatio: "1/1" }}>
              {n}
            </IconButton>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
