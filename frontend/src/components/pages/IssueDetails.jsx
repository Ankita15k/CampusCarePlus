import PriorityBadge from "../../admin/PriorityBadge";
import StatusBadge from "../../admin/StatusBadge";

const issue = {
  id: "#CC101",
  category: "Hostel",
  location: "Block A – Room 203",
  priority: "High",
  status: "Pending",
  date: "2025-03-10",
  description:
    "The ceiling fan in Room 203 is broken and making loud noises. It looks unsafe and could fall at any time.",
  image:
    "/images/dummyimg.png",
};

const IssueDetails = () => {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Issue Details</h1>
        <p className="text-gray-500 text-sm">
          Issue ID: {issue.id}
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        {/* Top Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Info label="Category" value={issue.category} />
          <Info label="Location" value={issue.location} />
          <Info label="Reported On" value={issue.date} />
        </div>

        {/* Status & Priority */}
        <div className="flex gap-4 flex-wrap">
          <StatusBadge status={issue.status} />
          <PriorityBadge priority={issue.priority} />
        </div>

        {/* Description */}
        <div>
          <h3 className="font-semibold mb-2">Issue Description</h3>
          <p className="text-gray-700 leading-relaxed">
            {issue.description}
          </p>
        </div>

        {/* Image */}
        <div>
          <h3 className="font-semibold mb-2">Attached Image</h3>
          <img
            src={issue.image}
            alt="Issue"
            className="rounded-lg border max-h-80 object-cover"
          />
        </div>

        {/* Actions */}
        <div className="border-t pt-4 flex flex-wrap gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Verify Issue
          </button>

          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Mark In Progress
          </button>

          <button className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600">
            Resolve Issue
          </button>

          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Reject Issue
          </button>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default IssueDetails;
