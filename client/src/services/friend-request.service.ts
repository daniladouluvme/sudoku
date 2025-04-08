import axios from "axios";
import { ApiService } from "./api.service";
import { FriendRequest } from "@model/friend-request.model";
import { User } from "@model/user.model";

export class FriendRequestService extends ApiService<FriendRequest> {
  constructor() {
    super("/api/friendRequests");
  }

  public async getUserFriendRequests(): Promise<FriendRequest[]> {
    return await axios.get(`/api/users/friendRequests`).then((res) => res.data);
  }

  public async sendFriendRequest(toId: User["_id"]): Promise<FriendRequest> {
    return await axios.post(`/api/users/${toId}`).then((res) => res.data);
  }
}
