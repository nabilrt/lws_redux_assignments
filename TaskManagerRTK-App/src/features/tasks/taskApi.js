import { apiSlice } from "../api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (projectString) => ({
        url: `/tasks?${projectString}`,
      }),
    }),
  }),
});

export const { useGetTasksQuery } = taskApi;
