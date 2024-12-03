import Sidebar from "../components/SideBar";
import Tasks from "../components/Tasks";
export default function HomePage() {
    
  return (
    <>
      <div className="container relative">
        <Sidebar />
        <Tasks />
      </div>
    </>
  );
}
