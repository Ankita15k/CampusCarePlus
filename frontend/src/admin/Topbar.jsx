const Topbar = () => {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6 ml-64">
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
          Hostel Admin
        </span>
        <button className="text-gray-600 hover:text-red-600">Logout</button>
      </div>
    </header>
  );
};

export default Topbar;