import type { AnimationByEndEffector, IndustrialRobotAnimation } from "@/types/bot-animation.types";
import { DEFAULT_ANIMATION_BY_END_EFFECTOR } from "@/types/bot-animation.types";
import type { EndEffector } from "@/types/end-effector.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type IndustrialRobotState = {
  [K in EndEffector]: { endEffector: K; selectedAnimation: AnimationByEndEffector[K] };
}[EndEffector];

const initialState: IndustrialRobotState = {
  endEffector: "welding-torch",
  selectedAnimation: "linear-seam",
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
