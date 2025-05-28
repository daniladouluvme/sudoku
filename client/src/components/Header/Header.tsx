import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { ProfileMenu } from "./components/ProfileMenu";
import { MainMenu } from "./components/MainMenu";
import { Link } from "react-router";
import { LanguageButton } from "./components/LanguageButton";

export const Header = () => (
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
          variant="h1"
          color="inherit"
          fontSize='2rem'
          sx={{ textDecoration: "none" }}
        >
          Sudoku
        </Typography>
        <Box sx={{ position: "relative" }}>
          <LanguageButton sx={{ position: "absolute", left: 'calc(-100% - 0.25rem)' }} />
          <ProfileMenu />
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);
