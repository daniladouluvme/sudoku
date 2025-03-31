import { setUser } from "@state/slice/user.slice";
import { useAppDispatch, useAppSelector } from "./state";
import { useEffect, useState } from "react";
import { setLoading } from "@state/slice/loading.slice";
import { setFriendRequests } from "@state/slice/friend-request.slice";
import { setFriends } from "@state/slice/friend.slice";
import { useService } from "./use-service";
import { usePrevious } from "./use-previous";

export const useInit = () => {
  const { authorizationService, friendRequestService, friendService } =
    useService();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => s.user);
  const prevUser = usePrevious(currentUser);

  const [isVerificationEnded, setIsVerificationEnded] = useState(false);

  useEffect(() => {
    initUser();
  }, []);

  useEffect(() => {
    isVerificationEnded && initData();
  }, [currentUser]);

  const initData = async () => {
    await initFriendRequests();
    await initFriends();
    dispatch(setLoading(false));
  };

  const initUser = async () => {
    try {
      const user = await authorizationService.verify();
      dispatch(setUser(user));
    } catch (error) {
      console.error(error);
      dispatch(setLoading(false));
    }
    setIsVerificationEnded(true);
  };

  const initFriendRequests = async () => {
    if (currentUser && currentUser._id !== prevUser?._id) {
      try {
        const friendRequests = await friendRequestService.getUserFriendRequests(
          currentUser._id
        );
        dispatch(setFriendRequests(friendRequests));
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(setFriendRequests([]));
    }
  };

  const initFriends = async () => {
    if (currentUser && currentUser._id !== prevUser?._id) {
      try {
        const friends = await friendService.getUserFriends(currentUser._id);
        dispatch(setFriends(friends));
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(setFriends([]));
    }
  };
};
