import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  sortBy: "",
  type: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addType: (state, action) => {
      state.type.push(action.payload);
    },
    removeType: (state, action) => {
      const removedIndex = state.type.indexOf(action.payload);
      state.type.splice(removedIndex, 1);
    },
    clearType: (state) => {
      state.type = [];
    },
    sortMethod: (state, action) => {
      state.sortBy = action.payload;
    },
    searchKey: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { addType, removeType, clearType, searchKey, sortMethod } =
  filterSlice.actions;
