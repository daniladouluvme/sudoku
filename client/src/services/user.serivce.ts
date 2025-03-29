import { User } from "@model/user.model";
import { ApiService } from "./api.service";

export class UserService extends ApiService<User> {
  constructor() {
    super("/api/users");
  }
}
