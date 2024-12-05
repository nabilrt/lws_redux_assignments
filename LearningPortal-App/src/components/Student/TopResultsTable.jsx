export default function TopResultsTable({ result }) {
  return (
    <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
      <thead>
        <tr className="border-b border-slate-600/50">
          <th className="table-th !text-center">Rank</th>
          <th className="table-th !text-center">Name</th>
          <th className="table-th !text-center">Quiz Mark</th>
          <th className="table-th !text-center">Assignment Mark</th>
          <th className="table-th !text-center">Total</th>
        </tr>
      </thead>
      <tbody>
        {result?.slice(0, 20).map((res, index) => {
          return (
            <tr className="border-b border-slate-600/50" key={index}>
              <td className="table-td text-center">{res?.rank}</td>
              <td className="table-td text-center">{res?.name}</td>
              <td className="table-td text-center">{res?.quizMark}</td>
              <td className="table-td text-center">{res?.assignmentMark}</td>
              <td className="table-td text-center">{res?.totalMark}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
