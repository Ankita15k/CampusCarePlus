import { useEffect, useState } from "react";
import IssueFilters from "../../admin/IssueFilters";
import IssuesTable from "../../admin/IssuesTable";
import useAllIssues from "../../hooks/UseAllissues";
import IssueDetailsLoader from "../../admin/IssueDetailsLoader";
import IssueSearchBar from "../../admin/IssueSearchBar";
import SearchOverlay from "../../admin/SearchOverlay";
import UseIssueSearch from "../../hooks/UseIssueSearch";

const Issues = () => {

  const { isLoading, allIssues } = useAllIssues();
  const [filters, setFilters] = useState({
    category: "",
    priority: "",
    status: "",
    date: "",
  });

  
  const [searchQuery, setSearchQuery] = useState("");
const [openSearch, setOpenSearch] = useState(false);

const searchResults = UseIssueSearch(allIssues, searchQuery);

  if (isLoading) return <IssueDetailsLoader />;

  const filteredIssues = allIssues.filter((issue) => {
    const issueDate = issue.date
      ? new Date(issue.date).toISOString().split("T")[0]
      : "";

    return (
      (!filters.category || issue.category === filters.category) &&
      (!filters.priority ||
        issue.priority?.toLowerCase() === filters.priority.toLowerCase()) &&
      (!filters.status ||
        issue.status?.toLowerCase() === filters.status.toLowerCase()) &&
      (!filters.date || issueDate === filters.date)
    );
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Issues</h1>

      <div className="flex justify-center w-full ">
        <IssueSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onOpen={setOpenSearch}
        />
      </div>

      {openSearch && (
        <SearchOverlay
          query={searchQuery}
          results={searchResults}
          onClose={() => setOpenSearch(false)}
        />
      )}

      <IssueFilters filters={filters} setFilters={setFilters} />

      <IssuesTable issues={filteredIssues} />
    </div>
  );
};

export default Issues;
