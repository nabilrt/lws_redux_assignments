import { apiSlice } from "../api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (projectString) => ({
        url: `/tasks?${projectString}`,
      }),
    }),
    getTask: builder.query({
      query: (id) => ({
        url: `/tasks/${id}`,
      }),
    }),
    addTask: builder.mutation({
      query: ({ data }) => ({
        url: `/tasks`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const task = await queryFulfilled;
          if (task?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getTasks",
                arg.projectString,
                (draft) => {
                  if (draft) {
                    draft.push(task?.data);
                  } else {
                    console.warn(`Task with id ${arg.id} not found in cache`);
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
    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getTasks",
                arg.projectString,
                (draft) => {
                  if (draft) {
                    return draft.map((dr) =>
                      dr.id === arg.id ? result?.data : dr
                    );
                  } else {
                    console.warn(`Task with id ${arg.id} not found in cache`);
                  }
                }
              )
            );
            dispatch(
              apiSlice.util.updateQueryData(
                "getTask",
                arg.id.toString(),
                (draft) => {
                  if (draft) {
                    Object.assign(draft, result?.data);
                  } else {
                    console.warn(
                      `Task with id ${arg.id} not found in getTask cache`
                    );
                  }
                }
              )
            );
          }
        } catch (error) {}
      },
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
  useAddTaskMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
} = taskApi;
