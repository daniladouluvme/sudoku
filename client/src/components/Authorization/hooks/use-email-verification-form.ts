import { useForm } from "react-hook-form";
import { IEmailVerificationForm } from "../models/email-verification-form.model";

export const useEmailVerificationForm = useForm<IEmailVerificationForm>;
