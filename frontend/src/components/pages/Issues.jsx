import { useState } from "react";
import IssueFilters from "../../admin/IssueFilters";
import IssuesTable from "../../admin/IssuesTable";
import { useNavigate } from "react-router-dom";

const issuesData = [
  {
    id: "#CC101",
    category: "Hostel",
    location: "Block A",
    priority: "High",
    status: "Pending",
    date: "2025-03-10",
  },
  {
    id: "#CC102",
    category: "WiFi",
    location: "Library",
    priority: "Medium",
    status: "In Progress",
    date: "2025-03-09",
  },
  {
    id: "#CC103",
    category: "Hygiene",
    location: "Canteen",
    priority: "Low",
    status: "Resolved",
    date: "2025-03-08",
  },
];

const Issues = () => {


  const [filters, setFilters] = useState({
    category: "",
    priority: "",
    date: "",
  });

  const filteredIssues = issuesData.filter((issue) => {
    return (
      (!filters.category || issue.category === filters.category) &&
      (!filters.priority || issue.priority === filters.priority) &&
      (!filters.date || issue.date === filters.date)
    );
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Issues</h1>

      <IssueFilters filters={filters} setFilters={setFilters} />

      <IssuesTable issues={filteredIssues} />
    </div>
  );
};

export default Issues;
