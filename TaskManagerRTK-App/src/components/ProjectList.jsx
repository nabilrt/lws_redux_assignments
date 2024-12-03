import { useGetProjectsQuery } from "../features/projects/projectApi";
import { useDispatch, useSelector } from "react-redux";
import { addProject, removeProject } from "../features/filter/filterSlice";

export default function ProjectList() {
  const { data: projects, isError, isLoading, error } = useGetProjectsQuery();
  const { projectList } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleProjects = (e) => {
    if (projectList.includes(e.target.name)) {
      dispatch(removeProject(e.target.name));
    } else {
      dispatch(addProject(e.target.name));
    }
  };

  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div className="text-red-500">{error}</div>;
  } else if (!isLoading && !isError && projects.length === 0) {
    content = <div className="text-green-500">No Projects Available!</div>;
  } else if (!isLoading && !isError && projects.length > 0) {
    content = projects.map((project) => {
      return (
        <div key={project.projectName} className="checkbox-container">
          <input
            type="checkbox"
            className={project.colorClass}
            name={project.projectName}
            checked={projectList.includes(project.projectName)}
            onChange={handleProjects}
          />
          <p className="label">{project.projectName}</p>
        </div>
      );
    });
  }
  return <div className="mt-3 space-y-4">{content}</div>;
}
