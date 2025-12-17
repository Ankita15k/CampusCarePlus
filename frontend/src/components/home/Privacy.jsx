import {
  Lock,
  ShieldCheck,
  Database,
  Bell,
  BadgeCheck,
} from "lucide-react";

const privacyPoints = [
  {
    title: "Anonymous by Design",
    desc: "No identity tracking, no personal profiling, and no unnecessary data collection.",
    icon: Lock,
  },
  {
    title: "Secure Authentication",
    desc: "Firebase Authentication ensures only authorized admins can access reports.",
    icon: ShieldCheck,
  },
  {
    title: "Encrypted Cloud Storage",
    desc: "All reports are securely stored in Firebase Firestore with strict access rules.",
    icon: Database,
  },
  {
    title: "Verified Submissions",
    desc: "Google reCAPTCHA protects the platform from spam and automated abuse.",
    icon: BadgeCheck,
  },
  {
    title: "Controlled Notifications",
    desc: "Firebase Cloud Messaging delivers updates without exposing user identity.",
    icon: Bell,
  },
];

const Privacy = () => {
  return (
    <section className="relative py-28 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-emerald-700 font-semibold tracking-wide mb-3">
            PRIVACY & SECURITY
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-900">
            Privacy Comes First
          </h2>
          <p className="mt-5 text-emerald-800 text-lg">
            Campus Care is built with a privacy-first architecture — ensuring
            sensitive issues can be reported safely, securely, and responsibly.
          </p>
        </div>

        {/* Security Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {privacyPoints.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm hover:shadow-lg transition"
              >
                <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Icon size={28} />
                </div>

                <h3 className="text-lg font-semibold text-emerald-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance */}
        <div className="mt-24 text-center max-w-2xl mx-auto">
          <p className="text-lg text-gray-700">
            Designed to meet modern security standards while protecting
            student anonymity —
            <span className="font-semibold text-emerald-800">
              {" "}because trust is non-negotiable.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Privacy;
