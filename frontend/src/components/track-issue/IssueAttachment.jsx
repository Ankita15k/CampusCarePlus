import { Image as ImageIcon } from "lucide-react";

const IssueAttachment = ({ image }) => {
  if (!image) return null;

  return (
    <div className="glass-card">
      <div className="section-header">
        <ImageIcon size={18} />
        <span>Attached Evidence</span>
      </div>

      <img
        src={image}
        alt="Issue attachment"
        className="track-image"
      />
    </div>
  );
};

export default IssueAttachment;
