import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todoSlice";
import avatarReducer from "./avatarSlice";

export const store = configureStore({
  // reducer: todosReducer,
  reducer: avatarReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;