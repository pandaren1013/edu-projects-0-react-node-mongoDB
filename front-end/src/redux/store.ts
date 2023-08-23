import { configureStore } from "@reduxjs/toolkit";
import avatarReducer from "./avatarSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    avatarReducer,
    userReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;