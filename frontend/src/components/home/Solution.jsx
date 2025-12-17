import {
  UserX,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

const features = [
  {
    title: "100% Anonymous Reporting",
    desc: "Submit issues without revealing identity. No tracking, no personal data, complete protection.",
    icon: UserX,
  },
  {
    title: "Admin-Verified Actions",
    desc: "Only authorized administrators can review, verify, and take action on reports.",
    icon: ShieldCheck,
  },
  {
    title: "Actionable Insights",
    desc: "Gain real-time visibility into recurring issues, trends, and response effectiveness.",
    icon: BarChart3,
  },
];

const Solution = () => {
  return (
    <section className="relative py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-emerald-600 font-semibold tracking-wide mb-3">
            THE SOLUTION
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            A Safer, Smarter Way to Be Heard
          </h2>
          <p className="mt-5 text-gray-600 text-lg">
            Campus Care provides a secure, structured, and anonymous platform
            where student voices lead to measurable, accountable action.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition">
                  <Icon size={28} />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Emphasis */}
        <div className="mt-20 text-center">
          <p className="text-lg text-gray-700">
            Built with privacy, compliance, and accountability at its core —
            <span className="font-semibold text-emerald-700">
              {" "}Campus Care turns concerns into action.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Solution;
