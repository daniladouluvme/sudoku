import { ServiceContext } from "@context/service.context";
import { AuthorizationService } from "@service/authorization.service";
import { FriendRequestService } from "@service/friend-request.service";
import { FriendService } from "@service/friend.service";
import { GameService } from "@service/game.service";
import { UserService } from "@service/user.serivce";
import { ReactNode } from "react";

export const ServiceProvider = ({ children }: { children: ReactNode }) => (
  <ServiceContext.Provider
    value={{
      userService: new UserService(),
      authorizationService: new AuthorizationService(),
      friendService: new FriendService(),
      friendRequestService: new FriendRequestService(),
      gameService: new GameService(),
    }}
  >
    {children}
  </ServiceContext.Provider>
);
