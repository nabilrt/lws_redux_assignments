import { Link } from "react-router-dom";

export default function PostCard({ blog }) {
  const { id, title, image, tags, isSaved, likes, createdAt } = blog;
  return (
    <div className="lws-card">
      <Link to={`/blog/${id}`}>
        <img src={image} className="lws-card-image" alt="" />
      </Link>
      <div className="p-4">
        <div className="lws-card-header">
          <p className="lws-publishedDate">{createdAt}</p>
          <p className="lws-likeCount">
            <i className="fa-regular fa-thumbs-up" />
            {likes}
          </p>
        </div>
        <Link to={`/blog/${id}`} className="lws-postTitle">
          {" "}
          {title}
        </Link>
        <div className="lws-tags">
          {tags?.map((tg, index) => (
            <span key={index}>
              {tg}
              {index < tags.length - 1 && ","}
            </span>
          ))}
        </div>
        {/* Show this element if post is saved */}
        {isSaved && (
          <div className="flex gap-2 mt-4">
            <span className="lws-badge"> Saved </span>
          </div>
        )}

        {/* Show this element if post is saved Ends */}
      </div>
    </div>
  );
}
