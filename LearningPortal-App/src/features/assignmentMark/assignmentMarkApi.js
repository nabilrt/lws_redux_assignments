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
  }),
});

export const {
  useGetAssignmentMarksByVideoQuery,
  useGetAllAssignmentMarksQuery,
} = assignmentMarksApi;
