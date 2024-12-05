import { useSelector } from "react-redux";

export default function MyTable({ result }) {
  const user = useSelector((state) => state.auth.user);
  const userResult = result?.filter((res) => res?.name === user?.name)[0];

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div>
          <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
          <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
            <thead>
              <tr>
                <th className="table-th !text-center">Rank</th>
                <th className="table-th !text-center">Name</th>
                <th className="table-th !text-center">Quiz Mark</th>
                <th className="table-th !text-center">Assignment Mark</th>
                <th className="table-th !text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {userResult?.rank ? (
                <tr className="border-2 border-cyan">
                  <td className="table-td text-center ">{userResult?.rank}</td>
                  <td className="table-td text-center ">{userResult?.name}</td>
                  <td className="table-td text-center ">
                    {userResult?.quizMark}
                  </td>
                  <td className="table-td text-center ">
                    {userResult?.assignmentMark}
                  </td>
                  <td className="table-td text-center ">
                    {userResult?.totalMark}
                  </td>
                </tr>
              ) : (
                <tr className="border-2 border-cyan">
                  <td className="table-td text-center font-bold">N/A</td>
                  <td className="table-td text-center font-bold">
                    {user?.name}
                  </td>
                  <td className="table-td text-center font-bold">0</td>
                  <td className="table-td text-center font-bold">0</td>
                  <td className="table-td text-center font-bold">0</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
