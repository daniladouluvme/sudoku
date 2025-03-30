import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { App } from "./components/App/App.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./components/Home/Home.tsx";
import { Login } from "./components/Authorization/components/Login.tsx";
import { Register } from "./components/Authorization/components/Register/Register.tsx";
import { EmailVerification } from "@components/Authorization/components/EmailVerification.tsx";
import { Provider } from "react-redux";
import { store } from "@state/store.ts";
import { NotFound } from "@components/NotFound.tsx";
import { Profile } from "@components/Profile/Profile.tsx";
import { UserList } from "@components/UserList/UserList.tsx";
import { UnauthorizedRoute } from "@components/ProtectedRoute/UnauthorizedRoute.tsx";
import { AuthorizedRoute } from "@components/ProtectedRoute/AuthorizedRoute.tsx";
import { LoadingRoute } from "@components/ProtectedRoute/LoadingRoute.tsx";
import { Main } from "@components/Main/Main.tsx";
import { ServiceProvider } from "@providers/service.provider.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ServiceProvider>
        <BrowserRouter>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Routes>
              <Route element={<App />}>
                <Route element={<LoadingRoute />}>
                  <Route element={<Main />}>
                    <Route index element={<Home />} />
                    <Route element={<UnauthorizedRoute />}>
                      <Route path="login" element={<Login />}></Route>
                      <Route path="register" element={<Register />}></Route>
                      <Route
                        path="verification/:userId"
                        element={<EmailVerification />}
                      />
                    </Route>
                    <Route element={<AuthorizedRoute />}>
                      <Route path="profile/:userId" element={<Profile />} />
                      <Route path="users" element={<UserList />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </ServiceProvider>
    </Provider>
  </StrictMode>
);
