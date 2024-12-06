import { apiSlice } from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizByVideo: builder.query({
      query: (id) => ({
        url: `/quizzes?video_id_like=${id}`,
      }),
    }),
  }),
});

export const { useGetQuizByVideoQuery } = quizApi;
