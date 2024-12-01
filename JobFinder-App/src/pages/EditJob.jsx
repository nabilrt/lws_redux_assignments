import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchJob } from "../features/job/jobSlice";
import { modifyJob } from "../features/jobs/jobsSlice";
import Loader from "../components/Loader";
import { clearType } from "../features/filter/filterSlice";
export default function EditJob() {
  const { id } = useParams();
  const { isLoading, isError, error, job } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchJob(id));
  }, [dispatch, id]);

  const [jobForm, setJobForm] = useState({
    title: "",
    type: "",
    salary: "",
    deadline: "",
  });

  useEffect(() => {
    if (job && Object.keys(job).length > 0) {
      setJobForm({
        title: job.title || "",
        type: job.type || "",
        salary: job.salary || "",
        deadline: job.deadline || "",
      });
    }
  }, [job]);

  const handleInput = (e) => {
    setJobForm({
      ...jobForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearType());
    dispatch(modifyJob({ id, data: jobForm }));
    navigate("/");
  };

  return (
    <>
      <h1 className="mb-10 text-center lws-section-title">Edit Job</h1>
      {isLoading && <Loader />}
      {!isLoading && isError && <div className="text-red-500">{error}</div>}
      {!isLoading && !isError && !jobForm?.title && "No Job Exist!"}

      {!isLoading && !isError && jobForm?.title !== "" && (
        <div className="max-w-3xl mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="fieldContainer">
              <label
                htmlFor="lws-JobTitle"
                className="text-sm font-medium text-slate-300"
              >
                Job Title
              </label>
              <select
                id="lws-JobTitle"
                name="title"
                required
                value={jobForm.title}
                onChange={handleInput}
              >
                <option value="" hidden="">
                  Select Job
                </option>
                <option>Software Engineer</option>
                <option>Software Developer</option>
                <option>Full Stack Developer</option>
                <option>MERN Stack Developer</option>
                <option>DevOps Engineer</option>
                <option>QA Engineer</option>
                <option>Product Manager</option>
                <option>Social Media Manager</option>
                <option>Senior Executive</option>
                <option>Junior Executive</option>
                <option>Android App Developer</option>
                <option>IOS App Developer</option>
                <option>Frontend Developer</option>
                <option>Frontend Engineer</option>
              </select>
            </div>
            <div className="fieldContainer">
              <label htmlFor="lws-JobType">Job Type</label>
              <select
                id="lws-JobType"
                name="type"
                required
                value={jobForm.type}
                onChange={handleInput}
              >
                <option value="" hidden="">
                  Select Job Type
                </option>
                <option>Full Time</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>
            </div>
            <div className="fieldContainer">
              <label htmlFor="lws-JobSalary">Salary</label>
              <div className="flex border rounded-md shadow-sm border-slate-600">
                <span className="input-tag">BDT</span>
                <input
                  type="number"
                  name="salary"
                  id="lws-JobSalary"
                  required
                  className="!rounded-l-none !border-0"
                  placeholder="20,00,000"
                  value={jobForm.salary}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="fieldContainer">
              <label htmlFor="lws-JobDeadline">Deadline</label>
              <input
                type="date"
                name="deadline"
                id="lws-JobDeadline"
                required
                value={jobForm.deadline}
                onChange={handleInput}
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                id="lws-submit"
                className="cursor-pointer btn btn-primary w-fit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
