import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import filterReducer from "./filter/filterSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
