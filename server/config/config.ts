import config, { type IConfig } from "config";

interface IDatabaseConfig {
  host: string;
  user: string;
  password: string;
}

interface IServerConfig {
  port: number;
}

interface IEmailConfig {
  service: string;
  user: string;
  pass: string;
}

interface IAppConfig {
  origings: string[];
  jwtSecretKey: string;
  server: IServerConfig;
  database: IDatabaseConfig;
  email: IEmailConfig;
}
123
export default config as IAppConfig & IConfig;
