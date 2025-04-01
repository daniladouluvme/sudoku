import { useAppSelector } from "@hooks";
import { User } from "@model/user.model";
import { CancelFriendRequestButton } from "./components/CancelFriendRequestButton";
import { FriendRequestButton } from "./components/FriendRequestButton";
import { AddFriendButton } from "./components/AddFriendButton";
import { DeclineFriendRequestButton } from "./components/DeclineFriendRequestButton";
import { DeleteFriendButton } from "./components/DeleteFriendButton";

interface Props {
  user: User;
}

export const FriendButtons = ({ user }: Props) => {
  const currentUser = useAppSelector((s) => s.user);
  const friends = useAppSelector((s) => s.friends);
  const friendRequests = useAppSelector((s) => s.friendRequests);

  if (!user || !currentUser || user._id === currentUser._id) return <></>;

  const friend = friends.find(
    (f) =>
      (f.friendOne === user._id && f.friendTwo === currentUser._id) ||
      (f.friendOne === currentUser._id && f.friendTwo === user._id)
  );

  if (friend) {
    return <DeleteFriendButton friend={friend} />;
  }

  const friendRequest = friendRequests.find(
    (fr) =>
      (fr.from === user._id && fr.to === currentUser._id) ||
      (fr.from === currentUser._id && fr.to === user._id)
  );

  if (
    !friendRequest ||
    (friendRequest?.from === user._id && friendRequest?.declined)
  ) {
    return <FriendRequestButton currentUser={currentUser} user={user} />;
  }

  if (friendRequest.to === user._id) {
    return <CancelFriendRequestButton friendRequest={friendRequest} />;
  }

  if (friendRequest.from === user._id) {
    return (
      <>
        <AddFriendButton friendRequest={friendRequest} />
        <DeclineFriendRequestButton friendRequest={friendRequest} />
      </>
    );
  }
};
