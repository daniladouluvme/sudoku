import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = true;

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (_, action: PayloadAction<boolean>) => action.payload,
  },
});

export default loadingSlice.reducer;
export const { setLoading } = loadingSlice.actions;
