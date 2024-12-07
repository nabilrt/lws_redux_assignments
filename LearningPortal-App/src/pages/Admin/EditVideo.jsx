import { useNavigate, useParams } from "react-router-dom";
import {
  useGetVideoQuery,
  useSubmitVideoMutation,
  useUpdateVideoMutation,
} from "../../features/video/videoApi";

export default function EditVideo() {
  const { id } = useParams();
  const { data: video, isLoading, isError, error } = useGetVideoQuery(id);
  const [
    updateVideo,
    {
      isLoading: isVideoUpdating,
      isError: isVideoUpdateError,
      error: videoError,
    },
  ] = useUpdateVideoMutation();

  let navigate = useNavigate();

  const handleVideoSubmit = (formData) => {
    updateVideo({
      id,
      data: {
        title: formData.get("title"),
        description: formData.get("description"),
        url: formData.get("url"),
        views: formData.get("views"),
        duration: formData.get("duration"),
        createdAt: video?.createdAt,
      },
    })
      .then(() => {
        navigate("/admin/videos");
      })
      .catch(() => {
        console.error("Couldn't Update Video");
      });
  };
  let content = null;
  if (isLoading) {
    content = <div className="text-green-500">Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div className="text-red-500">{error}</div>;
  } else if (!isLoading && !isError && !video?.id) {
    content = <div className="text-blue-500">No Video Found!</div>;
  } else if (!isLoading && !isError && video?.id) {
    content = (
      <form className="flex flex-col gap-4 mt-4" action={handleVideoSubmit}>
        <div>
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required=""
            defaultValue={video?.title}
            className="login-input rounded-t-md"
            placeholder="Video Title"
          />
        </div>
        <div>
          <label htmlFor="description" className="sr-only">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            required=""
            defaultValue={video?.description}
            className="login-input rounded-t-md"
            placeholder="Video Description"
          />
        </div>
        <div>
          <label htmlFor="url" className="sr-only">
            Link
          </label>
          <input
            id="url"
            name="url"
            type="text"
            required=""
            defaultValue={video?.url}
            className="login-input rounded-t-md"
            placeholder="Video URL"
          />
        </div>
        <div>
          <label htmlFor="views" className="sr-only">
            Views
          </label>
          <input
            id="views"
            name="views"
            type="text"
            defaultValue={video?.views}
            required=""
            className="login-input rounded-t-md"
            placeholder="Number of Views"
          />
        </div>
        <div>
          <label htmlFor="duration" className="sr-only">
            Duration
          </label>
          <input
            id="duration"
            name="duration"
            type="text"
            defaultValue={video?.duration}
            required=""
            className="login-input rounded-t-md"
            placeholder="Video Duration"
          />
        </div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          disabled={isVideoUpdating}
        >
          Update Video
        </button>
        {isVideoUpdateError && (
          <div
            className="px-4 py-2 flex flex-col"
            style={{
              color: "white",
              backgroundColor: "red",
            }}
          >
            {videoError}
          </div>
        )}
      </form>
    );
  }
  return (
    <div
      className="flex flex-col "
      style={{
        width: "80%",
        margin: "auto",
      }}
    >
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        Edit Video
      </h1>
      {content}
    </div>
  );
}
