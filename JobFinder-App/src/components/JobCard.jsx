import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeJob } from "../features/jobs/jobsSlice";

export default function JobCard({ job }) {
  const { id, type, title, salary, deadline } = job;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeJob(id));
  };
  return (
    <div className="lws-single-job">
      <div className="flex-1 min-w-0">
        <h2 className="lws-title">{title}</h2>
        <div className="job-footers">
          <div className="lws-type">
            {/* Fulltime - #FF8A00,  */}
            {/* Internship - #FF5757,  */}
            {/* Remote - #56E5C4,  */}
            {type === "Internship" && (
              <>
                <i className="fa-solid fa-stop !text-[#FF5757] text-lg mr-1.5" />
                Internship
              </>
            )}
            {type === "Full Time" && (
              <>
                <i className="fa-solid fa-stop !text-[#FF8A00] text-lg mr-1.5" />
                Full-time
              </>
            )}
            {type === "Remote" && (
              <>
                <i className="fa-solid fa-stop !text-[#56E5C4] text-lg mr-1.5" />
                Remote
              </>
            )}
          </div>
          <div className="lws-salary">
            <i className="fa-solid fa-bangladeshi-taka-sign text-slate-400 text-lg mr-1.5" />
            BDT {salary}
          </div>
          <div className="lws-deadline">
            <i className="fa-regular fa-calendar text-slate-400 text-lg mr-1.5" />
            Closing on {deadline}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="hidden sm:block">
          <Link to={`/job/${id}`} className="lws-edit btn btn-primary">
            <i className="fa-solid fa-pen text-gray-300 -ml-1 mr-2" />
            Edit
          </Link>
        </span>
        <span className="sm:ml-3">
          <button
            type="button"
            className="lws-delete btn btn-danger "
            onClick={handleDelete}
          >
            <i className="fa-solid fa-trash text-gray-300 -ml-1 mr-2" />
            Delete
          </button>
        </span>
      </div>
    </div>
  );
}
