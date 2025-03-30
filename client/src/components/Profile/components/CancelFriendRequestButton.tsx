import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useAppDispatch } from "@hooks/state";
import { useService } from "@hooks/use-service";
import { FriendRequest } from "@model/friend-request.model";
import { IconButton, Tooltip } from "@mui/material";
import { patchBackdrop, setBackdrop } from "@state/slice/backdrop.slice";
import { deleteFriendRequest } from "@state/slice/friend-request.slice";

interface Props {
  friendRequest: FriendRequest;
}

export const CancelFriendRequestButton = ({ friendRequest }: Props) => {
  const { friendRequestService } = useService();
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    dispatch(setBackdrop({ loading: true }));
    const id = friendRequest._id;
    try {
      await friendRequestService.delete(id);
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

  return (
    <Tooltip title="Cancel friend request">
      <IconButton size="medium" onClick={handleClick}>
        <PersonRemoveIcon />
      </IconButton>
    </Tooltip>
  );
};
