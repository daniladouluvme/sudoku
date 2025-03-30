import { createCrudRouter } from "./create-crud-router";
import { Friend } from "@dbmodel/friend.model";

export const friendRouter = () => {
  const router = createCrudRouter(Friend, {
    get: true,
    post: true,
    delete: true,
  });

  return router;
};
