import {
  AlertTriangle,
  ShieldOff,
  Clock,
  EyeOff,
} from "lucide-react";

const problems = [
  {
    title: "Fear of Retaliation",
    desc: "Students worry about backlash, victim-blaming, or academic consequences.",
    icon: ShieldOff,
  },
  {
    title: "No Centralized System",
    desc: "Reports are scattered across emails, forms, and verbal complaints.",
    icon: AlertTriangle,
  },
  {
    title: "Delayed Administrative Action",
    desc: "Unclear workflows lead to slow or ineffective responses.",
    icon: Clock,
  },
  {
    title: "Lack of Transparency",
    desc: "Reporters receive no visibility into progress or outcomes.",
    icon: EyeOff,
  },
];

const Problem = () => {
  return (
    <section className="relative py-28 bg-gradient-to-b from-gray-50 via-white to-white overflow-hidden">
      
      {/* Decorative background accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-emerald-600 font-semibold tracking-wide mb-3">
            THE REALITY
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Campus Issues Go Unreported
          </h2>
          <p className="mt-5 text-gray-600 text-lg">
            Many serious concerns never reach the administration — not because
            they don’t matter, but because the system discourages reporting.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-100 text-emerald-700 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition">
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

        {/* Bridge to Solution */}
        <div className="mt-24 text-center max-w-2xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed">
            These challenges silence critical voices and delay action.  
            <span className="font-semibold text-emerald-700">
              {" "}Campus Care is designed to remove these barriers — safely and responsibly.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Problem;
