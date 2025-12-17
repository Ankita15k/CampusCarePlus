import {
  FileText,
  ShieldCheck,
  Settings,
  CheckCircle,
} from "lucide-react";
import "./styles/working.css";

const steps = [
  {
    title: "Submit Anonymously",
    desc: "Report issues safely without revealing your identity.",
    icon: FileText,
  },
  {
    title: "Admin Verification",
    desc: "Authorized administrators review and validate the report.",
    icon: ShieldCheck,
  },
  {
    title: "Case Processing",
    desc: "The issue is investigated and appropriate action is taken.",
    icon: Settings,
  },
  {
    title: "Resolution Update",
    desc: "Track progress and resolution transparently.",
    icon: CheckCircle,
  },
];

const HowItWorks = () => {
  return (
    <section className="howitworks-section py-28">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-emerald-600 font-semibold tracking-wide mb-3">
            WORKFLOW
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How Campus Care Works
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            A structured, transparent workflow that protects reporters and
            ensures accountability at every stage.
          </p>
        </div>

        {/* Flow */}
        <div className="flow-container">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flow-item">
                <div className="flow-icon">
                  <Icon size={34} />
                  <span className="flow-step">{i + 1}</span>
                </div>

                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-2 text-gray-600 text-sm px-4">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
