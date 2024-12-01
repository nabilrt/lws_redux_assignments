import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteJob, getJobs, createJob, updateJob } from "./jobsAPI";
const initialState = {
  isLoading: false,
  isError: false,
  jobs: [],
  error: "",
};

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async ({ type }) => {
    const jobs = await getJobs(type);
    return jobs;
  }
);
export const removeJob = createAsyncThunk("jobs/removeJob", async (id) => {
  const jobs = await deleteJob(id);
  return jobs;
});

export const insertJob = createAsyncThunk("job/insertJob", async (data) => {
  const job = await createJob(data);
  return job;
});

export const modifyJob = createAsyncThunk(
  "job/modifyJob",
  async ({ id, data }) => {
    const job = await updateJob(id, data);
    return job;
  }
);
const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isError = false;
        state.error = "";
        state.isLoading = true;
        state.jobs = [];
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.jobs = [];
        state.isError = true;
        state.error = action.error.message;
      });

    builder
      .addCase(removeJob.pending, (state) => {
        state.isError = false;
        state.error = "";
        state.isLoading = true;
      })
      .addCase(removeJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = state.jobs.filter((job) => job.id !== action.meta.arg);
      })
      .addCase(removeJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });

    builder
      .addCase(insertJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(insertJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.jobs.push(action.payload);
      })
      .addCase(insertJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = action.error.message;
      });

    builder
      .addCase(modifyJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(modifyJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        const indexToUpdate = state.jobs.findIndex(
          (job) => job.id === action.payload.id
        );
        state.jobs[indexToUpdate] = action.payload;
      })
      .addCase(modifyJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = action.error.message;
      });
  },
});

export default jobsSlice.reducer;
