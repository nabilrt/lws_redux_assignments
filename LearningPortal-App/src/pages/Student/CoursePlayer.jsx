import { useEffect, useState } from "react";
import VideoList from "../../components/Student/VideoList";
import VideoPlayer from "../../components/Student/VideoPlayer";
import { useGetVideosQuery } from "../../features/video/videoApi";
export default function CoursePlayer() {
  const { data: videos = [], isError, isLoading, error } = useGetVideosQuery();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  useEffect(() => {
    if (!isLoading && videos.length > 0) {
      setSelectedVideo(videos[0]);
    }
  }, [isLoading, videos]);

  let content = null;
  if (isLoading) {
    content = <div className="text-green-500">Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div className="text-red-500">{error}</div>;
  } else if (!isLoading && !isError && videos.length === 0) {
    content = <div className="text-blue-500">No Videos Found!</div>;
  } else if (!isLoading && !isError && videos.length > 0) {
    content = (
      <div className="grid grid-cols-3 gap-2 lg:gap-8">
        {selectedVideo && <VideoPlayer video={selectedVideo} />}
        <VideoList
          videos={videos}
          selectedVideo={selectedVideo}
          handleVideoSelect={handleVideoSelect}
        />
      </div>
    );
  }

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">{content}</div>
    </section>
  );
}
