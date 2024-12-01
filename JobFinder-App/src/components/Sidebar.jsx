import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addType, clearType, removeType } from "../features/filter/filterSlice";

export default function Sidebar() {
  const { type } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  let navigate = useNavigate();
  const handleFilterByType = (value) => {
    if (value === "all") {
      dispatch(clearType());
      navigate("/");
    } else {
      if (type.includes(value)) {
        dispatch(removeType(value));
        navigate("/");
      } else {
        dispatch(addType(value));
        navigate("/");
      }
    }
  };
  return (
    <div className="sidebar">
      <nav>
        <ul className="space-y-4">
          <li>
            <button
              to="/"
              className={`main-menu ${pathname === "/" && "menu-active"}`}
              id="lws-alljobs-menu"
              onClick={() => handleFilterByType("all")}
            >
              <i className="fa-solid fa-briefcase" />
              <span> All Available Jobs</span>
            </button>
            <ul className="space-y-6 lg:space-y-2 ">
              <li>
                <button
                  className="sub-menu"
                  id="lws-internship-menu"
                  style={{
                    fontWeight: type.includes("internship") ? "bold" : "",
                  }}
                  onClick={() => handleFilterByType("internship")}
                >
                  <i className="fa-solid fa-stop !text-[#FF5757] mr-2" />
                  Internship
                </button>
              </li>
              <li>
                <button
                  className="sub-menu sub-menu-active"
                  id="lws-fulltime-menu"
                  style={{
                    fontWeight: type.includes("full time") ? "bold" : "",
                  }}
                  onClick={() => handleFilterByType("full time")}
                >
                  <i className="fa-solid fa-stop !text-[#FF8A00] mr-2" />
                  Full Time
                </button>
              </li>
              <li>
                <button
                  className="sub-menu sub-menu-active"
                  id="lws-remote-menu"
                  style={{
                    fontWeight: type.includes("remote") ? "bold" : "",
                  }}
                  onClick={() => handleFilterByType("remote")}
                >
                  <i className="fa-solid fa-stop !text-[#56E5C4] mr-2" />
                  Remote
                </button>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to="/job/add"
              className={`main-menu ${
                pathname === "/job/add" && "menu-active"
              }`}
              id="lws-addJob-menu"
            >
              <i className="fa-solid fa-file-circle-plus" />
              <span>Add NewJob</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
