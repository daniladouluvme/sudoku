import { useAppSelector } from "@hooks/state";
import { FriendRequest } from "@model/friend-request.model";

export const useProfileFriendRequests = (userId: string): FriendRequest[] => {
  const currentUser = useAppSelector((s) => s.user);
  const friendRequests = useAppSelector((s) => s.friendRequests);
  return currentUser._id === userId ? friendRequests : [];
};
