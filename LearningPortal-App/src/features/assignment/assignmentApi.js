import { apiSlice } from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => ({
        url: `/assignments`,
      }),
    }),
    getAssignment: builder.query({
      query: (id) => ({
        url: `/assignments/${id}`,
      }),
    }),
    getAssignmentByVideo: builder.query({
      query: (id) => ({
        url: `/assignments?video_id_like=${id}`,
      }),
    }),
    createAssignment: builder.mutation({
      query: ({ data }) => ({
        url: `/assignments`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const assignment = await queryFulfilled;
          if (assignment?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignments",
                undefined,
                (draft) => {
                  if (draft) {
                    draft.push(assignment?.data);
                  } else {
                    // console.warn(`Task with id ${arg.id} not found in cache`);
                  }
                }
              )
            );

            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentByVideo",
                arg.data.video_id,
                (draft) => {
                  console.log("here");
                  if (draft) {
                    draft.push(assignment?.data);
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
    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const assignment = await queryFulfilled;
          if (assignment?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignments",
                undefined,
                (draft) => {
                  if (draft) {
                    return draft.map((dr) =>
                      dr.id === Number(arg.id) ? assignment?.data : dr
                    );
                  } else {
                    // console.warn(`Task with id ${arg.id} not found in cache`);
                  }
                }
              )
            );

            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignment",
                arg.id.toString(),
                (draft) => {
                  if (draft) {
                    Object.assign(draft, assignment?.data);
                  } else {
                    console.warn(
                      `Task with id ${arg.id} not found in getQuizMarks cache`
                    );
                  }
                }
              )
            );

            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentByVideo",
                arg.data.video_id,
                (draft) => {
                  if (draft) {
                    return draft.map((dr) =>
                      dr.id === Number(arg.id) ? assignment?.data : dr
                    );
                  } else {
                    console.log(
                      `Task with id ${arg.data.video_id} not found in cache`
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
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const pathResult = dispatch(
          apiSlice.util.updateQueryData(
            "getAssignments",
            undefined,
            (draft) => {
              if (draft) {
                return draft.filter((dr) => dr.id !== arg);
              } else {
                console.warn(`Task with id ${arg.id} not found in cache`);
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          pathResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAssignmentByVideoQuery,
  useGetAssignmentsQuery,
  useGetAssignmentQuery,
  useCreateAssignmentMutation,
  useEditAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentApi;
