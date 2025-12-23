import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  MapPin,
  Calendar,
  User,
  FileText,
  Brain,
  Image as ImageIcon,
  ShieldCheck,
  ScrollText,
  FileCheck2,
  GalleryVertical,
} from "lucide-react";

import PriorityBadge from "../../admin/PriorityBadge";
import IssueStatusBadge from "../../admin/IssueStatusBadge";
import IssueDetailsLoader from "../../admin/IssueDetailsLoader";
import NoIssueFound from "../../admin/NoIssueFound";

import useIssueDetail from "../../hooks/UseGetissueDetail";
import {
  markAsrejected,
  markAsResolved,
  markInProgress,
} from "../../lib/AdminActionApis";

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
    if (!remark.trim()) {
      toast.error("Remark is required");
      return;
    }

    try {
      setIsSubmitting(true);

      if (actionType === "resolved") await markAsResolved(id, remark);
      if (actionType === "in_progress") await markInProgress(id, remark);
      if (actionType === "rejected") await markAsrejected(id, remark);

      toast.success("Status updated");
      setActionType(null);
      setRemark("");
    } catch(error) {
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Meta icon={<User size={18} />} label="Submitted By" value={issue.submittedBy} />
          <Meta
            icon={<Calendar size={18} />}
            label="Reported On"
            value={issue.createdAt ? new Date(issue.createdAt).toLocaleString("en-IN") : "—"}
          />
          <Meta icon={<MapPin size={18} />} label="Location" value={issue.location} />
          
          
          <Meta icon={<GalleryVertical size={18} />} label="Category" value={issue.category} />
        </div>

        <div className="flex flex-wrap gap-3">
          <IssueStatusBadge status={issue.status} />
          <PriorityBadge priority={issue.priority} />
        </div>

        <Section title="Issue Description :" icon={<ScrollText size={18} />}>
          <p className="text-gray-700 leading-relaxed">{issue.description}</p>
        </Section>

        {issue.aiSummary && (
          <Section title="AI Analysis :" icon={<FileCheck2 size={18} />}>
            <p className="text-sm text-gray-700">{issue.aiSummary}</p>
          </Section>
        )}

        {issue.attachment && (
          <Section title="Attached Evidence :" icon={<ImageIcon size={18} />}>
            <img
              src={issue.attachment}
              alt="Attachment"
              className="w-full max-h-[420px] rounded-xl border object-cover"
            />
          </Section>
        )}

        {(issue.inProgressAt || issue.resolvedAt || issue.rejectedAt) && (
          <Section title="Admin Action Details" icon={<ShieldCheck size={18} />}>
            <div className="space-y-4 rounded-xl border bg-gray-50 p-4 text-sm">
              {issue.inProgressAt && (
                <>
                  <ActionMeta label="Marked In Progress On" value={issue.inProgressAt} />
                  <RemarkBlock title="Processing Remark" remark={issue.processingRemark} />
                </>
              )}

              {issue.resolvedAt && (
                <>
                  <ActionMeta label="Resolved On" value={issue.resolvedAt} />
                  <RemarkBlock title="Resolving Remark" remark={issue.resolvingRemark} />
                </>
              )}

              {issue.rejectedAt && (
                <>
                  <ActionMeta label="Rejected On" value={issue.rejectedAt} />
                  <RemarkBlock title="Rejection Remark" remark={issue.rejectionemark} />
                </>
              )}
            </div>
          </Section>
        )}

        <div className="border-t pt-6 flex flex-wrap gap-3 justify-end">
          <ActionButton label="Mark In Progress" variant="yellow" onClick={() => setActionType("in_progress")} />
          <ActionButton label="Resolve Issue" variant="green" onClick={() => setActionType("resolved")} />
          <ActionButton label="Reject Issue" variant="red" onClick={() => setActionType("rejected")} />
        </div>

        {actionType && (
          <div className="border rounded-xl p-5 bg-gray-50 space-y-4">
            <p className="font-semibold">{actionTitleMap[actionType]}</p>

            <textarea
              ref={remarkRef}
              rows="4"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
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
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-700 disabled:opacity-60"
              >
                {isSubmitting && (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
  <div className="flex gap-3">
    <div className="text-emerald-700">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value || "—"}</p>
    </div>
  </div>
);

const Section = ({ title, icon, children }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 font-semibold text-gray-900">
      {icon}
      {title}
    </div>
    {children}
  </div>
);

const ActionMeta = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">
      {value ? new Date(value).toLocaleString("en-IN") : "—"}
    </p>
  </div>
);

const RemarkBlock = ({ title, remark }) => (
  <div>
    <p className="text-xs text-gray-500">{title}</p>
    <p className="mt-1 rounded-lg border bg-white px-3 py-2 text-gray-700">
      {remark || "No remark provided"}
    </p>
  </div>
);

const ActionButton = ({ label, variant, onClick }) => {
  const styles = {
    yellow: "bg-yellow-500 cursor-pointer hover:bg-yellow-600",
    green: "bg-emerald-600 cursor-pointer hover:bg-emerald-700",
    red: "bg-red-600 cursor-pointer hover:bg-red-700",
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
