import { useAppSelector } from "@hooks/state";
import { useService } from "@hooks/use-service";
import { Friend } from "@model/friend.modle";
import { useEffect, useState } from "react";

export const useProfileFriends = (userId: string): Friend[] => {
  const { friendService } = useService();
  const currentUser = useAppSelector((s) => s.user);
  const currentUserFriends = useAppSelector((s) => s.friends);
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    setFriends([]);
    friendService.getUserFriends().then(setFriends).catch(console.error);
  }, [userId]);

  return currentUser._id === userId ? currentUserFriends : friends;
};
