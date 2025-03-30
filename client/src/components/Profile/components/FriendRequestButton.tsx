import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { User } from "@model/user.model";
import { IconButton, Tooltip } from "@mui/material";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { addFriendRequest } from "@state/slice/friend-request.slice";
import { patchBackdrop, setBackdrop } from "@state/slice/backdrop.slice";
import { FriendRequest } from "@model/friend-request.model";
import { addFriend } from "@state/slice/friend.slice";
import { useService } from "@hooks/use-service";

interface Props {
  user: User;
  currentUser: User;
}

export const FriendRequestButton = ({ user, currentUser }: Props) => {
  const { friendService, friendRequestService } = useService();
  const dispatch = useDispatch();

  const handleClick = async () => {
    dispatch(setBackdrop({ loading: true }));

    try {
      const friendRequest = await friendRequestService.sendFriendRequest(
        currentUser._id,
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

          const friend = await friendService.addFriend(
            friendRequest.from,
            friendRequest.to
          );

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

  return (
    <Tooltip title="Friend request">
      <IconButton size="medium" onClick={handleClick}>
        <PersonAddIcon />
      </IconButton>
    </Tooltip>
  );
};
