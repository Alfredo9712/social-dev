import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user.slice";
export const store = configureStore({
  reducer: {
    auth: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
//example useDispatch<AppDispatch>()
export type AppDispatch = typeof store.dispatch;
