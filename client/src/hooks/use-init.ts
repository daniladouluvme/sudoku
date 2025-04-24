import { setUser } from "@state/slice/user.slice";
import { useAppDispatch, useAppSelector } from "./state";
import { useEffect, useRef, useState } from "react";
import { setLoading } from "@state/slice/loading.slice";
import { setFriendRequests } from "@state/slice/friend-request.slice";
import { setFriends } from "@state/slice/friend.slice";
import { useService } from "./use-service";
import { usePrevious } from "./use-previous";

export const useInit = () => {
  const {
    authorizationService,
    friendRequestService,
    friendService,
    socketService,
  } = useService();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => s.user);
  const prevUser = usePrevious(currentUser);
  const socketRef = useRef<WebSocket>(null);

  const [isVerificationEnded, setIsVerificationEnded] = useState(false);

  useEffect(() => {
    initUser();

    return () => {
      socketRef.current?.close();
    };
  }, []);

  useEffect(() => {
    isVerificationEnded && initData();
  }, [currentUser, isVerificationEnded]);

  const initData = async () => {
    await initFriendRequests();
    await initFriends();
    await initSocket();
    dispatch(setLoading(false));
  };

  const initUser = async () => {
    try {
      const user = await authorizationService.verify();
      dispatch(setUser(user));
    } catch (error) {
      console.error(error);
    }
    setIsVerificationEnded(true);
  };

  const initSocket = async () => {
    return new Promise((res, rej) => {
      if (currentUser && currentUser._id !== prevUser?._id) {
        socketRef.current?.close();
        socketRef.current = new WebSocket(
          `ws://${window.location.hostname}:9999/ws`
        );
        socketRef.current.onmessage =
          socketService.hanleMessage.bind(socketService);
        socketService.send = socketRef.current.send.bind(socketRef.current);
        socketRef.current.onopen = res;
        socketRef.current.onerror = rej;
      }

      if (!currentUser) {
        socketRef.current?.close();
        res(null);
      }
    });
  };

  const initFriendRequests = async () => {
    if (currentUser && currentUser._id !== prevUser?._id) {
      try {
        const friendRequests =
          await friendRequestService.getUserFriendRequests();
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
