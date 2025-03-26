import config, { type IConfig } from "config";

interface IDatabaseConfig {
  host: string;
  user: string;
  password: string;
}

interface IServerConfig {
  port: number;
}

interface IAppConfig {
  origings: string[];
  server: IServerConfig;
  database: IDatabaseConfig;
}

export default config as IAppConfig & IConfig;
