import { apiSlice } from "../api/apiSlice";

export const assignmentMarksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMarksByVideo: builder.query({
      query: ({ assignmentId, studentId }) => ({
        url: `/assignmentMark?assignment_id_like=${assignmentId}&student_id_like=${studentId}`,
      }),
    }),
    getAllAssignmentMarks: builder.query({
      query: () => ({
        url: `/assignmentMark`,
      }),
    }),
    submitAssignment: builder.mutation({
      query: ({ data }) => ({
        url: `/assignmentMark`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const assignmentMark = await queryFulfilled;
          if (assignmentMark?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAllAssignmentMarks",
                undefined,
                (draft) => {
                  if (draft) {
                    draft.push(assignmentMark?.data);
                  } else {
                    // console.warn(`Task with id ${arg.id} not found in cache`);
                  }
                }
              )
            );

            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentMarksByVideo",
                {
                  assignmentId: arg.data.assignment_id.toString(),
                  studentId: arg.data.student_id,
                },
                (draft) => {
                  console.log("here");
                  if (draft) {
                    console.log(draft);
                    draft.push(assignmentMark?.data);
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
  useGetAssignmentMarksByVideoQuery,
  useGetAllAssignmentMarksQuery,
  useSubmitAssignmentMutation,
} = assignmentMarksApi;
