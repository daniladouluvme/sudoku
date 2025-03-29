import { setUser } from "@state/slice/user-slice";
import { useAppDispatch } from "./state";
import { AuthorizationService } from "@service/authorization.service";
import { useEffect } from "react";
import { setLoading } from "@state/slice/loading.slice";

const authorizationS = new AuthorizationService();

export const useInit = () => {
  const dispatch = useAppDispatch();

  const initAplication = async () => {
    try {
      const user = await authorizationS.verify();
      dispatch(setUser(user));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    initAplication();
  }, []);
};
