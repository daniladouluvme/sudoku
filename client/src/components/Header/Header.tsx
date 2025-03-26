import { AppBar, Container, Toolbar } from "@mui/material";
import { Link } from "./components/Link";
import { LogoutButton } from "./components/LogoutButton";

export const Header = () => {
  const login = false;

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
          {login ? (
            <LogoutButton sx={{ marginLeft: "auto" }} />
          ) : (
            <>
              <Link sx={{ marginLeft: "auto" }} to="/authorization/login">
                login
              </Link>
              <Link to="/authorization/register">register</Link>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
