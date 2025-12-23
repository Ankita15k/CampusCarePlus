import { Search } from "lucide-react";

const IssueSearchBar = ({ value, onChange, onOpen }) => {
  return (
    <div className="sticky top-0 z-10 p-4  mb-2 w-full">
      <div className="relative w-full">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            onOpen(true);
          }}
          placeholder="Search issues by title..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-600"
        />
      </div>
    </div>
  );
};

export default IssueSearchBar;
