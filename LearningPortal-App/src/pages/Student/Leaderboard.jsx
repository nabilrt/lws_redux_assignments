import MyTable from "../../components/Student/MyTable";
import TopResultsTable from "../../components/Student/TopResultsTable";

export default function Leaderboard() {
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div>
          <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
          <MyTable />
        </div>
        <div className="my-8">
          <h3 className="text-lg font-bold">Top 20 Result</h3>
          <TopResultsTable />
        </div>
      </div>
    </section>
  );
}
