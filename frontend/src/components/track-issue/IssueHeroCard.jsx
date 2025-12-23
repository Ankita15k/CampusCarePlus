import { MapPin, Calendar, User, Clock, CheckCircle, XCircle, ClockFading, ScrollText } from "lucide-react";

const IssueHeroCard = ({ issue }) => {
  
  const statusConfig = {
  pending: {
    color: "text-yellow-700 bg-yellow-100",
    icon: <ClockFading size={18} />,
  },
  Resolved: {
    color: "text-green-700 bg-green-100",
    icon: <CheckCircle size={18} />,
  },
  "In Progress" : {
    color: "text-blue-700 bg-blue-100",
    icon: <Clock size={18} />,
  },
  Rejected: {
    color: "text-red-700 bg-red-100",
    icon: <XCircle size={18} />,
  },
};
  return (
    <div className="hero-card-detail mt-4">
      <div className="hero-top">
        <h2 className="text-xl mb-3 font-semibold text-gray-900">{issue.title}</h2>
        <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  statusConfig[issue.status].color
                }`}
              >
                {statusConfig[issue.status].icon}
                {issue.status}
              </div>
      </div>

      <p className=" mt-5 mb-3 text-gray-700">Report ID: {issue.reportId}</p>
 
      <div className="hero-meta">
        
        <Meta icon={<User size={16} />} label="Submitted By : " value={issue.submittedBy} />

        <Meta
          icon={<Calendar size={16} />}
          label="Created on : "
          value={new Date(issue.createdAt).toLocaleDateString("en-IN")}
        />

        <Meta icon={<MapPin size={16} />} label="Location : " value={issue.location} />

        <div>
          <div className="flex items-center gap-2 mt-3 font-semibold text-gray-900">
            <ScrollText size={18} />
            <span>Description : </span>
          </div>
          <p className="text-gray-700 ml-5">{issue.description}</p>
        </div>
      </div>
    </div>
  );
};

const Meta = ({ icon, label, value }) => (
  <div className="meta-item">
    {icon}<span>{label}</span>
    <div className="text-sm text-gray-700">
      
      {value}
    </div>
  </div>
);

export default IssueHeroCard;
