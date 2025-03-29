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
import { Authorization } from "./components/Authorization/Authorization.tsx";
import { Login } from "./components/Authorization/components/Login.tsx";
import { Register } from "./components/Authorization/components/Register/Register.tsx";
import { EmailVerification } from "@components/Authorization/components/EmailVerification.tsx";
import { Provider } from "react-redux";
import { store } from "@state/store.ts";
import { NotFound } from "@components/NotFound.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Routes>
            <Route element={<App />}>
              <Route index element={<Home />} />
              <Route path="authorization" element={<Authorization />}>
                <Route path="login" element={<Login />}></Route>
                <Route path="register" element={<Register />}></Route>
                <Route
                  path="verification/:userId"
                  element={<EmailVerification />}
                ></Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
