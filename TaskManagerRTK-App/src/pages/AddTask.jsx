import { useState } from "react";
import { useGetProjectsQuery } from "../features/projects/projectApi";
import { useGetTeamQuery } from "../features/team/teamApi";
import { useAddTaskMutation } from "../features/tasks/taskApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AddTask() {
  const { data: team } = useGetTeamQuery();
  const { data: projects } = useGetProjectsQuery("");
  const { searchKey, projectList } = useSelector((state) => state.filter);
  const updatedTagString = projectList
    .map((element) => `project.projectName_like=${element}`)
    .concat(`taskName_like=${searchKey}`)
    .join("&");

  let navigate = useNavigate();

  const [task, setTask] = useState({});

  const [addTask, { isLoading, isError, error }] = useAddTaskMutation();

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      teamMember: team.find((t) => t.id === Number(task.teamMember)),
      project: projects.find((p) => p.id === Number(task.project)),
    };
    addTask({ data: updatedTask, projectString: updatedTagString }).unwrap();
    if (isError) {
      toast.error(error);
    } else {
      toast.success("Successfully added!");
      navigate("/");
    }
  };

  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Create Task for Your Team
        </h1>
        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="fieldContainer">
              <label htmlFor="lws-taskName">Task Name</label>
              <input
                type="text"
                name="taskName"
                id="lws-taskName"
                required=""
                placeholder="Implement RTK Query"
                value={task.taskName}
                onChange={handleInputChange}
              />
            </div>
            <div className="fieldContainer">
              <label>Assign To</label>
              <select
                name="teamMember"
                id="lws-teamMember"
                required=""
                value={task.teamMember}
                onChange={handleInputChange}
              >
                <option value="" hidden="" >
                  Select Job
                </option>
                {team?.map((t) => {
                  return (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="fieldContainer">
              <label htmlFor="lws-projectName">Project Name</label>
              <select
                id="lws-projectName"
                name="project"
                required=""
                value={task.project}
                onChange={handleInputChange}
              >
                <option value="" hidden="">
                  Select Project
                </option>
                {projects?.map((p) => {
                  return (
                    <option key={p.id} value={p.id}>
                      {p.projectName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="fieldContainer">
              <label htmlFor="lws-deadline">Deadline</label>
              <input
                type="date"
                name="deadline"
                id="lws-deadline"
                required=""
                value={task.deadline}
                onChange={handleInputChange}
              />
            </div>
            <div className="text-right">
              <button type="submit" className="lws-submit" disabled={isLoading}>
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
