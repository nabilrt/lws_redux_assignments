import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  projectList: [],
  searchKey: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projectList.push(action.payload);
    },
    removeProject: (state, action) => {
      const removedIndex = state.projectList.indexOf(action.payload);
      state.projectList.splice(removedIndex, 1);
    },
    searchBy: (state, action) => {
      state.searchKey = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { addProject, removeProject, searchBy } = filterSlice.actions;
