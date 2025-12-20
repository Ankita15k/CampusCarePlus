import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Layout from "./admin/Layout";

import Analytics from "./admin/Analytics";
import AdminDashboard from "./components/pages/AdminDashboard";
import Issues from "./components/pages/Issues";
import IssueDetails from "./components/pages/IssueDetails";
import SubmitIssue from "./components/pages/SubmitIssue";
import AdminLogin from "./components/pages/AdminLogin";
import ProtectedRoute from "./utils/ProtectedRoute";
import Settings from "./admin/Settings";
import { getAuthHeaders } from "./utils/getAuthtoken";



const App = () => {

  
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/issues/report" element={<SubmitIssue />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="issues" element={<Issues />} />
        <Route path="issues/:id" element={<IssueDetails />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default App;
