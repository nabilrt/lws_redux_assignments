import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../features/filter/filterSlice";

export default function FilterBar() {
  const filter = useSelector((state) => state.filter);
  const [activeFilter, setActiveFilter] = useState(filter.filterType);
  const dispatch = useDispatch();

  const handleFilter = (value) => {
    setActiveFilter(value);
    dispatch(changeFilter(value));
  };
  return (
    <div className="flex items-center space-x-4">
      <button
        className={`lws-filter-btn ${
          activeFilter === "all" && "active-filter"
        } `}
        onClick={() => handleFilter("all")}
      >
        All
      </button>
      <button
        className={`lws-filter-btn ${
          activeFilter === "featured" && "active-filter"
        } `}
        onClick={() => handleFilter("featured")}
      >
        Featured
      </button>
    </div>
  );
}
