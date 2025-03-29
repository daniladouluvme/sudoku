import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { handleFieldError } from "../utils/handle-field-error";
import { useNavigate, useParams } from "react-router";
import { IEmailVerificationForm } from "../models/email-verification-form.model";
import { useState } from "react";
import { SimpleBackdrop } from "@components/shared";
import { AuthorizationService } from "@service/authorization.service";
import { useAppDispatch } from "@hooks/state";
import { setUser } from "@state/slice/user-slice";
import { useEmailVerificationForm } from "../hooks/use-email-verification-form";

export const EmailVerification = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const [backdropState, setBackdropState] = useState<{
    loading?: boolean;
    error?: string;
  }>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useEmailVerificationForm({
    mode: "onChange",
  });

  const handleVerify = (data: IEmailVerificationForm) => {
    setBackdropState({ loading: true });
    new AuthorizationService()
      .verifyEmail({ userId, code: data.code })
      .then((user) => {
        dispatch(setUser(user));
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        let errorMessage = "An unknown error occurred during verification";

        setBackdropState(() => ({ error: errorMessage, loading: false }));
      });
  };

  return (
    <>
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
          <Button
            type="submit"
            variant="outlined"
            sx={{ alignSelf: "flex-end" }}
          >
            Verify
          </Button>
        </Box>
      </form>
      <SimpleBackdrop
        {...backdropState}
        open={backdropState.loading || !!backdropState.error}
        close={() => setBackdropState({})}
      />
    </>
  );
};
