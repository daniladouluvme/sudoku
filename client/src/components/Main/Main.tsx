import { Header } from "@components/Header/Header";
import { Container } from "@mui/material";
import { Outlet } from "react-router";

export const Main = () => (
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
