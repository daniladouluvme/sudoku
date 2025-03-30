import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { FriendRequest } from "@model/friend-request.model";
import { IconButton, Tooltip } from "@mui/material";
import { useService } from "@hooks/use-service";
import { useAppDispatch } from "@hooks/state";
import { patchBackdrop, setBackdrop } from "@state/slice/backdrop.slice";
import { deleteFriendRequest } from "@state/slice/friend-request.slice";
import { addFriend } from "@state/slice/friend.slice";
import { AxiosError } from "axios";

interface Props {
  friendRequest: FriendRequest;
}

export const AddFriendButton = ({ friendRequest }: Props) => {
  const { friendService, friendRequestService } = useService();
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    const { from, to } = friendRequest;

    dispatch(setBackdrop({ loading: true }));

    try {
      await friendRequestService.delete(friendRequest._id);

      dispatch(deleteFriendRequest(friendRequest._id));
    } catch (error) {
      console.error(error);
    }

    try {
      const friend = await friendService.addFriend(from, to);

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

  return (
    <Tooltip title="Accept friend request">
      <IconButton size="medium" onClick={handleClick}>
        <PersonAddIcon />
      </IconButton>
    </Tooltip>
  );
};
