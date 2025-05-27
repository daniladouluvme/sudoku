import { Game } from "@model/game.model";
import { joinRequestParams } from "@utils/join-request-params";
import axios from "axios";

export class GameService {
  protected url = "/api/users/games";
  constructor() {}

  public async createUnauthorizedGame(difficulty?: number): Promise<Game> {
    return await axios
      .get(`api/games/create${joinRequestParams({ difficulty })}`)
      .then((res) => res.data);
  }

  public async getUserGames(): Promise<Game[]> {
    return await axios.get(this.url).then((res) => res.data);
  }

  public async createGame(difficulty?: number): Promise<Game> {
    return await axios
      .post(`${this.url}${joinRequestParams({ difficulty })}`)
      .then((res) => res.data);
  }

  public async getGame(id: string): Promise<Game> {
    return await axios.get(`${this.url}/${id}`).then((res) => res.data);
  }
}
