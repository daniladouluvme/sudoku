import { useEffect } from "react";
import { useAppDispatch } from "./state";
import { AuthorizationService } from "@service/authorization.service";
import { setUser } from "@state/slice/user-slice";

const authorizationS = new AuthorizationService();

export const useUser = () => {
  const dispatch = useAppDispatch();

  const initAplication = async () => {
    try {
      const user = await authorizationS.verify();
      dispatch(setUser(user));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initAplication();
  }, []);
};
