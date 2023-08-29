import { createSlice } from "@reduxjs/toolkit";

export const suppliersSlice = createSlice({
  name: "suppliers",
  initialState: {
    value: [],
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = suppliersSlice.actions;

export default suppliersSlice.reducer;
