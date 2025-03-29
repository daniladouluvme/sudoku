import { useEffect } from "react";
import { useAppSelector } from "./state";
import { useNavigate } from "react-router";

export const useUser = () => {
  const user = useAppSelector((s) => s.user);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [user]);
};
