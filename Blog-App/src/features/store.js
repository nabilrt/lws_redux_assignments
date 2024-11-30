import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./blogs/blogsSlice";
import filterReducer from "./filter/filterSlice";
import blogReducer from "./blog/blogSlice";
import relatedBlogsReducer from "./relatedBlogs/relatedBlogsSlice";

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    filter: filterReducer,
    blog: blogReducer,
    relatedBlogs: relatedBlogsReducer,
  },
});

export default store;
