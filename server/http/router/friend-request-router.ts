import { FriendRequest } from "@dbmodel/friend-request.model";
import { createCrudRouter } from "./create-crud-router";

export const friendRequestRouter = () => {
  const router = createCrudRouter(FriendRequest, {
    get: true,
    post: true,
    patch: true,
    delete: true,
  });

  return router;
};
