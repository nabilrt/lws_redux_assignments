import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBlogs } from "./blogsAPI";

const initialState = {
  isLoading: false,
  isError: false,
  blogs: [],
  error: "",
};

export const fetchAllBlogs = createAsyncThunk(
  "blogs/fetchAllBlogs",
  async ({ sortOption, filterOption }) => {
    const blogs = await getBlogs(sortOption, filterOption);
    return blogs;
  }
);

const blogsSlice = createSlice({
  initialState,
  name: "blogs",
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.pending, (state, action) => {
        state.isError = false;
        state.error = "";
        state.isLoading = true;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.blogs = [];
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default blogsSlice.reducer;
