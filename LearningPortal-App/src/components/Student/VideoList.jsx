import { Link } from "react-router-dom";

export default function VideoList({
  videos,
  selectedVideo,
  handleVideoSelect,
}) {
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {videos?.map((vid) => {
        return (
          <div
            className={`w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2 ${
              selectedVideo?.id === vid?.id && "bg-slate-900"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleVideoSelect(vid);
            }}
            key={vid.id}
          >
            {/* Thumbnail */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
              />
            </svg>
            {/* Description */}
            <div clas="flex flex-col w-full">
              <p>
                <p className="text-slate-50 text-sm font-medium">{vid.title}</p>
              </p>
              <div>
                <span className="text-gray-400 text-xs mt-1">
                  {vid.duration}
                </span>
                <span className="text-gray-400 text-xs mt-1"> | </span>
                <span className="text-gray-400 text-xs mt-1">
                  {vid.views} views
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
