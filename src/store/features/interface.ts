import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type InterfaceState = {
    isOpen: boolean;
};

const initialState: InterfaceState = {
    isOpen:
        typeof window !== "undefined" && typeof window.matchMedia === "function"
            ? !window.matchMedia("(pointer: coarse)").matches
            : true,
};

const interfaceSlice = createSlice({
    name: "interface",
    initialState,
    reducers: {
        setIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
    },
});

export const { setIsOpen } = interfaceSlice.actions;
export default interfaceSlice.reducer;