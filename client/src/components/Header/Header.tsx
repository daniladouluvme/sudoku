import { AppBar, Container, Toolbar } from "@mui/material";
import { Link } from "./components/Link";
import { ProfileMenu } from "./components/ProfileMenu/ProfileMenu";

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
          }}
        >
          <Link to="/">home</Link>

          <ProfileMenu sx={{ marginLeft: "auto" }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
