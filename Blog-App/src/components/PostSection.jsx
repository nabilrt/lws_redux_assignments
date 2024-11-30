import { useDispatch } from "react-redux";
import { likeBlog, saveBlog } from "../features/blog/blogSlice";

export default function PostSection({ blog, isUpdating }) {
  const dispatch = useDispatch();
  const { id, title, image, tags, isSaved, likes, description } = blog;

  const handleLike = () => {
    dispatch(likeBlog({ id, likes }));
  };

  const handleSave = () => {
    dispatch(saveBlog({ id, isSaved }));
  };

  return (
    <>
      <main className="post">
        <img
          src={image}
          alt="githum"
          className="w-full rounded-md"
          id="lws-megaThumb"
        />
        <div>
          <h1 className="mt-6 text-2xl post-title" id="lws-singleTitle">
            {title}
          </h1>
          <div className="tags" id="lws-singleTags">
            {tags?.map((tg, index) => (
              <span key={index}>
                {tg}
                {index < tags.length - 1 && ","}
              </span>
            ))}
          </div>
          <div className="btn-group">
            {/* handle like on button click */}
            <button
              className="like-btn"
              id="lws-singleLinks"
              onClick={handleLike}
              disabled={isUpdating}
            >
              <i className="fa-regular fa-thumbs-up" /> {likes}
            </button>
            {/* handle save on button click */}
            {/* use ".active" class and "Saved" text  if a post is saved, other wise "Save" */}
            {isSaved ? (
              <button
                className="active save-btn"
                id="lws-singleSavedBtn"
                onClick={handleSave}
                disabled={isUpdating}
              >
                <i className="fa-regular fa-bookmark" /> Saved
              </button>
            ) : (
              <button
                className=" save-btn"
                id="lws-singleSavedBtn"
                onClick={handleSave}
                disabled={isUpdating}
              >
                <i className="fa-regular fa-bookmark" /> Save
              </button>
            )}
          </div>
          <div className="mt-6">
            <p>{description}</p>
          </div>
        </div>
      </main>
    </>
  );
}
