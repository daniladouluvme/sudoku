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
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  logger: boolean;
  debug: boolean;
}

interface IAppConfig {
  origings: string[];
  jwtSecretKey: string;
  server: IServerConfig;
  database: IDatabaseConfig;
  email: IEmailConfig;
}

export default config as IAppConfig & IConfig;
