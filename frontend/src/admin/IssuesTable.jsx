import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import IssueStatusBadge from "./IssueStatusBadge";
import { dateFormatter } from "../utils/formatdate";
import useAllIssues from "../hooks/UseAllissues";

const IssuesTable = ({ issues }) => {
  const navigate = useNavigate();
  const { allIssues, isLoading } = useAllIssues();

  const data = issues ?? allIssues;

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 text-center text-gray-500">
        Loading issues...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow mt-8 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-4">Report ID</th>
            <th>Category</th>
            <th>Location</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((issue) => (
            <tr key={issue.id} className="border-t">
              <td className="p-4">{issue.id}</td>
              <td>{issue.category}</td>
              <td>{issue.location}</td>
              <td>
                <IssueStatusBadge status={issue.status} />
              </td>
              <td>{dateFormatter(issue.date)}</td>
              <td>
                <button
                  className="flex items-center gap-1.5 cursor-pointer text-sm text-blue-600 hover:underline"
                  onClick={() =>
                    navigate(`/admin/issues/${issue.id}`)
                  }
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan="6" className="p-6 text-center text-gray-500">
                No issues found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IssuesTable;
