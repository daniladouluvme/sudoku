import { Friend } from "@dbmodel/friend.model";
import { createCrudRouter } from "../create-crud-router";
import { verifyToken } from "../../../database/utils/verify-token";
import { getUserId } from "../../../utils/get-user-id";
import { sendSocketMessage } from "../../utils/send-socket-message";
import { FRIEND_COLLECTION } from "../../collections/friend";
import type { InferSchemaType } from "mongoose";

export const friendRouter = () => {
  const router = createCrudRouter(Friend, {
    delete: {
      requestHandlers: [verifyToken],
      resultHadlers: [
        (req, data: InferSchemaType<typeof Friend.schema>) => {
          const userId = getUserId(req.cookies);
          const clientId = data.friendOne.equals(userId)
            ? data.friendTwo
            : data.friendOne;
          const ws = req.wss.clients
            .entries()
            .find(([_, id]) => clientId.equals(id))?.[0];
          if (ws) {
            sendSocketMessage(ws, {
              collection: FRIEND_COLLECTION,
              type: "DELETE",
              data: data,
            });
          }
        },
      ],
    },
  });

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

      const ws = req.wss.clients
        .entries()
        .find(([_, id]) => id === friendTwoId)?.[0];
      if (ws) {
        sendSocketMessage(ws, {
          collection: FRIEND_COLLECTION,
          type: "CREATE",
          data: result,
        });
      }

      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  });

  return router;
};
