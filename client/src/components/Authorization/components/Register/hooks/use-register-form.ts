import { useForm } from "react-hook-form";
import { IRegisterForm } from "../models/register-form.model";

export const useRegisterForm = useForm<IRegisterForm>;