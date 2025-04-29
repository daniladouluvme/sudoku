import { Friend } from "@model/friend.model";
import { ApiService } from "./api.service";
import axios from "axios";
import { User } from "@model/user.model";

export class FriendService extends ApiService<Friend> {
  constructor() {
    super("/api/friends");
  }

  public async getUserFriends(user: User["_id"]): Promise<Friend[]> {
    return await axios
      .get(`/api/users/${user}/friends`)
      .then((res) => res.data);
  }

  public async addFriend(friendTwoId: User["_id"]): Promise<Friend> {
    return await axios
      .post(`/api/users/friends/${friendTwoId}`)
      .then((res) => res.data);
  }

  public async deleteFriend(id: Friend["_id"]): Promise<Friend> {
    return await axios
      .delete(`/api/users/friends/${id}`)
      .then((res) => res.data);
  }
}
