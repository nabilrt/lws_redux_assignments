import { useEffect, useState } from "react";
import { useUpdateTaskMutation } from "../features/tasks/taskApi";
import { useGetTeamQuery } from "../features/team/teamApi";
import { useGetProjectsQuery } from "../features/projects/projectApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function EditForm({ task }) {
  const { data: team } = useGetTeamQuery();
  const { data: projects } = useGetProjectsQuery("");
  const mutationData = {
    ...task,
    teamMember: task?.teamMember?.id.toString(),
    project: task?.project?.id.toString(),
  };
  const { searchKey, projectList } = useSelector((state) => state.filter);
  const updatedTagString = projectList
    .map((element) => `project.projectName_like=${element}`)
    .concat(`taskName_like=${searchKey}`)
    .join("&");
  const [updateTask, { isError, isLoading, error }] = useUpdateTaskMutation();
  let navigate = useNavigate();

  const [taskData, setTaskData] = useState(mutationData);
  const handleInputChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...taskData,
      teamMember: team.find((t) => t.id === Number(taskData.teamMember)),
      project: projects.find((p) => p.id === Number(taskData.project)),
    };
    updateTask({
      id: taskData.id,
      data: updatedTask,
      projectString: updatedTagString,
    }).unwrap();
    if (isError) {
      toast.error(error);
    } else {
      toast.success("Successfully updated!");
      navigate("/");
    }
  };
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="fieldContainer">
        <label htmlFor="lws-taskName">Task Name</label>
        <input
          type="text"
          name="taskName"
          id="lws-taskName"
          required=""
          placeholder="Implement RTK Query"
          value={taskData.taskName}
          onChange={handleInputChange}
        />
      </div>
      <div className="fieldContainer">
        <label>Assign To</label>
        <select
          name="teamMember"
          id="lws-teamMember"
          required=""
          value={taskData.teamMember}
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
          value={taskData.project}
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
          value={taskData.deadline}
          onChange={handleInputChange}
        />
      </div>
      <div className="text-right">
        <button type="submit" className="lws-submit" disabled={isLoading}>
          Save
        </button>
      </div>
    </form>
  );
}
