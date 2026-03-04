import type { IndustrialRobotAnimation } from "@/types/bot-animations.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type IndustrialRobotState = {
  animation: IndustrialRobotAnimation;
};

const initialState: IndustrialRobotState = {
  animation: "idle",
};

const industrialRobotSlice = createSlice({
  name: "industrial-robot",
  initialState,
  reducers: {
    setAnimation: (state: IndustrialRobotState, action: PayloadAction<IndustrialRobotAnimation>) => {
      state.animation = action.payload;
    },
  },
});

export const { setAnimation } = industrialRobotSlice.actions;
export default industrialRobotSlice.reducer;
