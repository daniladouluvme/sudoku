import { Loading } from "@components/shared";
import { useAppSelector } from "@hooks/state";
import { Outlet } from "react-router";

export const LoadingRoute = () => {
  const loading = useAppSelector((s) => s.loading);
  return (
    <Loading loading={loading}>
      <Outlet />
    </Loading>
  );
};
