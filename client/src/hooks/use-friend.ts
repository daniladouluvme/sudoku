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
import { Friend } from "@model/friend.model";
import { useService } from "./use-service";
import { useTranslation } from "react-i18next";

export const useFriend = () => {
  const { friendRequestService, friendService } = useService();
  const { t } = useTranslation();
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
            errorMessage = t("error.alreadyAddedAsFriend");
          }
        }
      } else errorMessage = t("error.unknown");

      if (errorMessage) dispatch(patchBackdrop({ error: errorMessage }));
    }

    dispatch(patchBackdrop({ loading: false }));
  };

  const acceptFriendRequest = async (friendRequest: FriendRequest) => {
    const { from } = friendRequest;

    dispatch(setBackdrop({ loading: true }));

    try {
      await friendRequestService.deleteFriendRequest(friendRequest._id);

      dispatch(deleteFriendRequest(friendRequest));
    } catch (error) {
      console.error(error);
    }

    try {
      const friend = await friendService.addFriend(from);

      dispatch(addFriend(friend));
    } catch (error) {
      console.error(error);

      let errorMessage = t("error.unknown");

      if (error instanceof AxiosError && error.status === 409) {
        errorMessage = t("error.alreadyAddedAsFriend");
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
          error: t("error.unknown"),
        })
      );
    }
    dispatch(patchBackdrop({ loading: false }));
  };

  const cancelFriendRequest = async (friendRequest: FriendRequest) => {
    dispatch(setBackdrop({ loading: true }));
    try {
      await friendRequestService.deleteFriendRequest(friendRequest._id);
      dispatch(deleteFriendRequest(friendRequest));
    } catch (error) {
      console.error(error);
      dispatch(
        patchBackdrop({
          error: t("error.unknown"),
        })
      );
    }
    dispatch(patchBackdrop({ loading: false }));
  };

  const deleteFriend = async (friend: Friend) => {
    dispatch(setBackdrop({ loading: true }));
    try {
      await friendService.deleteFriend(friend._id);
      dispatch(deleteFriendAction(friend));
    } catch (error) {
      console.error(error);
      dispatch(
        patchBackdrop({
          error: t("error.unknown"),
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
