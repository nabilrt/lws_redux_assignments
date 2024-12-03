import { useGetTeamQuery } from "../features/team/teamApi";
export default function Team() {
  const { data: team, isLoading, isError, error } = useGetTeamQuery();
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div className="text-red-500">{error}</div>;
  } else if (!isLoading && !isError && team.length === 0) {
    content = <div className="text-green-500">No Projects Available!</div>;
  } else if (!isLoading && !isError && team.length > 0) {
    content = team.map((t) => {
      return (
        <div className="checkbox-container">
          <img src={t.avatar} className="team-avater" />
          <p className="label">{t.name}</p>
        </div>
      );
    });
  }
  return <div className="mt-3 space-y-4">{content}</div>;
}
