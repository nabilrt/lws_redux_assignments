import { apiSlice } from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentByVideo: builder.query({
      query: (id) => ({
        url: `/assignments?video_id_like${id}`,
      }),
    }),
  }),
});

export const { useGetAssignmentByVideoQuery } = assignmentApi;
