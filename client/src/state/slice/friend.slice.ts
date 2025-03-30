import { Friend } from "@model/friend.modle";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Friend[] = [];

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setFriends: (_, action: PayloadAction<Friend[]>) => action.payload,
    addFriend: (state, action: PayloadAction<Friend>) => {
      state.push(action.payload);
    },
    deleteFriend: (state, action: PayloadAction<string>) =>
      state.filter((fr) => fr._id !== action.payload),
  },
});

export default friendSlice.reducer;
export const { setFriends, addFriend, deleteFriend } = friendSlice.actions;
