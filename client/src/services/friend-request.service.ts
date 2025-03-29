import { ApiService } from "./api.service";
import { FriendRequest } from "@model/friend-request.model";

export class UserService extends ApiService<FriendRequest> {
  constructor() {
    super("/api/friendRequests");
  }
}
