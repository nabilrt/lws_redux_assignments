import { apiSlice } from "../api/apiSlice";

export const videoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: "/videos",
      }),
    }),
    getVideo: builder.query({
      query: (id) => ({
        url: `/videos/${id}`,
      }),
    }),
    submitVideo: builder.mutation({
      query: ({ data }) => ({
        url: `/videos`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const video = await queryFulfilled;
          if (video?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                if (draft) {
                  draft.push(video?.data);
                }
              })
            );
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
    updateVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const video = await queryFulfilled;
          if (video?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                if (draft) {
                  return draft.map((dr) =>
                    dr.id === Number(arg.id) ? video?.data : dr
                  );
                } else {
                  console.warn(`Task with id ${arg.id} not found in cache`);
                }
              })
            );
            dispatch(
              apiSlice.util.updateQueryData(
                "getVideo",
                arg.id.toString(),
                (draft) => {
                  if (draft) {
                    Object.assign(draft, video?.data);
                  } else {
                    console.warn(
                      `Task with id ${arg.id} not found in getTask cache`
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
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const pathResult = dispatch(
          apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
            if (draft) {
              return draft.filter((dr) => dr.id !== arg);
            } else {
              console.warn(`Task with id ${arg.id} not found in cache`);
            }
          })
        );
        try {
          const video = await queryFulfilled;
        } catch (error) {
          pathResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetVideosQuery,
  useSubmitVideoMutation,
  useGetVideoQuery,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} = videoApi;
