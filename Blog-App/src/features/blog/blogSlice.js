import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBlog, likeTheBlog, saveTheBlog } from "./blogAPI";

const initialState = {
  isLoading: false,
  isError: false,
  isUpdating: false,
  blog: {},
  error: "",
};

export const fetchBlog = createAsyncThunk("blog/fetchBlog", async (id) => {
  const blog = await getBlog(id);
  return blog;
});

export const likeBlog = createAsyncThunk(
  "blog/likeBlog",
  async ({ id, likes }) => {
    const updatedBlog = await likeTheBlog(id, likes);
    return updatedBlog;
  }
);

export const saveBlog = createAsyncThunk(
  "blog/saveBlog",
  async ({ id, isSaved }) => {
    const updatedBlog = await saveTheBlog(id, isSaved);
    return updatedBlog;
  }
);

const blogSlice = createSlice({
  initialState,
  name: "blog",
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlog.pending, (state, action) => {
        state.blog = {};
        state.isError = false;
        state.error = "";
        state.isLoading = true;
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blog = action.payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.blog = {};
        state.isError = true;
        state.error = action.error.message;
      });

    builder
      .addCase(saveBlog.pending, (state, action) => {
        state.isError = false;
        state.error = "";
        state.isLoading = true;
        state.isUpdating = true;
      })
      .addCase(saveBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blog = action.payload;
        state.isError = false;
        state.isUpdating = false;
        state.error = "";
      })
      .addCase(saveBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.blog = {};
        state.isError = true;
        state.isUpdating = false;
        state.error = action.error.message;
      });

    builder
      .addCase(likeBlog.pending, (state, action) => {
        state.isError = false;
        state.error = "";
        state.isLoading = true;
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blog = action.payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(likeBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.blog = {};
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
