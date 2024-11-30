import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortOption: "",
  filterOption: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    sortBy: (state, action) => {
      state.sortOption = action.payload;
    },
    filterBy: (state, action) => {
      state.filterOption = action.payload;
    },
    removeFilter: (state, action) => {
      state.filterOption = "";
    },
  },
});
export const { sortBy, filterBy, removeFilter } = filterSlice.actions;

export default filterSlice.reducer;
