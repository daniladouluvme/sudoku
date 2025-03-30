import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BackdropState {
  loading?: boolean;
  message?: string;
  error?: string;
}

const initialState: BackdropState = {};

const backdropSlice = createSlice({
  name: "backdrop",
  initialState,
  reducers: {
    setBackdrop: (_, action: PayloadAction<BackdropState>) => action.payload,
    patchBackdrop: (state, action: PayloadAction<BackdropState>) => ({
      ...state,
      ...action.payload,
    }),
    clearBackdrop: () => ({}),
  },
});

export default backdropSlice.reducer;
export const { setBackdrop, clearBackdrop, patchBackdrop } =
  backdropSlice.actions;
