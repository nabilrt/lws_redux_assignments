import MyTable from "../../components/Student/MyTable";
import TopResultsTable from "../../components/Student/TopResultsTable";

import { useGetAllAssignmentMarksQuery } from "../../features/assignmentMark/assignmentMarkApi";
import { useGetAllQuizMarksQuery } from "../../features/quizMark/quizMarkApi";
export default function Leaderboard() {
  const { data: quizMarks } = useGetAllQuizMarksQuery();
  const { data: assignmentMarks } = useGetAllAssignmentMarksQuery();
  const markedAssignments = assignmentMarks?.filter(
    (ass) => ass.status === "published"
  );
  let leaderboardArray = [];
  if (quizMarks && markedAssignments) {
    leaderboardArray = quizMarks.concat(markedAssignments);
  }
  const aggregated = Object.values(
    leaderboardArray?.reduce(
      (acc, { student_id, student_name, mark, video_id, assignment_id }) => {
        if (!acc[student_id])
          acc[student_id] = {
            student_id,
            name: student_name,
            quizMark: 0,
            assignmentMark: 0,
          };
        if (video_id) acc[student_id].quizMark += mark;
        if (assignment_id) acc[student_id].assignmentMark += mark;
        return acc;
      },
      {}
    )
  ).map((student) => ({
    ...student,
    totalMark: student.quizMark + student.assignmentMark,
  }));

  let rank = 1;
  const result = aggregated
    .sort((a, b) => b.totalMark - a.totalMark)
    .map((student, index, arr) => {
      if (index > 0 && student.totalMark < arr[index - 1].totalMark)
        rank = index + 1;
      return { ...student, rank };
    });

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div>
          <MyTable result={result} />
        </div>
        <div className="my-8">
          <h3 className="text-lg font-bold">Top 20 Result</h3>
          <TopResultsTable result={result} />
        </div>
      </div>
    </section>
  );
}
