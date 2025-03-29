import { Container } from "@mui/material";
import { Header } from "../Header/Header";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useAppDispatch } from "@hooks/state";
import { verify } from "@state/slice/user-slice";
import { useUser } from "@hooks/use-user";

export const App = () => {
  const dispatch = useAppDispatch();
  useUser();
  useEffect(() => {
    dispatch(verify());
  }, []);

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
    </>
  );
};
