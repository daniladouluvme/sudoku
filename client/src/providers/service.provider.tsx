import { ServiceContext } from "@context/service.context";
import { AuthorizationService } from "@service/authorization.service";
import { FriendRequestService } from "@service/friend-request.service";
import { FriendService } from "@service/friend.service";
import { GameRequestService } from "@service/game-request.service";
import { GameService } from "@service/game.service";
import { SocketService } from "@service/socket.service";
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
      gameRequestService: new GameRequestService(),
      socketService: new SocketService(),
    }}
  >
    {children}
  </ServiceContext.Provider>
);
