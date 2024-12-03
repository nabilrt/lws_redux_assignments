import { Link, useLocation, useNavigate } from "react-router-dom";
import lwsLogo from "../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { searchBy } from "../features/filter/filterSlice";
export default function NavBar() {
  const { searchKey } = useSelector((state) => state.filter);
  const [input, setInput] = useState(searchKey);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    dispatch(searchBy(input))
      .unwrap()
      .then(() => {
        if (pathname !== "/") {
          navigate("/");
        }
      });
  };
  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={lwsLogo} />
        </Link>
        <form
          className="flex-1 max-w-xs search-field group"
          onSubmit={handleChange}
        >
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500" />
          <input
            type="text"
            placeholder="Search Task"
            className="search-input"
            id="lws-searchTask"
            style={{
              color: "black",
            }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    </nav>
  );
}
