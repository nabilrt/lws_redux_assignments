import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterType: "all",
  searchKey: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filterType = action.payload;
    },
    changeSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { changeFilter, changeSearchKey } = filterSlice.actions;
