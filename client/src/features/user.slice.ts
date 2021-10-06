import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface User {
  name: string;
  email: string;
  _id: string;
}
interface UserState {
  data: {
    user: User[];
    isAuthenticated: boolean;
  };
}
const initialState: UserState = {
  data: {
    user: [],
    isAuthenticated: false,
  },
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.data.user.push(action.payload);
      state.data.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.data.user = [];
      state.data.isAuthenticated = false;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
