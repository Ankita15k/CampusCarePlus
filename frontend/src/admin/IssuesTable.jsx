import { useNavigate } from "react-router-dom";
import IssueStatusBadge from "./IssueStatusBadge";

const issues = [
  {
    id: "#CC101",
    category: "Hostel",
    location: "Block A",
    status: "Pending",
    date: "2025-03-10",
  },
  {
    id: "#CC102",
    category: "WiFi",
    location: "Library",
    status: "In Progress",
    date: "2025-03-09",
  },
  {
    id: "#CC103",
    category: "Hygiene",
    location: "Canteen",
    status: "Resolved",
    date: "2025-03-08",
  },
];

const IssuesTable = () => {
    const navigate = useNavigate()
  return (
    <div className="bg-white rounded-xl shadow mt-8 overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-4">ID</th>
            <th>Category</th>
            <th>Location</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id} className="border-t">
              <td className="p-4">{issue.id}</td>
              <td>{issue.category}</td>
              <td>{issue.location}</td>
              <td>
                <IssueStatusBadge status={issue.status} />
              </td>
              <td>{issue.date}</td>
              <td>
                <button className="text-blue-600 hover:underline" onClick={()=>navigate("/admin/issues/2")}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuesTable;