import { ServiceContext } from "@context/service.context";
import { useContext } from "react";

export const useService = () => useContext(ServiceContext);
