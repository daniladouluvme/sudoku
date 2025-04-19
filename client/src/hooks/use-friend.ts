import { patchBackdrop, setBackdrop } from "@state/slice/backdrop.slice";
import { useAppDispatch } from "./state";
import { User } from "@model/user.model";
import {
  addFriendRequest,
  deleteFriendRequest,
  updateFriendRequest,
} from "@state/slice/friend-request.slice";
import { AxiosError } from "axios";
import { FriendRequest } from "@model/friend-request.model";
import {
  addFriend,
  deleteFriend as deleteFriendAction,
} from "@state/slice/friend.slice";
import { Friend } from "@model/friend.modle";
import { useService } from "./use-service";

export const useFriend = () => {
  const { friendRequestService, friendService } = useService();
  const dispatch = useAppDispatch();

  const friendRequest = async (user: User) => {
    dispatch(setBackdrop({ loading: true }));

    try {
      const friendRequest = await friendRequestService.sendFriendRequest(
        user._id
      );

      dispatch(addFriendRequest(friendRequest));
    } catch (error) {
      console.error(error);

      let errorMessage = "";

      if (error instanceof AxiosError && error.status === 409) {
        try {
          const friendRequest: FriendRequest = error.response.data;

          await friendRequestService.delete(friendRequest._id);

          const friend = await friendService.addFriend(friendRequest.from);

          dispatch(addFriend(friend));
        } catch (error) {
          console.error(error);

          if (error instanceof AxiosError && error.status === 409) {
            errorMessage = "The user has already been added as a friend";
          }
        }
      } else errorMessage = "An unknown error occurred during friend request";

      if (errorMessage) dispatch(patchBackdrop({ error: errorMessage }));
    }

    dispatch(patchBackdrop({ loading: false }));
  };

  const acceptFriendRequest = async (friendRequest: FriendRequest) => {
    const { from } = friendRequest;

    dispatch(setBackdrop({ loading: true }));

    try {
      await friendRequestService.deleteFriendRequest(friendRequest._id);

      dispatch(deleteFriendRequest(friendRequest._id));
    } catch (error) {
      console.error(error);
    }

    try {
      const friend = await friendService.addFriend(from);

      dispatch(addFriend(friend));
    } catch (error) {
      console.error(error);

      let errorMessage = "An unknown error occurred during friend request";

      if (error instanceof AxiosError && error.status === 409) {
        errorMessage = "The user has already been added as a friend";
      }

      dispatch(patchBackdrop({ error: errorMessage }));
    }

    dispatch(patchBackdrop({ loading: false }));
  };

  const declineFriendRequest = async (friendRequest: FriendRequest) => {
    dispatch(setBackdrop({ loading: true }));
    const id = friendRequest._id;
    try {
      const declinedFriendRequest =
        await friendRequestService.declineFriendRequest(id, {
          declined: true,
        });
      dispatch(updateFriendRequest(declinedFriendRequest));
    } catch (error) {
      console.error(error);
      dispatch(
        patchBackdrop({
          error:
            "An unknown error occurred during the rejection of the friend request",
        })
      );
    }
    dispatch(patchBackdrop({ loading: false }));
  };

  const cancelFriendRequest = async (friendRequest: FriendRequest) => {
    dispatch(setBackdrop({ loading: true }));
    const id = friendRequest._id;
    try {
      await friendRequestService.deleteFriendRequest(id);
      dispatch(deleteFriendRequest(id));
    } catch (error) {
      console.error(error);
      dispatch(
        patchBackdrop({
          error:
            "An unknown error occurred during the cancellation of the friend request",
        })
      );
    }
    dispatch(patchBackdrop({ loading: false }));
  };

  const deleteFriend = async (friend: Friend) => {
    dispatch(setBackdrop({ loading: true }));

    const id = friend._id;

    try {
      await friendService.deleteFriend(id);

      dispatch(deleteFriendAction(id));
    } catch (error) {
      console.error(error);

      dispatch(
        patchBackdrop({
          error: "An unknown error occurred while deleting a friend",
        })
      );
    }

    dispatch(patchBackdrop({ loading: false }));
  };

  return {
    friendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    cancelFriendRequest,
    deleteFriend,
  };
};
