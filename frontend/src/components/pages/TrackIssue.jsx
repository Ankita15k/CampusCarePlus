import { useState } from "react";
import { Search, Clock, CheckCircle, XCircle } from "lucide-react";

const statusConfig = {
  Pending: {
    color: "text-yellow-700 bg-yellow-100",
    icon: <Clock size={18} />,
  },
  Resolved: {
    color: "text-green-700 bg-green-100",
    icon: <CheckCircle size={18} />,
  },
  Rejected: {
    color: "text-red-700 bg-red-100",
    icon: <XCircle size={18} />,
  },
};

const TrackIssue = () => {
  const [open, setOpen] = useState(false);
  const [reportId, setReportId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    const issue = mockIssues.find(
      (i) => i.reportId.toLowerCase() === reportId.toLowerCase()
    );

    if (!issue) {
      setResult(null);
      setError("No issue found with this Report ID.");
      return;
    }

    setError("");
    setResult(issue);
  };

  return (
    <div className="mt-1 text-center">

      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-emerald-700 hover:bg-emerald-800 cursor-pointer text-white px-6 py-3 rounded-xl font-semibold transition"
      >
        Track Your Issue
      </button>

      {/* Search Panel */}
      {open && (
        <div className="mt-6 mb-5 max-w-md mx-auto bg-gray-200 shadow-lg rounded-xl p-6 text-left animate-fade-in">

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter Report ID
          </label>

          <div className="flex gap-2">
            <input
              value={reportId}
              onChange={(e) => setReportId(e.target.value)}
              placeholder="e.g. CC-2025-XXXX"
              className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-600"
            />

            <button
              onClick={handleSearch}
              className="bg-emerald-700 text-white px-4 rounded-lg flex items-center gap-1 hover:bg-emerald-800"
            >
              <Search size={18} />
              Search
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 mt-3 text-sm">{error}</p>
          )}

          {/* Result */}
          {result && (
            <div className="mt-5 border rounded-lg p-4 mb-5 space-y-3">

              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  statusConfig[result.status].color
                }`}
              >
                {statusConfig[result.status].icon}
                {result.status}
              </div>

              <p className="text-sm text-gray-700">
                <span className="font-medium">Description:</span>
                <br />
                {result.description}
              </p>

            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackIssue;
