import { FileText } from "lucide-react";

const IssueDescription = ({ description }) => {
  if (!description) return null;

  return (
    <div className="glass-card">
      <div className="section-header">
        <FileText size={18} />
        <span>Issue Description</span>
      </div>
      <p className="desc-text">{description}</p>
    </div>
  );
};

export default IssueDescription;
