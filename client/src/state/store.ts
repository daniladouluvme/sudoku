import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user-slice";
import loadingReducer from "./slice/loading.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
