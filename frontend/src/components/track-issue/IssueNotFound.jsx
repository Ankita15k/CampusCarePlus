import { SearchX } from "lucide-react";

const IssueNotFound = ({id}) => {
  return (
    <div className="notfound-wrapper">
      <SearchX size={56} className="notfound-icon" />

      <h2>Issue Not Found</h2>

      <p>
        We couldn’t find any issue with this ReportId: <strong>{id}</strong>.  
        Please check the ID and try again.
      </p>

      <p className="notfound-hint">
        If the issue was recently submitted, try again after a few minutes.
      </p>
    </div>
  );
};

export default IssueNotFound;
