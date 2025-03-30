import { ServiceContext as IServiceContext } from "@model/service-context.model";
import { createContext } from "react";

export const ServiceContext = createContext<IServiceContext>(null);
