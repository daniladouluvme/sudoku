import { CollectionSocketMessage } from "@model/collection-socket-message.model";
import { Friend } from "@model/friend.model";
import { isCollectionSocketMessage } from "./is-collection-socket-message";

export function isFriendSocketMessage(
  object: any
): object is CollectionSocketMessage<Friend> {
  if (!isCollectionSocketMessage(object)) return false;
  if (object.collection !== "FRIEND_COLLECTION") return false;

  return true;
}
