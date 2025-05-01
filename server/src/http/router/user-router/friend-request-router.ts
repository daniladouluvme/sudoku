import { FriendRequest } from "@dbmodel/friend-request.model";
import { createCrudRouter } from "../create-crud-router";
import { verifyToken } from "../../../database/utils/verify-token";
import { getUserId } from "../../../utils/get-user-id";
import { sendSocketMessage } from "../../utils/send-socket-message";
import { FRIEND_REQUEST_COLLECTION } from "../../collections/friend-request";
import type { InferSchemaType } from "mongoose";

export const friendRequestRouter = () => {
  const router = createCrudRouter(FriendRequest, {
    patch: {
      requestHandlers: [verifyToken],
      resultHadlers: [
        (req, data: InferSchemaType<typeof FriendRequest.schema>) => {
          const userId = getUserId(req.cookies);
          const clientId = data.from.equals(userId) ? data.to : data.from;
          const ws = req.wss.clients
            .entries()
            .find(([_, id]) => clientId.equals(id))?.[0];
          if (ws) {
            sendSocketMessage(ws, {
              collection: FRIEND_REQUEST_COLLECTION,
              type: "UPDATE",
              data: data,
            });
          }
        },
      ],
    },
    delete: {
      requestHandlers: [verifyToken],
      resultHadlers: [
        (req, data: InferSchemaType<typeof FriendRequest.schema>) => {
          const userId = getUserId(req.cookies);
          const clientId = data.from.equals(userId) ? data.to : data.from;
          const ws = req.wss.clients
            .entries()
            .find(([_, id]) => clientId.equals(id))?.[0];
          if (ws) {
            sendSocketMessage(ws, {
              collection: FRIEND_REQUEST_COLLECTION,
              type: "DELETE",
              data: data,
            });
          }
        },
      ],
    },
  });

  router.get("/", verifyToken, async (req, res): Promise<any> => {
    try {
      const userId = getUserId(req.cookies);
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
      const from = getUserId(req.cookies);
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

      const ws = req.wss.clients.entries().find(([_, id]) => id === to)?.[0];
      if (ws) {
        sendSocketMessage(ws, {
          collection: FRIEND_REQUEST_COLLECTION,
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
