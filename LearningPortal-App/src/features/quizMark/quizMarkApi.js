import { apiSlice } from "../api/apiSlice";

export const quizMarksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMarksByVideo: builder.query({
      query: ({ videoId, studentId }) => ({
        url: `/quizMark?video_id_like=${videoId}&student_id_like=${studentId}`,
      }),
    }),
    getAllQuizMarks: builder.query({
      query: () => ({
        url: `/quizMark`,
      }),
    }),
  }),
});

export const { useGetQuizMarksByVideoQuery, useGetAllQuizMarksQuery } =
  quizMarksApi;
