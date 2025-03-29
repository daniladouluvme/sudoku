import { User } from "@model/user.model";
import axios, { AxiosResponse } from "axios";

export class AuthorizationService {
  public async register({
    login,
    email,
    password,
  }: {
    login: string;
    email: string;
    password: string;
  }): Promise<User> {
    return axios
      .post("/api/users/register", {
        login,
        email,
        password,
      })
      .then((res) => res.data);
  }

  public async verifyEmail({
    userId,
    code,
  }: {
    userId: string;
    code: string;
  }): Promise<User> {
    return axios
      .post("/api/users/verifyEmail", {
        userId,
        code,
      })
      .then((res) => res.data);
  }

  public async login({
    login,
    password,
  }: {
    login: string;
    password: string;
  }): Promise<User> {
    return axios
      .post("/api/users/login", {
        login,
        password,
      })
      .then((res) => res.data);
  }

  public async verify(): Promise<User> {
    return axios.post("/api/users/verify").then((res) => res.data);
  }

  public async logout(): Promise<AxiosResponse> {
    return axios.post("/api/users/logout");
  }
}
