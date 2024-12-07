import {
  useGetAllAssignmentMarksQuery,
  useUpdateAssignmentMarkMutation,
} from "../../features/assignmentMark/assignmentMarkApi";
import moment from "moment";
export default function AssignmentMarkPage() {
  const {
    data: assignmentMarks,
    isLoading,
    isError,
    error,
  } = useGetAllAssignmentMarksQuery();
  const [
    updateAssignmentMark,
    {
      isLoading: isUpdatingAssignmentMark,
      isError: isUpdatingAssignmentMarkError,
      error: assignmentMarkError,
    },
  ] = useUpdateAssignmentMarkMutation();
  const handleMarkSubmit = (formData, ass) => {
    console.log(formData.get("mark"));
    console.log(ass);
    updateAssignmentMark({
      id: ass.id,
      data: {
        ...ass,
        mark: formData.get("mark"),
        status: "published",
      },
    });
  };
  let content = null;
  if (isLoading) {
    content = <div className="text-green-500">Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div className="text-red-500">{error}</div>;
  } else if (!isLoading && !isError && assignmentMarks.length === 0) {
    content = (
      <div className="text-blue-500">No Assignment Submission Found!</div>
    );
  } else if (!isLoading && !isError && assignmentMarks.length > 0) {
    content = (
      <div className="px-3 py-20 bg-opacity-10">
        <ul className="assignment-status">
          <li>
            Total <span>{assignmentMarks?.length}</span>
          </li>
          <li>
            Pending{" "}
            <span>
              {
                assignmentMarks?.filter((ass) => ass.status === "pending")
                  .length
              }
            </span>
          </li>
          <li>
            Mark Sent{" "}
            <span>
              {
                assignmentMarks?.filter((ass) => ass.status === "published")
                  .length
              }
            </span>
          </li>
        </ul>
        <div className="overflow-x-auto mt-4">
          <table className="divide-y-1 text-base divide-gray-600 w-full">
            <thead>
              <tr>
                <th className="table-th">Assignment</th>
                <th className="table-th">Date</th>
                <th className="table-th">Student Name</th>
                <th className="table-th">Repo Link</th>
                <th className="table-th">Mark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-600/50">
              {assignmentMarks?.map((ass) => {
                return (
                  <tr key={ass.id}>
                    <td className="table-td">{ass.title}</td>
                    <td className="table-td">
                      {moment(ass.createdAt).format("DD MMM YYYY hh:mm:ss A")}
                    </td>
                    <td className="table-td">{ass?.student_name}</td>
                    <td className="table-td">{ass?.repo_link}</td>
                    {ass?.status === "pending" ? (
                      <td className="table-td input-mark ">
                        <form
                          action={(formData) => handleMarkSubmit(formData, ass)}
                          className="flex items-center justify-center gap-2"
                        >
                          <input name="mark" max={100} defaultValue={100} />
                          <button
                            type="submit"
                            disabled={isUpdatingAssignmentMark}
                          >
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          </button>
                        </form>
                      </td>
                    ) : (
                      <td className="table-td">{ass?.mark}</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">{content}</div>
      {isUpdatingAssignmentMarkError && (
        <div
          className="px-4 py-2 flex flex-col"
          style={{
            color: "white",
            backgroundColor: "red",
          }}
        >
          {assignmentMarkError}
        </div>
      )}
    </section>
  );
}
