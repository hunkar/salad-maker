import { createSlice } from "@reduxjs/toolkit";

export const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState: {
    value: [],
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;
