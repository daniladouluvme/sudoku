import { Game } from "@model/game.model";
import { ApiService } from "./api.service";
import axios from "axios";

export class GameService extends ApiService<Game> {
  constructor() {
    super("/api/games");
  }

  public async getUserGames(): Promise<Game[]> {
    return await axios.get(`/api/users/games`).then((res) => res.data);
  }

  public async createGame(): Promise<Game> {
    return await axios.post(`/api/users/games`).then((res) => res.data);
  }
}
