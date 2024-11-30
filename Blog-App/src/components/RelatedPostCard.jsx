import { Link } from "react-router-dom";
export default function RelatedPostCard({ blog }) {
  const { id, image, title, tags, createdAt } = blog;
  return (
    <div className="card">
      <Link to={"/blog/" + id}>
        <img src={image} className="card-image" alt="" />
      </Link>
      <div className="p-4">
        <Link
          to={"/blog/" + id}
          className="text-lg post-title lws-RelatedPostTitle"
        >
          {title}
        </Link>
        <div className="mb-0 tags">
          {tags?.map((tg, index) => (
            <span key={index}>
              {tg}
              {index < tags.length - 1 && ","}
            </span>
          ))}
        </div>
        <p>{createdAt}</p>
      </div>
    </div>
  );
}
