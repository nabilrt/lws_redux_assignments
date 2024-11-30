import { Link, useParams } from "react-router-dom";
import PostSection from "../components/PostSection";
import RelatedPosts from "../components/RelatedPosts";
import { fetchBlog } from "../features/blog/blogSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loader from "../components/Loader";
export default function Blog() {
  const { id } = useParams();
  const blogData = useSelector((st) => st.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(fetchBlog(id));
  }, [dispatch, id]);

  const { isError, isLoading, blog, error, isUpdating } = blogData;

  return (
    <>
      <div className="container mt-8">
        <Link
          to="/"
          className="inline-block text-gray-600 home-btn"
          id="lws-goHome"
        >
          <i className="mr-2 fa-solid fa-house" />
          Go Home
        </Link>
      </div>

      {!isLoading && isError && <div className="text-red-500">{error}</div>}

      <section className="post-page-container">
        <PostSection blog={blog} isUpdating={isUpdating} />

        <RelatedPosts />
      </section>
    </>
  );
}
