import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import { useEffect } from "react";
import { fetchAllBlogs } from "../features/blogs/blogsSlice";
import Loader from "./Loader";

export default function PostList() {
  const blogData = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const { isLoading, isError, error, blogs } = blogData;

  const filters = useSelector((state) => state.filter);

  const { sortOption: sort, filterOption: filter } = filters;

  useEffect(() => {
    dispatch(fetchAllBlogs(filters));
  }, [dispatch, sort, filter]);

  return (
    <main className="post-container" id="lws-postContainer">
      {isLoading && <Loader />}
      {!isLoading && isError && <div className="text-red-500">{error}</div>}
      {!isLoading && !isError && blogs.length === 0 && "No Blogs Available!"}
      {blogs?.map((blog) => {
        return <PostCard blog={blog} key={blog.id} />;
      })}
    </main>
  );
}
