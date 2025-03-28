import axios from "axios";

export class AuthorizationService {
  public register({
    login,
    email,
    password,
  }: {
    login: string;
    email: string;
    password: string;
  }): Promise<any> {
    return axios.post("/api/users/register", {
      login,
      email,
      password,
    });
  }
}
