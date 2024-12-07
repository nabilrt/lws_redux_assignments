import { useSelector } from "react-redux";
import { useGetQuizMarksByVideoQuery } from "../../features/quizMark/quizMarkApi";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useGetAssignmentByVideoQuery } from "../../features/assignment/assignmentApi";
import { useGetAssignmentMarksByVideoQuery } from "../../features/assignmentMark/assignmentMarkApi";
import { useEffect, useState } from "react";
import { useGetQuizByVideoQuery } from "../../features/quiz/quizApi";

export default function VideoPlayer({ video }) {
  const navigate = useNavigate();

  const { id, title, description, createdAt, url } = video;

  const {
    data: assignment,
    isLoading,
    isError,
    error,
  } = useGetAssignmentByVideoQuery(id);

  const { data: quizzes } = useGetQuizByVideoQuery(id);

  let content = null;
  if (isLoading) {
    content = <div className="text-green-500">Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div className="text-red-500">{error}</div>;
  } else if (!isLoading && !isError) {
    content = (
      <div className="flex gap-4">
        <button
          className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
          disabled={assignment?.length === 0}
          onClick={() =>
            navigate(`/student/assignment/${id}/${assignment[0]?.id}`)
          }
        >
          {assignment?.length === 0 ? "কোন এসাইনমেন্ট নেই" : "এসাইনমেন্ট"}
        </button>
        <button
          onClick={() => navigate(`/student/quiz/${id}`)}
          className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary disabled:bg-slate-400"
          disabled={quizzes?.length === 0}
        >
          {quizzes?.length === 0 ? "কোন কুইজ নেই" : "কুইজে অংশগ্রহণ করুন"}
        </button>
      </div>
    );
  }

  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      <iframe
        width="100%"
        className="aspect-video"
        src={url}
        title={title}
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-slate-100">
          {title}
        </h1>
        <h2 className="pb-4 text-sm leading-[1.7142857] text-slate-400">
          {moment(createdAt).format("[Uploaded on] DD MMMM YYYY")}
        </h2>
        {content}

        <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
      </div>
    </div>
  );
}
