import { Game } from "@model/game.model";
import { ApiService } from "./api.service";
import axios from "axios";

export class GameService extends ApiService<Game> {
  constructor() {
    super("/api/games");
  }

  public async getUserGames(userId: string): Promise<Game[]> {
    return await axios
      .get(`/api/users/${userId}/games`)
      .then((res) => res.data);
  }

  public async createGame(userId: string): Promise<Game> {
    return await axios
      .post(`/api/users/${userId}/games`)
      .then((res) => res.data);
  }
}
