import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import filterReducer from "./filter/filterSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
