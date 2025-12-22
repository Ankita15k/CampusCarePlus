import { useState, useRef, useEffect } from "react";
import PriorityBadge from "../../admin/PriorityBadge";
import IssueStatusBadge from "../../admin/IssueStatusBadge";
import IssueDetailsLoader from "../../admin/IssueDetailsLoader";
import NoIssueFound from "../../admin/NoIssueFound";
import { useParams } from "react-router-dom";
import useIssueDetail from "../../hooks/UseGetissueDetail";
import {
  MapPin,
  Calendar,
  User,
  FileText,
  Brain,
  Image as ImageIcon,
} from "lucide-react";
import {
  markAsrejected,
  markAsResolved,
  markInProgress,
} from "../../lib/AdminActionApis";
import toast from "react-hot-toast";

const IssueDetails = () => {
  const { id } = useParams();
  const { isLoading, data: issue } = useIssueDetail(id);

  const [actionType, setActionType] = useState(null);
  const [remark, setRemark] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const remarkRef = useRef(null);

  useEffect(() => {
    if (actionType && remarkRef.current) {
      remarkRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      remarkRef.current.focus();
    }
  }, [actionType]);

  if (isLoading) return <IssueDetailsLoader />;
  if (!issue) return <NoIssueFound />;

  const handleAction = async () => {
    if (!remark.trim()) return;

    setIsSubmitting(true);

    if (actionType == "resolved") {
      await markAsResolved(id, remark);
    }

    if (actionType == "in_progress") {
      await markInProgress(id, remark);
    }

    if (actionType == "rejected") {
      await markAsrejected(id, remark);
    }
    
    
    setIsSubmitting(false);
    setActionType(null);
    setRemark("");
  };

  const actionTitleMap = {
    in_progress: "Mark Issue In Progress",
    resolved: "Resolve Issue",
    rejected: "Reject Issue",
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-gray-900">{issue.title}</h1>
        <p className="text-sm text-gray-500">
          Report ID: <span className="font-medium">{issue.reportId}</span>
        </p>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Meta
            icon={<MapPin size={18} />}
            label="Location"
            value={issue.location}
          />
          <Meta
            icon={<Calendar size={18} />}
            label="Reported On"
            value={
              issue.createdAt
                ? new Date(issue.createdAt).toLocaleString("en-IN")
                : "—"
            }
          />
          <Meta
            icon={<User size={18} />}
            label="Submitted By"
            value={issue.submittedBy}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <IssueStatusBadge status={issue.status} />
          <PriorityBadge priority={issue.priority} />
        </div>

        <Section title="Issue Description" icon={<FileText size={18} />}>
          <p className="text-gray-700 leading-relaxed">{issue.description}</p>
        </Section>

        {issue.aiSummary && (
          <Section title="AI Analysis" icon={<Brain size={18} />}>
            <p className="text-sm text-gray-700">{issue.aiSummary}</p>
          </Section>
        )}

        {issue.attachment && (
          <Section title="Attached Evidence" icon={<ImageIcon size={18} />}>
            <div className="rounded-xl overflow-hidden border">
              <img
                src={issue.attachment}
                alt="Attachment"
                className="w-full max-h-[420px] object-cover"
              />
            </div>
          </Section>
        )}

        <div className="border-t pt-6 flex flex-wrap gap-3 justify-end">
          <ActionButton
            label="Mark In Progress"
            variant="yellow"
            onClick={() => {
              setActionType("in_progress");
              setRemark(issue.adminRemark || "");
            }}
          />
          <ActionButton
            label="Resolve Issue"
            variant="green"
            onClick={() => {
              setActionType("resolved");
              setRemark(issue.adminRemark || "");
            }}
          />
          <ActionButton
            label="Reject Issue"
            variant="red"
            onClick={() => {
              setActionType("rejected");
              setRemark(issue.adminRemark || "");
            }}
          />
        </div>

        {actionType && (
          <div className="border rounded-xl p-5 bg-gray-50 space-y-4">
            <p className="font-semibold text-gray-800">
              {actionTitleMap[actionType]}
            </p>

            <textarea
              ref={remarkRef}
              rows="4"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setActionType(null);
                  setRemark("");
                }}
                className="px-4 py-2 rounded-lg border text-sm"
              >
                Cancel
              </button>

              <button
                disabled={isSubmitting}
                onClick={handleAction}
                className="flex items-center justify-center gap-2
             px-5 py-2 rounded-lg
             bg-emerald-600 text-white text-sm
             hover:bg-emerald-700 transition
             disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting && (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}

                {isSubmitting ? "Processing..." : "Confirm Action"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Meta = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-emerald-700">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value || "—"}</p>
    </div>
  </div>
);

const Section = ({ title, icon, children }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-gray-900 font-semibold">
      {icon}
      {title}
    </div>
    {children}
  </div>
);

const ActionButton = ({ label, variant, onClick }) => {
  const styles = {
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    green: "bg-emerald-600 hover:bg-emerald-700",
    red: "bg-red-600 hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${styles[variant]} text-white px-5 py-2 rounded-lg font-medium transition`}
    >
      {label}
    </button>
  );
};

export default IssueDetails;
