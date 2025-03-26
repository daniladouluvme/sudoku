import { Container } from "@mui/material";
import { Header } from "../Header/Header";
import { Outlet } from "react-router";

export const App = () => {
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
