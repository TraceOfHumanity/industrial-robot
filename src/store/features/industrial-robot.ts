import type { IndustrialRobotAnimation } from "@/types/robot-animation.types";
import { DEFAULT_ANIMATION_BY_END_EFFECTOR } from "@/types/robot-animation.types";
import type { EndEffector } from "@/types/end-effector.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RobotColor } from "@/types/robot-color.types";

type IndustrialRobotState = {
  endEffector: EndEffector;
  selectedAnimation: IndustrialRobotAnimation;
  selectedColor: RobotColor;
};
const initialState: IndustrialRobotState = {
  endEffector: "welding-torch",
  selectedAnimation: "linear-seam",
  selectedColor: "white",
};

const industrialRobotSlice = createSlice({
  name: "industrial-robot",
  initialState,
  reducers: {
    setAnimation: (state: IndustrialRobotState, action: PayloadAction<IndustrialRobotAnimation>) => {
      state.selectedAnimation = action.payload as IndustrialRobotState["selectedAnimation"];
    },
    setEndEffector: (state: IndustrialRobotState, action: PayloadAction<EndEffector>) => {
      state.endEffector = action.payload;
      state.selectedAnimation = DEFAULT_ANIMATION_BY_END_EFFECTOR[action.payload];
    },
  },
});

export const { setAnimation, setEndEffector } = industrialRobotSlice.actions;
export default industrialRobotSlice.reducer;
