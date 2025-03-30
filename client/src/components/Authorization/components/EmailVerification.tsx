import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { handleFieldError } from "../utils/handle-field-error";
import { useParams } from "react-router";
import { IEmailVerificationForm } from "../models/email-verification-form.model";
import { useAppDispatch } from "@hooks/state";
import { setUser } from "@state/slice/user.slice";
import { useEmailVerificationForm } from "../hooks/use-email-verification-form";
import { clearBackdrop, setBackdrop } from "@state/slice/backdrop.slice";
import { useService } from "@hooks/use-service";

export const EmailVerification = () => {
  const { authorizationService } = useService();
  const dispatch = useAppDispatch();
  const { userId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useEmailVerificationForm({
    mode: "onChange",
  });

  const handleVerify = (data: IEmailVerificationForm) => {
    dispatch(setBackdrop({ loading: true }));
    authorizationService
      .verifyEmail({ userId, code: data.code })
      .then((user) => {
        dispatch(setUser(user));
        dispatch(clearBackdrop());
      })
      .catch((error) => {
        console.error(error);
        dispatch(
          setBackdrop({
            error: "An unknown error occurred during verification",
          })
        );
      });
  };

  return (
    <form onSubmit={handleSubmit(handleVerify)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "0.5rem",
        }}
      >
        <Divider>
          <Typography variant="h5">Email verification</Typography>
        </Divider>
        <TextField
          label="Code"
          {...register("code", {
            required: "Code required",
          })}
          {...handleFieldError("code", errors)}
          variant="outlined"
        />
        <Button type="submit" variant="outlined" sx={{ alignSelf: "flex-end" }}>
          Verify
        </Button>
      </Box>
    </form>
  );
};
