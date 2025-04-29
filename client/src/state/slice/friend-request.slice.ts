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
      if (!state.some((fr) => fr._id === action.payload._id)) {
        state.push(action.payload);
      }
    },
    updateFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
      const i = state.findIndex((fr) => fr._id === action.payload._id);
      if (i !== -1) state[i] = action.payload;
    },
    deleteFriendRequest: (state, action: PayloadAction<FriendRequest>) =>
      state.filter((fr) => fr._id !== action.payload._id),
  },
});

export default friendRequestSlice.reducer;
export const {
  setFriendRequests,
  addFriendRequest,
  updateFriendRequest,
  deleteFriendRequest,
} = friendRequestSlice.actions;
