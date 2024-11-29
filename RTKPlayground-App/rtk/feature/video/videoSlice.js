const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

const initialState = {
  loading: false,
  videos: null,
  error: "",
};

const fetchInitialVideos = createAsyncThunk("videos/fetchVideos", async () => {
  const response = await fetch("http://localhost:9000/videos");
  const videos = await response.json();
  return videos;
});

const fetchTaggedVideos = createAsyncThunk(
  "videos/fetchTaggedVideos",
  async (tagString) => {
    const response = await fetch(`http://localhost:9000/videos?${tagString}`);
    const videos = await response.json();
    return videos;
  }
);

const parseViews = (viewString) => {
  if (viewString.endsWith("k")) {
    return parseFloat(viewString) * 1000;
  }
  if (viewString.endsWith("M")) {
    return parseFloat(viewString) * 1000000;
  }
  return parseFloat(viewString);
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchInitialVideos.pending, (state, action) => {
      state.loading = true;
      state.error = "";
      state.videos = {};
    });
    builder.addCase(fetchInitialVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.videos = action.payload;
      state.error = "";
    });
    builder.addCase(fetchInitialVideos.rejected, (state, action) => {
      state.loading = false;
      state.videos = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchTaggedVideos.pending, (state, action) => {
      state.loading = true;
      state.error = "";
      state.videos = [];
    });
    builder.addCase(fetchTaggedVideos.fulfilled, (state, action) => {
      state.loading = false;
      const sortedVideos = action.payload.sort(
        (a, b) => parseViews(b.views) - parseViews(a.views)
      );
      state.videos = sortedVideos;
      state.error = "";
    });
    builder.addCase(fetchTaggedVideos.rejected, (state, action) => {
      state.loading = false;
      state.videos = [];
      state.error = action.error.message;
    });
  },
});

module.exports = videoSlice.reducer;
module.exports.fetchInitialVideos = fetchInitialVideos;
module.exports.fetchTaggedVideos = fetchTaggedVideos;
