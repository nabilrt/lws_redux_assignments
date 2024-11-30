import PostList from "../components/PostList";
import Sidebar from "../components/Sidebar";

export default function HomePage() {
  return (
    <section className="wrapper">
      <Sidebar />

      {/* posts container  */}
      <PostList />

      {/* posts container ends */}
    </section>
  );
}
