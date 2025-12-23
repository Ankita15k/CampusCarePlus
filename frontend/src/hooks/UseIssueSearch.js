import { useMemo } from "react";

const useIssueSearch = (issues, query) => {
  return useMemo(() => {
    if (!query?.trim() || !Array.isArray(issues)) return [];

    const q = query.toLowerCase();

    return issues.filter((issue) => {
      const summary = issue.summary || issue.title || "";
      const description = issue.description || "";
      const category = issue.category || "";
      const id = issue.id || ""

      return (
        summary.toLowerCase().includes(q) ||
        description.toLowerCase().includes(q) ||
        category.toLowerCase().includes(q) ||
        id.toLowerCase().includes(q)
      );
    });
  }, [issues, query]);
};

export default useIssueSearch;
