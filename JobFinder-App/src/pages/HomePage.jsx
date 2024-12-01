import { useDispatch, useSelector } from "react-redux";
import Filter from "../components/Filter";
import JobCard from "../components/JobCard";
import { useEffect } from "react";
import { fetchJobs } from "../features/jobs/jobsSlice";
import Loader from "../components/Loader";
export default function HomePage() {
  const { isLoading, isError, error, jobs } = useSelector(
    (state) => state.jobs
  );
  const { type, sortBy, searchTerm } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobs({ type }));
  }, [dispatch, type]);

  const handleSearch = (data) =>
    data.title.toLowerCase().includes(searchTerm.toLowerCase());

  const handleSorting = (a, b) => {
    if (sortBy === "asc") {
      return parseFloat(a?.salary) - parseFloat(b?.salary);
    } else if (sortBy === "desc") {
      return parseFloat(b?.salary) - parseFloat(a?.salary);
    }
    return 0;
  };

  return (
    <>
      <Filter />

      <div className="jobs-list">
        {/* Single Job 1*/}
        {isLoading && <Loader />}
        {!isLoading && isError && <div className="text-red-500">{error}</div>}
        {!isLoading && !isError && jobs?.length === 0 && "No Jobs Available!"}

        {jobs
          ?.filter(handleSearch)
          .sort(handleSorting)
          .map((job) => {
            return <JobCard key={job.id} job={job} />;
          })}
      </div>
    </>
  );
}
