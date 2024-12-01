import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchKey, sortMethod } from "../features/filter/filterSlice";

export default function Filter() {
  const { searchTerm, sortBy } = useSelector((state) => state.filter);
  const [input, setInput] = useState(searchTerm);
  const [sort, setSort] = useState(sortBy);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInput(e.target.value);
    dispatch(searchKey(e.target.value));
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    dispatch(sortMethod(e.target.value));
  };

  return (
    <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
      <h1 className="lws-section-title">All Available Jobs</h1>
      <div className="flex gap-4">
        <div className="search-field group flex-1">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500" />
          <input
            type="text"
            placeholder="Search Job"
            className="search-input"
            id="lws-searchJob"
            value={input}
            onChange={handleInput}
          />
        </div>
        <select
          id="lws-sort"
          name="sort"
          autoComplete="sort"
          className="flex-1"
          value={sort}
          onChange={handleSort}
        >
          <option value="">Default</option>
          <option value="asc">Salary (Low to High)</option>
          <option value="desc">Salary (High to Low)</option>
        </select>
      </div>
    </div>
  );
}
