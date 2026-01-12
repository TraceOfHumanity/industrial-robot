import { configureStore } from "@reduxjs/toolkit";
import industrialRobotReducer from "./features/industrial-robot";

export const store = configureStore({
  reducer: {
    industrialRobot: industrialRobotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
