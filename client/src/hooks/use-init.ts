import { setUser } from "@state/slice/user.slice";
import { useAppDispatch } from "./state";
import { AuthorizationService } from "@service/authorization.service";
import { useEffect } from "react";
import { setLoading } from "@state/slice/loading.slice";
import { FriendRequestService } from "@service/friend-request.service";
import { setFriendRequests } from "@state/slice/friend-request.slice";
import { User } from "@model/user.model";
import { setFriends } from "@state/slice/friend.slice";
import { FriendService } from "@service/friend.service";

const authorizationS = new AuthorizationService();
const friendRequestS = new FriendRequestService();
const friendS = new FriendService();

export const useInit = () => {
  const dispatch = useAppDispatch();

  const initAplication = async () => {
    let user: User;
    try {
      user = await authorizationS.verify();
      dispatch(setUser(user));
    } catch (error) {
      console.error(error);
      return dispatch(setLoading(false));
    }

    try {
      const friendRequests = await friendRequestS.getUserFriendRequests(
        user._id
      );
      dispatch(setFriendRequests(friendRequests));
    } catch (error) {
      console.error(error);
    }

    try {
      const friends = await friendS.getUserFriends(user._id);
      dispatch(setFriends(friends));
    } catch (error) {
      console.error(error);
    }

    dispatch(setLoading(false));
  };

  useEffect(() => {
    initAplication();
  }, []);
};
