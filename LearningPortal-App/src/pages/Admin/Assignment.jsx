import { Link } from "react-router-dom";
import {
  useDeleteAssignmentMutation,
  useGetAssignmentsQuery,
} from "../../features/assignment/assignmentApi";

export default function AdminAssignmentPage() {
  const {
    data: assignments,
    isLoading,
    isError,
    error,
  } = useGetAssignmentsQuery();
  const [
    deleteAssignment,
    { isLoading: isDeleteLoading, isError: isDeleteError, error: deleteError },
  ] = useDeleteAssignmentMutation();
  let content = null;
  if (isLoading) {
    content = (
      <tr>
        <td colSpan="3" className="table-td text-green-500 text-center">
          Loading...
        </td>
      </tr>
    );
  } else if (!isLoading && isError) {
    content = (
      <tr>
        <td colSpan="3" className="table-td text-red-500 text-center">
          {error}
        </td>
      </tr>
    );
  } else if (!isLoading && !isError && assignments.length === 0) {
    content = (
      <tr>
        <td colSpan="3" className="table-td text-blue-500 text-center">
          No Assignments Found!
        </td>
      </tr>
    );
  } else if (!isLoading && !isError && assignments.length > 0) {
    content = assignments?.map((ass) => {
      return (
        <tr key={ass.id}>
          <td className="table-td">{ass.title}</td>
          <td className="table-td">{ass.video_title}</td>
          <td className="table-td">{ass.totalMark}</td>
          <td className="table-td flex gap-x-2">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all"
              onClick={() => deleteAssignment(ass.id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            <Link to={"/admin/assignment/" + ass.id}>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </Link>
          </td>
        </tr>
      );
    });
  }
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <div className="w-full flex">
            <Link to="/admin/assignment/add" className="btn ml-auto">
              Add Assignment
            </Link>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">Title</th>
                  <th className="table-th">Video Title</th>
                  <th className="table-th">Mark</th>
                  <th className="table-th">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-600/50">{content}</tbody>
            </table>
          </div>
        </div>
      </div>
      {isDeleteError && (
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
            padding: "12px",
            backgroundColor: "red",
            color: "white",
          }}
        >
          {deleteError}
        </div>
      )}
    </section>
  );
}
