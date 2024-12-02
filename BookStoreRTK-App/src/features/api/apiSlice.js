import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  tagTypes: ["BookList", "Book"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/books",
      keepUnusedDataFor: 200,
      providesTags: ["BookList"],
    }),
    getBook: builder.query({
      query: (id) => `books/${id}`,
      providesTags: (result, error, arg) => [{ type: "Book", id: arg }],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BookList"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "BookList",
        {
          type: "Book",
          id: arg.id,
        },
      ],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BookList"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useAddBookMutation,
  useGetBookQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = apiSlice;
