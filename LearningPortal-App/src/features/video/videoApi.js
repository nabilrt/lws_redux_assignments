import { apiSlice } from "../api/apiSlice";

export const videoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: "/videos",
      }),
    }),
  }),
});

export const { useGetVideosQuery } = videoApi;
