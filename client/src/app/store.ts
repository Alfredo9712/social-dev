import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user.slice";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
//example useDispatch<AppDispatch>()
export type AppDispatch = typeof store.dispatch;
