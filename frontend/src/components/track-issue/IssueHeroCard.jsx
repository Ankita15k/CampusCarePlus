import { MapPin, Calendar, User } from "lucide-react";

const IssueHeroCard = ({ issue }) => {
  return (
    <div className="hero-card-detail">
      <div className="hero-top">
        <h2>{issue.title}</h2>
        <span className={`status-pill ${issue.status}`}>
          {issue.status}
        </span>
      </div>

      <p className="report-id">Report ID: {issue.reportId}</p>

      <div className="hero-meta">
        <Meta icon={<MapPin />} label="Location" value={issue.location} />
        <Meta
          icon={<Calendar />}
          label="Created"
          value={new Date(issue.createdAt).toLocaleDateString("en-IN")}
        />
        <Meta icon={<User />} label="Submitted By" value={issue.submittedBy} />
      </div>
    </div>
  );
};

const Meta = ({ icon, label, value }) => (
  <div className="meta-item">
    {icon}
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  </div>
);

export default IssueHeroCard;
