import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Thought } from "../../../backend/interfaces/user";

interface User {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  thoughts?: Thought[];
}

interface UserState {
  user: User;
  isAuthenticated: boolean;
}
const initialState: UserState = {
  user: {},
  isAuthenticated: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = {};
      state.isAuthenticated = false;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
