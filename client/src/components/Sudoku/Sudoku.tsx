import { Game } from "@model/game.model";
import { Cell } from "./components";
import { Box, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface Props {
  game: Game;
}

export const Sudoku = ({ game }: Props) => {
  const parentRef = useRef(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    const parentResizeObserver = new ResizeObserver((entries) => {
      const parent = entries[0];
      const width = parent.contentRect.width;
      const height = parent.contentRect.height;
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
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        rowGap: "0.25rem",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        ref={parentRef}
        sx={{
          flexGrow: "1",
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
            <Cell value={c} key={i} />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 1fr)",
          gap: "0.25rem",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <IconButton
            key={n}
            sx={{ justifySelf: "center", alignSelf: "center" }}
          >
            {n}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};
