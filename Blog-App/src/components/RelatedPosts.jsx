import { Link } from "react-router-dom";
import RelatedPostCard from "./RelatedPostCard";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useEffect } from "react";
import { fetchRelatedBlogs } from "../features/relatedBlogs/relatedBlogsSlice";
export default function RelatedPosts() {
  const blogData = useSelector((st) => st.blog);
  const relatedBlogsData = useSelector((st) => st.relatedBlogs);
  const dispatch = useDispatch();

  const { blog } = blogData;

  const { id, tags } = blog;

  useEffect(() => {
    dispatch(fetchRelatedBlogs({ id, tags }));
  }, [dispatch, id, tags]);

  const { isError, isLoading, relatedBlogs, error } = relatedBlogsData;

  return (
    <aside>
      <h4 className="mb-4 text-xl font-medium" id="lws-relatedPosts">
        Related Posts
      </h4>
      <div className="space-y-4 related-post-container">
        {isLoading && <Loader />}
        {!isLoading && isError && <div className="text-red-500">{error}</div>}
        {!isLoading &&
          !isError &&
          !blog?.title &&
          "No Related Blogs Available!"}
        {/* related post  */}
        {relatedBlogs?.map((rb) => {
          return <RelatedPostCard blog={rb} key={rb.id} />;
        })}
      </div>
    </aside>
  );
}
