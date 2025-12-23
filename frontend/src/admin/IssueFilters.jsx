import { Filter, RotateCcw } from "lucide-react";

const IssueFilters = ({ filters, setFilters }) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      category: "",
      priority: "",
      status: "",
      date: "",
    });
  };

  return (
    <>
    <div className="bg-white rounded-2xl shadow-sm border p-5 mb-6">   
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-700 font-semibold">
          <Filter size={18} />
          Issue Filters
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <select
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="filter-input"
        >
          <option value="">All Categories</option>
          <option value="Hostel Issues">Hostel Issues</option>
          <option value="Hygiene & Sanitation">Hygiene & Sanitation</option>
          <option value="WiFi & Internet">WiFi & Internet</option>
          <option value="Electricity & Power">Electricity & Power</option>
          <option value="Harassment">Harassment</option>
          <option value="Ragging">Ragging</option>
          <option value="Faculty Concerns">Faculty Concerns</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Food & Mess">Food & Mess</option>
          <option value="Library">Library</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => handleChange("priority", e.target.value)}
          className="filter-input"
        >
          <option value="">All Priorities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="filter-input"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleChange("date", e.target.value)}
          className="filter-input"
        />
      </div>
    </div>
    </>
  );
};

export default IssueFilters;
