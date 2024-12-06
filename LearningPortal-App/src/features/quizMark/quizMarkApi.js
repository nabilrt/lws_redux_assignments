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
    submitQuiz: builder.mutation({
      query: ({ data }) => ({
        url: `/quizMark`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const quizMark = await queryFulfilled;
          if (quizMark?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAllQuizMarks",
                undefined,
                (draft) => {
                  if (draft) {
                    draft.push(quizMark?.data);
                  } else {
                    // console.warn(`Task with id ${arg.id} not found in cache`);
                  }
                }
              )
            );
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizMarksByVideo",
                {
                  videoId: arg.data.video_id,
                  studentId: arg.data.student_id,
                },
                (draft) => {
                  if (draft) {
                    draft.push(quizMark?.data);
                  } else {
                    console.warn(
                      `Task with id ${arg.id} not found in getQuizMarks cache`
                    );
                  }
                }
              )
            );
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useGetQuizMarksByVideoQuery,
  useGetAllQuizMarksQuery,
  useSubmitQuizMutation,
} = quizMarksApi;
