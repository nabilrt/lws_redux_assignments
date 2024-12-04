import VideoList from "../../components/Student/VideoList";
import VideoPlayer from "../../components/Student/VideoPlayer";

export default function CoursePlayer() {
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <VideoPlayer />
          <VideoList />
        </div>
      </div>
    </section>
  );
}
