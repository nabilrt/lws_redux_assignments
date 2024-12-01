import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getJob } from "./jobAPI";
const initialState = {
  isLoading: false,
  isError: false,
  job: {},
  error: "",
};

export const fetchJob = createAsyncThunk("job/fetchJob", async (id) => {
  const job = await getJob(id);
  return job;
});

const jobsSlice = createSlice({
  name: "job",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchJob.pending, (state) => {
        state.isError = false;
        state.error = "";
        state.isLoading = true;
      })
      .addCase(fetchJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.job = action.payload;
      })
      .addCase(fetchJob.rejected, (state, action) => {
        state.isLoading = false;
        state.job = {};
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default jobsSlice.reducer;
