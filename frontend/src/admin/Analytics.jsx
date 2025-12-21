import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import useAllIssues from "../hooks/UseAllissues";

export default function Analytics() {
  const [issuesList, setIssuesList] = useState([]);
  const { isLoading, allIssues } = useAllIssues();

  useEffect(() => {
    if (allIssues?.length) {
      setIssuesList(allIssues);
    }
  }, [allIssues]);



  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }



  // Category
  const categoryData = issuesList.reduce((acc, issue) => {
    const found = acc.find((i) => i.category === issue.category);
    found
      ? found.count++
      : acc.push({ category: issue.category, count: 1 });
    return acc;
  }, []);

  // Status
  const statusColors = {
    Pending: "#F59E0B",
    "In Progress": "#8B5CF6",
    Resolved: "#10B981",
    Rejected: "#EF4444",
  };

  const statusData = Object.keys(statusColors).map((status) => ({
    name: status,
    value: issuesList.filter((i) => i.status === status).length,
    color: statusColors[status],
  }));

  // Time series
  const uniqueDates = [...new Set(issuesList.map((i) => i.date))].sort();

  const timeData = uniqueDates.map((date) => {
    const dailyIssues = issuesList.filter((i) => i.date === date);
    return {
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      issues: dailyIssues.length,
      resolved: dailyIssues.filter((i) => i.status === "Resolved").length,
    };
  });

  // Location
  const locationData = issuesList.reduce((acc, issue) => {
    if (!issue.location) return acc;
    const mainLocation = issue.location.split("–")[0].trim();
    const found = acc.find((i) => i.location === mainLocation);
    found
      ? found.count++
      : acc.push({ location: mainLocation, count: 1 });
    return acc;
  }, []);

  // Metrics
  const totalIssues = issuesList.length;
  const resolvedIssues = issuesList.filter(
    (i) => i.status === "Resolved"
  ).length;

  const resolutionRate =
    totalIssues === 0
      ? 0
      : ((resolvedIssues / totalIssues) * 100).toFixed(1);

  const pendingCount = issuesList.filter((i) =>
    ["Pending", "In Progress"].includes(i.status)
  ).length;



  return (
    <div className="space-y-6 mt-4">

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Metric
          icon={<TrendingUp className="text-blue-600" />}
          label="Total Reports"
          value={totalIssues}
        />
        <Metric
          icon={<CheckCircle className="text-green-600" />}
          label="Resolution Rate"
          value={`${resolutionRate}%`}
        />
        <Metric
          icon={<AlertTriangle className="text-yellow-600" />}
          label="Pending Action"
          value={pendingCount}
        />
        <Metric
          icon={<Clock className="text-purple-600" />}
          label="Avg Resolution Time"
          value="—"
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Category */}
        <ChartBox title="Issues by Category">
          <ResponsiveContainer height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* Status */}
        <ChartBox title="Status Distribution">
          <ResponsiveContainer height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {statusData.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* Trend */}
        <ChartBox title="Issue Trend">
          <ResponsiveContainer height={300}>
            <AreaChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                dataKey="issues"
                fill="#3B82F6"
                stroke="#3B82F6"
              />
              <Area
                dataKey="resolved"
                fill="#10B981"
                stroke="#10B981"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* Location */}
        <ChartBox title="Location Heatmap">
          <ResponsiveContainer height={300}>
            <BarChart data={locationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="location" type="category" />
              <Tooltip />
              <Bar dataKey="count" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

      </div>
    </div>
  );
}

//helper functions

function Metric({ icon, label, value }) {
  return (
    <div className="bg-white border rounded-lg p-5">
      <div className="flex justify-between mb-2">{icon}</div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

function ChartBox({ title, children }) {
  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="mb-4 font-medium">{title}</h3>
      {children}
    </div>
  );
}
