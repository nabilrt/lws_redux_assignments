import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRelatedBlogs } from "./relatedBlogsAPI";

const initialState = {
  isLoading: false,
  isError: false,
  relatedBlogs: [],
  error: "",
};

export const fetchRelatedBlogs = createAsyncThunk(
  "relatedBlogs/fetchRelatedBlogs",
  async ({ id, tags }) => {
    const relatedBlogs = await getRelatedBlogs(id, tags);
    return relatedBlogs;
  }
);

const relatedBlogsSlice = createSlice({
  initialState,
  name: "relatedBlogs",
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedBlogs.pending, (state, action) => {
        state.isError = false;
        state.error = "";
        state.isLoading = true;
      })
      .addCase(fetchRelatedBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.relatedBlogs = action.payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchRelatedBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.relatedBlogs = [];
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default relatedBlogsSlice.reducer;
