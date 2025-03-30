import axios from "axios";
import { ApiService } from "./api.service";
import { FriendRequest } from "@model/friend-request.model";
import { User } from "@model/user.model";

export class FriendRequestService extends ApiService<FriendRequest> {
  constructor() {
    super("/api/friendRequests");
  }

  public async getUserFriendRequests(userId: string): Promise<FriendRequest[]> {
    return await axios
      .get(`/api/users/${userId}/friendRequests`)
      .then((res) => res.data);
  }

  public async sendFriendRequest(
    fromId: User["_id"],
    toId: User["_id"]
  ): Promise<FriendRequest> {
    return await axios
      .post(`/api/users/${fromId}/friendRequests/${toId}`)
      .then((res) => res.data);
  }
}
