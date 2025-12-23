import { BadgeCheck, CheckCheck, CircleCheck, ClockFading, XCircle } from "lucide-react";

const IssueProgressTracker = ({ issue }) => {
  if (!issue) return null;

  const {
    status,
    inProgressAt,
    processingRemark,
    resolvingRemark,
    rejectionemark,
  } = issue;

  return (
    <div className="glass-card">
      <h3>Issue Progress : </h3>

      <div className="progress-line">
        <Step icon={<CircleCheck />} label="Created" done />

        <Step
          icon={<ClockFading />}
          label="In Progress"
          done={!!inProgressAt}
          remark={processingRemark}
        />

        {status === "Resolved" && (
          <Step
            icon={<BadgeCheck />}
            label="Resolved"
            done
            success
            remark={resolvingRemark}
          />
        )}

        {status === "Rejected" && (
          <Step
            icon={<XCircle />}
            label="Rejected"
            done
            error
            remark={rejectionemark}
          />
        )}
      </div>
    </div>
  );
};

const Step = ({ icon, label, done, success, error, remark }) => {
  const cls = success
    ? "step success"
    : error
    ? "step error"
    : done
    ? "step active"
    : "step";

  return (
    <div className={cls}>
      <div className="step-icon">{icon}</div>
      <p>{label}</p>
      {remark && <span className="remark">{remark}</span>}
    </div>
  );
};

export default IssueProgressTracker;
