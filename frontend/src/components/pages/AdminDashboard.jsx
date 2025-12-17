import Analytics from "../../admin/Analytics";
import IssuesTable from "../../admin/IssuesTable";
import Sidebar from "../../admin/Sidebar";
import StatsGrid from "../../admin/StatsGrid";
import Topbar from "../../admin/Topbar";


const AdminDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      
  

      <main className=" p-6 pt-10">
        <StatsGrid />
        <IssuesTable />
        <Analytics />
      </main>
    </div>
  );
};

export default AdminDashboard;
