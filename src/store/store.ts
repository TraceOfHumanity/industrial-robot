import { configureStore } from "@reduxjs/toolkit";
import industrialRobotSlice from "./features/industrial-robot";
import interfaceSlice from "./features/interface";

export const store = configureStore({
  reducer: {
    industrialRobotSlice,
    interfaceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
