import { createSlice } from "@reduxjs/toolkit";

export const businessLogicSlice = createSlice({
  name: "businessLogic",
  initialState: {
    value: null,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = businessLogicSlice.actions;

export default businessLogicSlice.reducer;
