import type { IndustrialRobotAnimation } from "@/types/robot-animation.types";
import { DEFAULT_ANIMATION_BY_END_EFFECTOR } from "@/types/robot-animation.types";
import type { EndEffector } from "@/types/end-effector.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RobotColor } from "@/types/robot-color.types";

type IndustrialRobotState = {
  endEffector: EndEffector;
  robotAnimation: IndustrialRobotAnimation;
  robotColor: RobotColor;
};
const initialState: IndustrialRobotState = {
  endEffector: "TWO_FINGER_GRIPPER",
  robotAnimation: "stack-items-on-pallet",
  robotColor: "white",
};

const industrialRobotSlice = createSlice({
  name: "industrial-robot",
  initialState,
  reducers: {
    setRobotAnimation: (state: IndustrialRobotState, action: PayloadAction<IndustrialRobotAnimation>) => {
      state.robotAnimation = action.payload as IndustrialRobotState["robotAnimation"];
    },
    setEndEffector: (state: IndustrialRobotState, action: PayloadAction<EndEffector>) => {
      state.endEffector = action.payload;
      state.robotAnimation = DEFAULT_ANIMATION_BY_END_EFFECTOR[action.payload];
    },
    setRobotColor: (state: IndustrialRobotState, action: PayloadAction<RobotColor>) => {
      state.robotColor = action.payload;
    },
  },
});

export const { setRobotAnimation, setEndEffector, setRobotColor } = industrialRobotSlice.actions;
export default industrialRobotSlice.reducer;
