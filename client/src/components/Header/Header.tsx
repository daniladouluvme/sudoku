import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { ProfileMenu } from "./components/ProfileMenu/ProfileMenu";
import { MainMenu } from "./components/MainMenu/MainMenu";
import { Link } from "react-router";

export const Header = () => {
  return (
    <AppBar>
      <Container maxWidth="lg">
        <Toolbar
          component={"nav"}
          disableGutters={true}
          sx={{
            display: "flex",
            columnGap: "10px",
            justifyContent: "space-between",
          }}
        >
          <MainMenu />
          <Typography
            component={Link}
            to="/"
            variant="h4"
            color="inherit"
            sx={{ textDecoration: "none" }}
          >
            Sudoku
          </Typography>
          <ProfileMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
