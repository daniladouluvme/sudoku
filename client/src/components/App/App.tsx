import { Outlet } from "react-router";
import { useInit } from "@hooks/use-init";

export const App = () => {
  useInit();

  return <Outlet />;
};
