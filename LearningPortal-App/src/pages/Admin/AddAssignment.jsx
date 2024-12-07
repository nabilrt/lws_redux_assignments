import { useNavigate } from "react-router-dom";
import {
  useGetVideosQuery,
} from "../../features/video/videoApi";
import {
  useCreateAssignmentMutation,
  useGetAssignmentsQuery,
} from "../../features/assignment/assignmentApi";

export default function AddAssignmentPage() {
  const { data: assignments } = useGetAssignmentsQuery();
  const { data: videos } = useGetVideosQuery();
  const [createAssignment, { isLoading, isError, error }] =
    useCreateAssignmentMutation();
  let navigate = useNavigate();

  const assignmentIds = assignments?.map((ass) => ass.video_id);
  const filteredVideos = videos?.filter((v) => !assignmentIds.includes(v.id));

  const handleAssignmentSubmit = (formData) => {
    createAssignment({
      data: {
        title: formData.get("title"),
        video_id: Number(formData.get("video_id")),
        video_title: videos?.filter(
          (v) => v.id === Number(formData.get("video_id"))
        )[0].title,
        totalMark: Number(formData.get("totalMark")),
      },
    })
      .then(() => {
        navigate("/admin/assignments");
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
        Add Assignment
      </h1>
      <form
        className="flex flex-col gap-4 mt-4"
        action={handleAssignmentSubmit}
      >
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
            placeholder="Assignment Title"
          />
        </div>

        <div className="flex flex-col gap-4">
          <select
            name="video_id"
            id=""
            className="login-input px-4 py-2"
            style={{
              width: "100%",
            }}
          >
            {filteredVideos?.map((fil) => {
              return <option value={fil.id}>{fil.title}</option>;
            })}
          </select>
          <small>
            N.B: If you do not see any video here, then assignment has been
            created for all videos!
          </small>
        </div>
        <div>
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            id="title"
            name="totalMark"
            type="number"
            required=""
            className="login-input rounded-t-md"
            placeholder="Total Marks"
          />
        </div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          disabled={isLoading}
        >
          Create Assignment
        </button>
        {isError && (
          <div
            className="px-4 py-2 flex flex-col"
            style={{
              color: "white",
              backgroundColor: "red",
            }}
          >
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
