import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllBlogs } from "../features/blogs/blogsSlice";
import { sortBy, filterBy } from "../features/filter/filterSlice";
export default function Sidebar() {
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("all");

  const dispatch = useDispatch();

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    dispatch(sortBy(e.target.value));
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
    dispatch(filterBy(e.target.value));
  };

  return (
    <aside>
      <div className="sidebar-items">
        <div className="sidebar-content">
          <h4>Sort</h4>
          <select
            name="sort"
            id="lws-sort"
            className="w-full max-w-[150px] border-2 rounded-md text-gray-500"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="">Default</option>
            <option value="newest">Newest</option>
            <option value="most_liked">Most Liked</option>
          </select>
        </div>
        <div className="sidebar-content">
          <h4>Filter</h4>
          <div className="radio-group">
            {/* handle filter on button click */}
            <div>
              <input
                type="radio"
                name="filter"
                id="lws-all"
                className="radio"
                value="all"
                checked={filterOption === "all"}
                onChange={handleFilterChange}
              />
              <label htmlFor="lws-all">All</label>
            </div>
            <div>
              <input
                type="radio"
                name="filter"
                id="lws-saved"
                className="radio"
                checked={filterOption === "saved"}
                value="saved"
                onChange={handleFilterChange}
              />
              <label htmlFor="lws-saved">Saved</label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
