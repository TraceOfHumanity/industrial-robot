import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  animation: "idle",
};

const industrialRobotSlice = createSlice({
  name: "industrialRobot",
  initialState,
  reducers: {
    setAnimation: (state, action) => {
      state.animation = action.payload;
    },
  },
});

export const { setAnimation } = industrialRobotSlice.actions;
export default industrialRobotSlice.reducer;
