import { useAppSelector } from "@hooks/state";
import { Navigate, Outlet } from "react-router";

export const AuthorizedRoute = () => {
  const user = useAppSelector((s) => s.user);
  return user ? <Outlet /> : <Navigate to="/" />;
};
