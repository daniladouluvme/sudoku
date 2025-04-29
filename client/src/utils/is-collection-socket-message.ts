import { CollectionSocketMessage } from "@model/collection-socket-message.model";

export function isCollectionSocketMessage(
  object: any
): object is CollectionSocketMessage<any> {
  if (!object.hasOwnProperty("collection")) return false;
  if (!["CREATE", "UPDATE", "DELETE"].includes(object?.type)) return false;
  return true;
}
