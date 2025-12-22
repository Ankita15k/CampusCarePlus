import { useState } from "react";
import { Search, X, FileText, Brain, User, Image } from "lucide-react";
import toast from "react-hot-toast";
import adminTrackIssue from "../utils/adminTrackIssue";
import IssueStatusBadge from "../admin/IssueStatusBadge";
import PriorityBadge from "../admin/PriorityBadge";

const AdminTrackIssue = ({ onClose }) => {
  const [reportId, setReportId] = useState("");
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!reportId.trim()) {
      toast.error("Report ID is required");
      return;
    }

    setLoading(true);
    try {
      const data = await adminTrackIssue(reportId);
      setIssue(data);
    } catch {
      toast.error("Issue not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white max-w-4xl w-full rounded-2xl p-6 shadow-xl overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Admin Issue Tracker
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X />
          </button>
        </div>

        {/* Search */}
        <div className="flex gap-2 mb-6">
          <input
            value={reportId}
            onChange={(e) => setReportId(e.target.value)}
            placeholder="Enter Report ID"
            className="flex-1 border rounded-lg px-3 py-2"
          />
          <button
            onClick={handleSearch}
            className="bg-gray-900 text-white px-4 rounded-lg"
          >
            <Search />
          </button>
        </div>

        {loading && <p className="text-sm text-gray-500">Fetching issue...</p>}

        {/* RESULT */}
        {issue && (
          <div className="space-y-6">

            {/* Meta */}
            <div className="flex flex-wrap gap-3">
              <IssueStatusBadge status={issue.status} />
              <PriorityBadge priority={issue.priority} />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <Info icon={<FileText size={18} />} label="Summary" value={issue.title} />
              <Info icon={<Brain size={18} />} label="AI Priority Reason" value={issue.aiSummary} />
              <Info icon={<User size={18} />} label="Submitted By" value={issue.submittedBy} />
              <Info icon={<FileText size={18} />} label="Category" value={issue.category} />
              <Info icon={<FileText size={18} />} label="Location" value={issue.location} />
              <Info icon={<FileText size={18} />} label="Created At"
                value={new Date(issue.createdAt).toLocaleString("en-IN")}
              />
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold mb-1">Full Description</h4>
              <p className="text-gray-700">{issue.description}</p>
            </div>

            {/* Attachment */}
            {issue.attachment && (
              <div>
                <h4 className="font-semibold mb-1">Attachment</h4>
                <img
                  src={issue.attachment}
                  alt="Evidence"
                  className="rounded-lg border max-h-80"
                />
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

const Info = ({ icon, label, value }) => (
  <div className="flex gap-3 items-start">
    <div className="text-gray-700">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value || "—"}</p>
    </div>
  </div>
);

export default AdminTrackIssue;
