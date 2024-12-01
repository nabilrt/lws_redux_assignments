import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./jobs/jobsSlice";
import filterReducer from "./filter/filterSlice";
import jobReducer from "./job/jobSlice";
const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    filter: filterReducer,
    job: jobReducer,
  },
});

export default store;
