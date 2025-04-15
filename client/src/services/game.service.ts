import { Game } from "@model/game.model";
import axios from "axios";

export class GameService {
  protected url = "/api/users/games";
  constructor() {}

  public async createUnauthorizedGame(): Promise<Game> {
    return await axios.get("api/games/create").then((res) => res.data);
  }

  public async getUserGames(): Promise<Game[]> {
    return await axios.get(this.url).then((res) => res.data);
  }

  public async createGame(): Promise<Game> {
    return await axios.post(this.url).then((res) => res.data);
  }

  public async getGame(id: string): Promise<Game> {
    return await axios.get(`${this.url}/${id}`).then((res) => res.data);
  }
}
