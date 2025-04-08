import { FriendRequest } from "@dbmodel/friend-request.model";
import { createCrudRouter } from "./create-crud-router";
import { verifyToken } from "../../database/utils/verify-token";
import { getUserId } from "../utils/get-user-id";

export const friendRequestRouter = () => {
  const router = createCrudRouter(FriendRequest, { patch: true, delete: true });

  router.get("/", verifyToken, async (req, res): Promise<any> => {
    try {
      const userId = getUserId(req);
      const friendRequests = await FriendRequest.find({
        $or: [{ from: userId }, { to: userId }],
      });
      res.send(friendRequests);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  });

  router.post("/:to", verifyToken, async (req, res): Promise<any> => {
    try {
      const { to } = req.params;
      const from = getUserId(req);
      const friendRequest = await FriendRequest.findOne({
        $or: [
          { from, to },
          { from, to },
        ],
      });
      if (friendRequest) return res.status(409).send(friendRequest);
      const result = await FriendRequest.create({
        from,
        to,
        declined: false,
      });
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  });

  return router;
};
