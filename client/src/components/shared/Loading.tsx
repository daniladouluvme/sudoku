import { CircularProgress } from "@mui/material";
import { ReactNode } from "react";
import { CenterElement } from "./CenterElement";

export const Loading = ({
  children,
  loading,
}: {
  children: ReactNode;
  loading: boolean;
}) =>
  loading ? (
    <CenterElement>
      <CircularProgress color="inherit" />
    </CenterElement>
  ) : (
    children
  );
