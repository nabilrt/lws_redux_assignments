import { apiSlice } from "../api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (projectString) => ({
        url: `/tasks?${projectString}`,
      }),
    }),
    updateTaskStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const pathResult = dispatch(
          apiSlice.util.updateQueryData(
            "getTasks",
            arg.projectString,
            (draft) => {
              if (draft) {
                const updateAbleTask = draft.find((c) => c.id == arg.id);
                updateAbleTask.status = arg.data.status;
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
    deleteTask: builder.mutation({
      query: ({ id }) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const pathResult = dispatch(
          apiSlice.util.updateQueryData(
            "getTasks",
            arg.projectString,
            (draft) => {
              return draft.filter((dt) => dt.id !== arg.id);
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
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
} = taskApi;
