import { useNavigate, useParams } from "react-router-dom";
import { useGetVideosQuery } from "../../features/video/videoApi";
import {
  useCreateAssignmentMutation,
  useEditAssignmentMutation,
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
} from "../../features/assignment/assignmentApi";

export default function EditAssignmentPage() {
  const { id } = useParams();
  const { data: assignments } = useGetAssignmentsQuery();
  const { data: videos } = useGetVideosQuery();
  const [
    editAssignment,
    {
      isLoading: isAssignmentEditing,
      isError: isAssignmentSubmitError,
      error: assignmentError,
    },
  ] = useEditAssignmentMutation();
  const {
    data: assignment,
    isLoading,
    isError,
    error,
  } = useGetAssignmentQuery(id);
  let navigate = useNavigate();

  const assignmentIds = assignments?.map((ass) => assignment?.video_id);
  const filteredVideos = videos?.filter((v) => assignmentIds.includes(v.id));

  const handleAssignmentSubmit = (formData) => {
    editAssignment({
      id,
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

  let content = null;
  if (isLoading) {
    content = <div className="text-green-500">Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div className="text-red-500">{error}</div>;
  } else if (!isLoading && !isError && !assignment?.id) {
    content = <div className="text-blue-500">No Assignment Found!</div>;
  } else if (!isLoading && !isError && assignment?.id) {
    content = (
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
            defaultValue={assignment?.title}
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
            defaultValue={assignment?.video_id}
          >
            {filteredVideos?.map((fil) => {
              return <option value={fil.id}>{fil.title}</option>;
            })}
          </select>
        </div>
        <div>
          <label htmlFor="title" className="sr-only">
            Total Marks
          </label>
          <input
            id="title"
            name="totalMark"
            type="number"
            required=""
            className="login-input rounded-t-md"
            placeholder="Total Marks"
            defaultValue={assignment?.totalMark}
          />
        </div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          disabled={isAssignmentEditing}
        >
          Update Assignment
        </button>
        {isAssignmentSubmitError && (
          <div
            className="px-4 py-2 flex flex-col"
            style={{
              color: "white",
              backgroundColor: "red",
            }}
          >
            {assignmentError}
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
        Edit Assignment
      </h1>
      {content}
    </div>
  );
}
