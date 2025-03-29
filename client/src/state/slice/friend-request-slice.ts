import { FriendRequest } from "@model/friend-request.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FriendRequest[] = [];

const friendRequestSlice = createSlice({
  name: "friendRequest",
  initialState,
  reducers: {
    setFriendRequests: (_, action: PayloadAction<FriendRequest[]>) =>
      action.payload,
    addFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
      state.push(action.payload);
    },
    declineFriendRequest: (state, action: PayloadAction<string>) => {
      const frienRequest = state.find((fr) => fr._id === action.payload);
      frienRequest.declined = true;
    },
    removeFriendRequest: (state, action: PayloadAction<string>) =>
      state.filter((fr) => fr._id !== action.payload),
  },
});

export default friendRequestSlice.reducer;
export const { setFriendRequests } = friendRequestSlice.actions;
