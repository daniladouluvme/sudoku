import { User } from "@model/user.model";
import { Game } from "@model/game.model";
import axios from "axios";
import { GameRequest } from "@model/game-request.model";

export class GameRequestService {
  constructor() {}

  public async getGameGameRequests(game: Game["_id"]): Promise<GameRequest[]> {
    return await axios
      .get(`/api/users/games/${game}/gameRequests/`)
      .then((res) => res.data);
  }

  public async sendGameRequest(
    user: User["_id"],
    game: Game["_id"]
  ): Promise<GameRequest> {
    return await axios
      .post("/api/users/gameRequests/", { user, game })
      .then((res) => res.data);
  }

  public async cancelGameRequest(id: GameRequest["_id"]): Promise<GameRequest> {
    return await axios
      .delete(`/api/users/gameRequests/${id}`)
      .then((res) => res.data);
  }
}
