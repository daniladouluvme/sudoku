import { createRestApiRouter } from "./create-rest-api-router";
import { Friend } from "@dbmodel/friend.model";

export const friendRouter = () => {
  const router = createRestApiRouter(Friend, {
    get: true,
    post: true,
    delete: true,
  });

  return router;
};
