import { Link } from "react-router-dom";
import Task from "./Task";
import { useGetTasksQuery } from "../features/tasks/taskApi";
import { useSelector } from "react-redux";
export default function Tasks() {
  const { searchKey, projectList } = useSelector((state) => state.filter);
  const updatedTagString = projectList
    .map((element) => `project.projectName_like=${element}`)
    .concat(`taskName_like=${searchKey}`)
    .join("&");
  const {
    data: tasks,
    isError,
    isLoading,
    error,
  } = useGetTasksQuery(updatedTagString);

  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div className="text-red-500">{error}</div>;
  } else if (!isLoading && !isError && tasks.length === 0) {
    content = <div className="text-green-500">No Projects Available!</div>;
  } else if (!isLoading && !isError && tasks.length > 0) {
    content = tasks.map((task) => {
      return <Task key={task.id} task={task} />;
    });
  }
  return (
    <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <div className="justify-between mb-10 space-y-2 md:flex md:space-y-0">
          <Link to="/task/add" className="lws-addnew group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 group-hover:text-indigo-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span className="group-hover:text-indigo-500">Add New</span>
          </Link>
        </div>
        <div className="lws-task-list">{content}</div>
      </main>
    </div>
  );
}
