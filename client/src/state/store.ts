import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user.slice";
import loadingReducer from "./slice/loading.slice";
import backdropReducer from "./slice/backdrop.slice";
import friendRequestReducer from "./slice/friend-request.slice";
import friendReducer from "./slice/friend.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    backdrop: backdropReducer,
    friendRequests: friendRequestReducer,
    friends: friendReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
