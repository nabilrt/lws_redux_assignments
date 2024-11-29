export default function FilterBar({ filterOption, setFilterOption }) {
  return (
    <div className="flex items-center space-x-4">
      <button
        className={`filter-btn ${filterOption === "all" && "active-filter"} `}
        id="lws-filterAll"
        onClick={() => setFilterOption("all")}
      >
        All
      </button>
      <button
        className={`filter-btn ${
          filterOption === "featured" && "active-filter"
        }`}
        id="lws-filterFeatured"
        onClick={() => setFilterOption("featured")}
      >
        Featured
      </button>
    </div>
  );
}
