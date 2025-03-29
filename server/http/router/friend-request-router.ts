import { FriendRequest } from "@dbmodel/friend-request.model";
import { createRestApiRouter } from "./create-rest-api-router";

export const friendRequestRouter = () => {
  const router = createRestApiRouter(FriendRequest, {
    get: true,
    post: true,
    patch: true,
    delete: true,
  });

  return router;
};
