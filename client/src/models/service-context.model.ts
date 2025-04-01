import { AuthorizationService } from "@service/authorization.service";
import { FriendRequestService } from "@service/friend-request.service";
import { FriendService } from "@service/friend.service";
import { GameService } from "@service/game.service";
import { UserService } from "@service/user.serivce";

export interface ServiceContext {
  userService: UserService;
  authorizationService: AuthorizationService;
  friendRequestService: FriendRequestService;
  friendService: FriendService;
  gameService: GameService;
}
