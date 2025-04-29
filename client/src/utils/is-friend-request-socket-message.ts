import { CollectionSocketMessage } from "@model/collection-socket-message.model";
import { FriendRequest } from "@model/friend-request.model";
import { isCollectionSocketMessage } from "./is-collection-socket-message";

export function isFriendRequestSocketMessage(
  object: any
): object is CollectionSocketMessage<FriendRequest> {
  if (!isCollectionSocketMessage(object)) return false;
  if (object.collection !== "FRIEND_REQUEST_COLLECTION") return false;
  return true;
}
