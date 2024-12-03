import { useParams } from "react-router-dom";
import EditForm from "../components/EditForm";
import { useGetTaskQuery } from "../features/tasks/taskApi";

export default function EditTask() {
  const { id } = useParams();
  const { data: task, isLoading, isError, error } = useGetTaskQuery(id);
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div className="text-red-500">{error}</div>;
  } else if (!isLoading && !isError && !task?.id) {
    content = <div className="text-green-500">No Task Found with this id!</div>;
  } else if (!isLoading && !isError && task?.id) {
    content = <EditForm task={task} />;
  }
  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Edit Task
        </h1>
        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          {content}
        </div>
      </main>
    </div>
  );
}
