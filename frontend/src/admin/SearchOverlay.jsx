import { X } from "lucide-react";
import IssueSearchTable from "./IssueSearchTable";

const SearchOverlay = ({ query, results, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Search Results
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Showing results for "<strong>{query}</strong>"
        </p>

        <IssueSearchTable results={results} />
      </div>
    </div>
  );
};

export default SearchOverlay;
