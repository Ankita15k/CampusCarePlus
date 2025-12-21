import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import IssueStatusBadge from "./IssueStatusBadge";
import useAllIssues from "../hooks/UseAllissues";
import { useEffect, useState } from "react";


const IssuesTable = () => {
  const [issuesList, setissuesList] = useState([]);
  const { isLoading: Loading, allIssues } = useAllIssues();
  
  
  
  useEffect(() => {
    
    if(allIssues && allIssues.length >0){
      setissuesList(allIssues)
     console.log(allIssues)
    } 
    
    

    
  }, [allIssues])
  



  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow mt-8 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-4">ID</th>
            <th>Category</th>
            <th>Location</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {issuesList.map((issue) => (
            <tr key={issue.id} className="border-t">
              <td className="p-4">{issue.id}</td>
              <td>{issue.category}</td>
              <td>{issue.location}</td>
              <td>
                <IssueStatusBadge status={issue.status} />
              </td>
              <td>{issue.date}</td>
              <td>
                <button
                  className="flex items-center gap-1.5 text-sm text-blue-600 cursor-pointer hover:underline"
                  onClick={() => navigate(`/admin/issues/${issue.id}`)}
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuesTable;
