import { Friend } from "@dbmodel/friend.model";
import { createCrudRouter } from "../create-crud-router";
import { verifyToken } from "../../../database/utils/verify-token";
import { getUserId } from "../../../utils/get-user-id";

export const friendRouter = () => {
  const router = createCrudRouter(Friend, { delete: true });

  router.post("/:friendTwoId", verifyToken, async (req, res): Promise<any> => {
    try {
      const friendOneId = getUserId(req.cookies);
      const { friendTwoId } = req.params;
      const friendRequest = await Friend.findOne({
        $or: [
          { friendOne: friendOneId, friendTwo: friendTwoId },
          { friendOne: friendTwoId, friendTwo: friendOneId },
        ],
      });
      if (friendRequest) return res.status(409).send();
      const result = await Friend.create({
        friendOne: friendOneId,
        friendTwo: friendTwoId,
      });
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  });

  return router;
};
