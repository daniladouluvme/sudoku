import { User } from "@model/user.model";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthorizationService } from "@service/authorization.service";

export const logout = createAsyncThunk("posts/logout", async () => {
  await new AuthorizationService().logout();
});

const initialState: User = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<User>) => action.payload,
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, () => null)
      .addCase(logout.rejected, (_, action) => {
        console.error(action.error);
        return null;
      });
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
