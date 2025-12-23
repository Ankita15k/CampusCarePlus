import { Image as ImageIcon } from "lucide-react";

const IssueAttachment = ({ image }) => {
  if (!image) return null;

  return (
    <div className="glass-card">
      <div className="flex items-center gap-2 font-semibold text-gray-900">
        <ImageIcon size={18} />
        <span>Attached Evidence : </span>
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
