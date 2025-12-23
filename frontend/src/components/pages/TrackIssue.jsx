import { useState } from "react";
import { Search, Clock, CheckCircle, XCircle, ClockFading } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusConfig = {
  Pending: {
    color: "text-yellow-700 bg-yellow-100",
    icon: <ClockFading size={18} />,
  },
  "In Progress" : {
    color: "text-blue-700 bg-blue-100",
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
  const navigate = useNavigate();

  const handleSearch = () => {
    
  if(reportId.length !=14 ){
    setError("Plase enter valid Report Id")
    return
  }
   
  navigate(`/track/issue/${reportId}`)
  
  };

  return (
    <div className="mt-10 text-center ">

    
      <button
        onClick={() => setOpen(!open)}
        className="bg-emerald-700 hover:bg-emerald-800 cursor-pointer text-white px-6 py-3 rounded-xl font-semibold transition"
      >
        Track Your Issue
      </button>

    
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

          {error && (
            <p className="text-red-600 mt-3 text-sm">{error}</p>
          )}

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