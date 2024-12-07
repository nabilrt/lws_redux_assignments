import { useParams } from "react-router-dom";
import { useGetAssignmentByVideoQuery } from "../../features/assignment/assignmentApi";
import {
  useGetAssignmentMarksByVideoQuery,
  useSubmitAssignmentMutation,
} from "../../features/assignmentMark/assignmentMarkApi";
import { useSelector } from "react-redux";

export default function AssignmentPage() {
  const { id, assignmentId } = useParams();
  const {
    data: assignment,
    isLoading,
    isError,
    error,
  } = useGetAssignmentByVideoQuery(id);
  const user = useSelector((state) => state.auth.user);
  const {
    data: assignmentMarks,
    isLoading: isAssignmentMarksLoading,
    isError: isAssignmentMarksError,
  } = useGetAssignmentMarksByVideoQuery({
    assignmentId: assignmentId,
    studentId: user?.id,
  });
  const [
    submitAssignment,
    {
      isLoading: isAssignmentSubmitting,
      isError: isAssignmentSubmitError,
      error: assignmentSubmitError,
    },
  ] = useSubmitAssignmentMutation();
  const handleForm = (formData) => {
    submitAssignment({
      data: {
        repo_link: formData.get("repo_link"),
        createdAt: new Date().toISOString(),
        mark: 0,
        status: "pending",
        totalMark: assignment[0]?.totalMark,
        title: assignment[0]?.title,
        student_id: user?.id,
        student_name: user?.name,
        assignment_id: assignment[0]?.id,
      },
    }).then(() => {});
  };

  let content = null;
  if (
    !isAssignmentMarksLoading &&
    !isAssignmentMarksError &&
    assignmentMarks?.length > 0
  ) {
    content = (
      <div
        className="px-4 py-2 flex flex-col gap-4 w-1/2"
        style={{ width: "50%", margin: "auto" }}
      >
        <h1 className="text-xl">
          Assignment Title : {assignmentMarks[0]?.title}
        </h1>
        <h1 className="text-xl">
          Total Marks : {assignmentMarks[0]?.totalMark}
        </h1>
        <h1 className="text-xl">
          Repository Link : {assignmentMarks[0]?.repo_link}
        </h1>
        {assignmentMarks[0]?.status !== "published" ? (
          <h1 className="text-xl">Haven't Graded Yet!</h1>
        ) : (
          <h1 className="text-xl">Marks : {assignmentMarks[0]?.mark}</h1>
        )}
      </div>
    );
  } else {
    if (isLoading) {
      content = <div className="text-green-500">Loading...</div>;
    } else if (!isLoading && isError) {
      content = <div className="text-red-500">{error}</div>;
    } else if (!isLoading && !isError && assignment.length === 0) {
      content = <div className="text-blue-500">No Assignment Found!</div>;
    } else if (!isLoading && !isError && assignment.length > 0) {
      content = (
        <div
          className="px-4 py-6 flex flex-col gap-4"
          style={{ width: "50%", margin: "auto" }}
        >
          <h1 className="text-xl">
            Assignment For : "{assignment[0]?.video_title}"
          </h1>
          <h1 className="text-xl">Total Marks : {assignment[0]?.totalMark}</h1>
          <form action={handleForm}>
            <label htmlFor="repo_link" className="sr-only">
              GitHub Repository Link
            </label>
            <input
              id="name"
              name="repo_link"
              type="name"
              autoComplete="name"
              required=""
              className="login-input rounded-t-md mb-2"
              placeholder="Github Repository Link"
            />
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 mt-4"
              disabled={isAssignmentSubmitting}
            >
              Submit Assignment
            </button>
            {isAssignmentSubmitError && (
              <div
                className="px-4 py-2"
                style={{
                  color: "white",
                  backgroundColor: "red",
                }}
              >
                {assignmentSubmitError}
              </div>
            )}
          </form>
        </div>
      );
    }
  }

  return content;
}
