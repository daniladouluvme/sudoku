import { useForm } from "react-hook-form";
import { ILoginForm } from "../models/login-form.model";

export const useLoginForm = useForm<ILoginForm>;
