import StatCard from "./StatCard";

const StatsGrid = () => {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <StatCard title="Total Reports" value="128" color="#1E3A8A" />
      <StatCard title="Pending" value="32" color="#FACC15" />
      <StatCard title="In Progress" value="21" color="#3B82F6" />
      <StatCard title="Resolved" value="75" color="#10B981" />
    </div>
  );
};

export default StatsGrid;