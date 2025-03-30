import { Header } from "@components/Header/Header";
import { SimpleBackdrop } from "@components/shared";
import { useAppDispatch, useAppSelector } from "@hooks/state";
import { Container } from "@mui/material";
import { clearBackdrop } from "@state/slice/backdrop.slice";
import { Outlet } from "react-router";

export const Main = () => {
  const backdrop = useAppSelector((s) => s.backdrop);
  const dispatch = useAppDispatch();
  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          pt: 10,
          height: "100%",
        }}
      >
        <Outlet />
      </Container>
      <SimpleBackdrop
        {...backdrop}
        open={backdrop.loading || !!backdrop.error || !!backdrop.message}
        close={() => dispatch(clearBackdrop())}
      />
    </>
  );
};
