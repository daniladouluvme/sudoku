import axios from "axios";
import { ApiService } from "./api.service";
import { FriendRequest } from "@model/friend-request.model";
import { User } from "@model/user.model";

export class FriendRequestService extends ApiService<FriendRequest> {
  protected url = "/api/users/friendRequests/";

  constructor() {
    super("/api/friendRequests");
  }

  public async getUserFriendRequests(): Promise<FriendRequest[]> {
    return await axios.get(this.url).then((res) => res.data);
  }

  public async sendFriendRequest(toId: User["_id"]): Promise<FriendRequest> {
    return await axios.post(`${this.url}${toId}`).then((res) => res.data);
  }

  public async deleteFriendRequest(
    id: FriendRequest["_id"]
  ): Promise<FriendRequest> {
    return await axios.delete(`${this.url}${id}`).then((res) => res.data);
  }

  public async declineFriendRequest(
    id: FriendRequest["_id"],
    body: Pick<FriendRequest, "declined">
  ): Promise<FriendRequest> {
    return await axios.patch(`${this.url}${id}`, body).then((res) => res.data);
  }
}
