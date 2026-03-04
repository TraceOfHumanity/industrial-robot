import type { IndustrialRobotAnimation } from "@/types/bot-animation.types";
import type { EndEffector } from "@/types/end-effector.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type IndustrialRobotState = {
  animation: IndustrialRobotAnimation;
  endEffector: EndEffector;
};

const initialState: IndustrialRobotState = {
  animation: "draw-line",
  endEffector: "welding-torch",
};

const industrialRobotSlice = createSlice({
  name: "industrial-robot",
  initialState,
  reducers: {
    setAnimation: (state: IndustrialRobotState, action: PayloadAction<IndustrialRobotAnimation>) => {
      state.animation = action.payload;
    },
    setEndEffector: (state: IndustrialRobotState, action: PayloadAction<EndEffector>) => {
      state.endEffector = action.payload;
    },
  },
});

export const { setAnimation, setEndEffector } = industrialRobotSlice.actions;
export default industrialRobotSlice.reducer;
