import "./trackIssue.css";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import IssueHeroCard from "./IssueHeroCard";
import IssueProgressTracker from "./IssueProgressTracker";
import IssueDescription from "./IssueDescription";
import IssueAttachment from "./IssueAttachment";
import { getIssueDetailByUSer } from "../../lib/apicalls";
import toast from "react-hot-toast";
import IssueNotFound from "./IssueNotFound";

const TrackIssuePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

useEffect(() => {
  const fetchIssue = async () => {
    if (!id) {
      toast.error("Invalid report ID");
      setNotFound(true);
      setLoading(false);
      return;
    }

    try {
      const res = await getIssueDetailByUSer(id);

      if (!res) {
        // toast.error("No issue found");
        setNotFound(true);
      } else {
        setIssue(res);
        setNotFound(false);
      }
    } catch (error) {
      // toast.error("Failed to fetch issue");
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  fetchIssue();
}, [id]);

  return (
    <div className="track-bg">
      <div className="track-container">
        <header className="track-header">
          <button className="back-btn" onClick={() => navigate("/")}>
            <ArrowLeft size={16} /> Home
          </button>
          <h1>Track Your Issue</h1>
        </header>

        {/* 🔄 Loading Bar */}
        {loading && (
          <div className="loading-wrapper">
            <div className="loading-bar" />
            <p>Fetching issue details...</p>
          </div>
        )}

        {!loading && notFound && <IssueNotFound id={id} />}

        {/* 📄 Issue Data */}
        {!loading && issue && (
          <>
            <IssueHeroCard issue={issue} />
            <IssueProgressTracker issue={issue} />

            <div className="two-column">
              <IssueDescription description={issue.description} />
              {issue.attachment && (
                <IssueAttachment image={issue.attachment} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrackIssuePage;
