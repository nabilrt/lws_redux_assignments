import ProjectList from "./ProjectList";
import Team from "./Team";

export default function Sidebar() {
  return (
    <div className="sidebar">
      {/* Projects List */}
      <div>
        <h3 className="text-xl font-bold">Projects</h3>
        <ProjectList />
      </div>
      {/* Team Members */}
      <div className="mt-8">
        <h3 className="text-xl font-bold">Team Members</h3>
        <Team />
      </div>
    </div>
  );
}
