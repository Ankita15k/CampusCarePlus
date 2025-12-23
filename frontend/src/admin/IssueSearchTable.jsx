import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IssueSearchTable = ({ results }) => {
  const navigate = useNavigate();

  if (!results.length) {
    return (
      <div className="text-center py-6 text-gray-500">
        No matching issues found
      </div>
    );
  }

  return (
    <table className="w-full text-sm border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Category</th>
          <th className="p-2 text-left">Location</th>
          <th className="p-2 text-left">Status</th>
          <th className="p-2 text-center">View</th>
        </tr>
      </thead>

      <tbody>
        {results.map((issue) => (
          <tr key={issue.id} className="border-t hover:bg-gray-50">
            <td className="p-2">{issue.category}</td>
            <td className="p-2">{issue.location}</td>
            <td className="p-2">{issue.status}</td>
            <td className="p-2 text-center">
              <button
                onClick={() => navigate(`/admin/issues/${issue.id}`)}
                className="text-emerald-600 hover:text-emerald-800"
              >
                <Eye size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IssueSearchTable;
