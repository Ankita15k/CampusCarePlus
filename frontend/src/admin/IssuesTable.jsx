import { useNavigate } from "react-router-dom";
import {Eye} from "lucide-react"
import IssueStatusBadge from "./IssueStatusBadge";

const issues = [
  {
    id: "CC-2025-X3VXRQ",
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
  {
    id: "#CC104",
    category: "Infrastructure",
    location: "Block A – Classroom 204",
    status: "Pending",
    date: "2025-03-09",
  },
  {
    id: "#CC105",
    category: "Electricity",
    location: "Hostel Room 312",
    status: "In Progress",
    date: "2025-03-09",
  },
  {
    id: "#CC106",
    category: "Water Supply",
    location: "Girls Hostel – Washroom",
    status: "Resolved",
    date: "2025-03-10",
  },
  {
    id: "#CC107",
    category: "Security",
    location: "Main Gate",
    status: "Resolved",
    date: "2025-03-10",
  },
  {
    id: "#CC108",
    category: "Hygiene",
    location: "Library Restroom",
    status: "Pending",
    date: "2025-03-11",
  },
  {
    id: "#CC109",
    category: "Maintenance",
    location: "Auditorium",
    status: "In Progress",
    date: "2025-03-11",
  },
  {
    id: "#CC110",
    category: "Internet",
    location: "Computer Lab 1",
    status: "In Progress",
    date: "2025-03-12",
  },
  {
    id: "#CC111",
    category: "Furniture",
    location: "Seminar Hall",
    status: "Rejected",
    date: "2025-03-12",
  }
];

const IssuesTable = () => {
    const navigate = useNavigate()
  return (
    <div className="bg-white rounded-xl shadow mt-8 overflow-x-auto">
      <table className="w-full text-left text-sm">
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
                <button className="flex items-center gap-1.5 text-sm text-blue-600 cursor-pointer hover:underline" onClick={()=>navigate("/admin/issues/2")}>
                  <Eye className="w-4 h-4" />
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