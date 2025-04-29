import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./state";
import { usePrevious } from "./use-previous";
import { useService } from "./use-service";
import { isFriendSocketMessage } from "@utils/is-friend-socket-message";
import { addFriend, deleteFriend } from "@state/slice/friend.slice";
import { isFriendRequestSocketMessage } from "@utils/is-friend-request-socket-message";
import {
  addFriendRequest,
  deleteFriendRequest,
  updateFriendRequest,
} from "@state/slice/friend-request.slice";

export const useWebSocket = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => s.user);
  const prevUser = usePrevious(currentUser);
  const { socketService } = useService();

  const handleSocketMessage = useCallback((message: MessageEvent<any>) => {
    try {
      const data = JSON.parse(message.data);
      if (isFriendSocketMessage(data)) {
        switch (data.type) {
          case "CREATE":
            dispatch(addFriend(data.data));
            break;
          case "DELETE":
            dispatch(deleteFriend(data.data));
            break;
        }
        return;
      }

      if (isFriendRequestSocketMessage(data)) {
        switch (data.type) {
          case "CREATE":
            dispatch(addFriendRequest(data.data));
            break;
          case "UPDATE":
            dispatch(updateFriendRequest(data.data));
            break;
          case "DELETE":
            dispatch(deleteFriendRequest(data.data));
            break;
        }
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!currentUser) {
      socketService.removeHandler(handleSocketMessage);
    }
    if (currentUser && currentUser._id !== prevUser?._id) {
      socketService.removeHandler(handleSocketMessage);
      socketService.addHandler(handleSocketMessage);
    }
  }, [currentUser]);
};
