import React, { useState } from "react";
import AdminTrackIssue from "../../admin/AdminTrackIssue";
import Analytics from "../../admin/Analytics";
import IssuesTable from "../../admin/IssuesTable";
import Sidebar from "../../admin/Sidebar";
import StatsGrid from "../../admin/StatsGrid";
import Topbar from "../../admin/Topbar";

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Overlay */}
      {open && <AdminTrackIssue onClose={() => setOpen(false)} />}

      <main className="p-6 pt-10">
        <div className="flex justify-end">
          <button
          onClick={() => setOpen(true)}
          className="mb-6 bg-emerald-700 text-white px-4 cursor-pointer py-2 rounded-xl hover:bg-emerald-800 transition"
        >
          Track an Issue here
        </button>
        </div>

        <StatsGrid />
        <IssuesTable />
        <Analytics />
      </main>
    </div>
  );
};

export default AdminDashboard;
