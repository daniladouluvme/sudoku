import { Friend } from "@model/friend.modle";
import { ApiService } from "./api.service";
import axios from "axios";
import { User } from "@model/user.model";

export class FriendService extends ApiService<Friend> {
  constructor() {
    super("/api/friends");
  }

  public async getUserFriends(userId: string): Promise<Friend[]> {
    return await axios
      .get(`/api/users/${userId}/friends`)
      .then((res) => res.data);
  }

  public async addFriend(
    friendOneId: User["_id"],
    friendTwoId: User["_id"]
  ): Promise<Friend> {
    return await axios
      .post(`/api/users/${friendOneId}/friends/${friendTwoId}`)
      .then((res) => res.data);
  }
}
