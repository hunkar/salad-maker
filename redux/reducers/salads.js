import { createSlice } from "@reduxjs/toolkit";

export const saladsSlice = createSlice({
  name: "salads",
  initialState: {
    value: [],
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    add: (state, action) => {
      state.value = action.payload;
      state.value = state.value.concat(action.payload);
    },
    deleteItem: (state, action) => {
      state.value = action.payload;
      state.value = state.value.filter((item) => item.id != action.payload.id);
    },
    update: (state, action) => {
      state.value = state.value.map((item) =>
        item.id == action.payload.id ? action.payload : item
      );
    },
  },
});

export const { set, add, deleteItem, update } = saladsSlice.actions;

export default saladsSlice.reducer;
