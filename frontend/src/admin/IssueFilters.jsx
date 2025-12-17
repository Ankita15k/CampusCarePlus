const IssueFilters = ({ filters, setFilters }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <select
        className="border p-2 rounded"
        value={filters.category}
        onChange={(e) =>
          setFilters({ ...filters, category: e.target.value })
        }
      >
        <option value="">All Categories</option>
        <option>Hostel</option>
        <option>WiFi</option>
        <option>Hygiene</option>
      </select>

      <select
        className="border p-2 rounded"
        value={filters.priority}
        onChange={(e) =>
          setFilters({ ...filters, priority: e.target.value })
        }
      >
        <option value="">All Priorities</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <input
        type="date"
        className="border p-2 rounded"
        value={filters.date}
        onChange={(e) =>
          setFilters({ ...filters, date: e.target.value })
        }
      />

      <button
        onClick={() =>
          setFilters({ category: "", priority: "", date: "" })
        }
        className="bg-gray-100 rounded hover:bg-gray-200"
      >
        Reset
      </button>
    </div>
  );
};

export default IssueFilters;