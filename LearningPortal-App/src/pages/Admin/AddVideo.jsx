import { useNavigate } from "react-router-dom";
import { useSubmitVideoMutation } from "../../features/video/videoApi";

export default function AddVideo() {
  const [submitVideo, { isLoading, isError, error }] = useSubmitVideoMutation();
  let navigate = useNavigate();

  const handleVideoSubmit = (formData) => {
    submitVideo({
      data: {
        title: formData.get("title"),
        description: formData.get("description"),
        url: formData.get("url"),
        views: formData.get("views"),
        duration: formData.get("duration"),
        createdAt: new Date().toISOString(),
      },
    })
      .then(() => {
        navigate("/admin/videos");
      })
      .catch(() => {
        console.error("Couldn't");
      });
  };
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
        Add Video
      </h1>
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
            required=""
            className="login-input rounded-t-md"
            placeholder="Number of Views"
          />
        </div>
        <div>
          <label htmlFor="duration" className="sr-only">
            Title
          </label>
          <input
            id="duration"
            name="duration"
            type="text"
            required=""
            className="login-input rounded-t-md"
            placeholder="Video Duration"
          />
        </div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          disabled={isLoading}
        >
          Submit Video
        </button>
        {isError && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
}
