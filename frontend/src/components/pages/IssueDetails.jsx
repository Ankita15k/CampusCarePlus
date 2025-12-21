import PriorityBadge from "../../admin/PriorityBadge";
import StatusBadge from "../../admin/StatusBadge";
import {useMutation, useQueryClient} from "@tanstack/react-query"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useIssueDetail from "../../hooks/UseGetissueDetail";
import toast from "react-hot-toast";
import IssueStatusBadge from "../../admin/IssueStatusBadge";
import IssueDetailsLoader from "../../admin/IssueDetailsLoader";
import NoIssueFound from "../../admin/NoIssueFound";
import { User, MapPin, Calendar, FileText, Brain } from "lucide-react";

const IssueDetails = () => {
  const { id } = useParams();
  const { isLoading, data: issue } = useIssueDetail(id);

  if (isLoading) return <IssueDetailsLoader />;
  if (!issue) return <NoIssueFound />;

  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900">
          {issue?.title || "Issue Details"}
        </h1>
        <p className="text-sm text-gray-500">
          Report ID: <span className="font-medium">{issue?.reportId}</span>
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-8">

        {/* META INFO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetaItem icon={<MapPin size={18} />} label="Location :" value={issue?.location} />
          <MetaItem icon={<Calendar size={18} />} label="Reported On :"
            value={issue?.createdAt ? new Date(issue.createdAt).toLocaleString("en-IN") : "—"}
          />
          <MetaItem icon={<User size={18} />} label="Submitted By -" value={issue?.submittedBy} />
        </div>

        {/* BADGES */}
        <div className="flex flex-wrap gap-4">
          <IssueStatusBadge status={issue?.status} />
          <PriorityBadge priority={issue?.priority} />
        </div>

        {/* DESCRIPTION */}
        <Section title="Issue Description :" icon={<FileText size={18} />}>
          <p className="text-gray-700 leading-relaxed">
            {issue?.description}
          </p>
        </Section>

        {/* ATTACHMENT */}
        {issue?.attachment && (
          <Section title="Attached Evidence">
            <img
              src={issue.attachment}
              alt="Issue Attachment"
              className="rounded-xl border max-h-96 object-cover"
            />
          </Section>
        )}

        {/* AI ANALYSIS */}
        {(issue?.summary || issue?.aiReason) && (
          <Section title="AI Analysis" icon={<Brain size={18} />}>
            <div className="space-y-3 text-sm text-gray-700">
              {issue?.summary && (
                <p>
                  <span className="font-semibold">Summary:</span> {issue.summary}
                </p>
              )}
              {issue?.aiReason && (
                <p>
                  <span className="font-semibold">AI Reasoning:</span> {issue.aiReason}
                </p>
              )}
            </div>
          </Section>
        )}

        {/* ACTIONS */}
        <div className="border-t pt-6 flex flex-wrap gap-3">
          <ActionButton label="Verify Issue" color="blue" />
          <ActionButton label="Mark In Progress" color="yellow" />
          <ActionButton label="Resolve Issue" color="emerald" />
          <ActionButton label="Reject Issue" color="red" />
        </div>

      </div>
    </div>
  );
};

/* ---------- SMALL COMPONENTS ---------- */

const MetaItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-emerald-700">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value || "—"}</p>
    </div>
  </div>
);

const Section = ({ title, icon, children }) => (
  <div>
    <div className="flex items-center gap-2 mb-2 text-gray-800 font-semibold">
      {icon}
      {title}
    </div>
    {children}
  </div>
);

const ActionButton = ({ label, color }) => {
  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    emerald: "bg-emerald-600 hover:bg-emerald-700",
    red: "bg-red-600 hover:bg-red-700",
  };

  return (
    <button
      className={`${colors[color]} text-white px-4 py-2 cursor-pointer rounded-lg font-medium transition`}
    >
      {label}
    </button>
  );
};

export default IssueDetails;
