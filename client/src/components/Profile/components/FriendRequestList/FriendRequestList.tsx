import { FriendRequest } from "@model/friend-request.model";
import { Box } from "@mui/material";
import { FriendRequestListItem } from "./components/FriendRequestListItem";

interface Props {
  friendRequests: FriendRequest[];
}

export const FriendRequestList = ({ friendRequests }: Props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0.5rem" }}>
      {friendRequests.map((fr) => (
        <FriendRequestListItem key={fr._id} friendRequest={fr} />
      ))}
    </Box>
  );
};
