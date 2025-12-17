import { ShieldCheck, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./styles/hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      {/* Background */}
      <div className="hero-bg" />
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-14 items-center">

        {/* Left */}
        <div>
          <div className="flex items-center gap-2 text-emerald-300 mb-4">
            <ShieldCheck size={20} />
            <span className="text-sm font-medium">
              Anonymous • Secure • Confidential
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-md">
            Making Campuses <br />
            <span className="text-emerald-300">Safer & More Transparent</span>
          </h1>

          <p className="mt-6 text-lg text-emerald-50 max-w-xl">
            Campus Care provides a secure and anonymous platform for reporting
            campus-related concerns — helping institutions act responsibly,
            ethically, and on time.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/issues/report")}
              className="hero-btn-primary"
            >
              Report an Issue
            </button>

            <button
              onClick={() => navigate("/admin/login")}
              className="hero-btn-secondary"
            >
              Admin Login
            </button>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-emerald-200">
            <Lock size={16} />
            Privacy-first • Secured with modern cloud infrastructure
          </div>
        </div>

        {/* Right */}
        <div className="hidden md:flex justify-center">
          <div className="hero-card max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              Why Campus Care?
            </h3>
            <ul className="space-y-3 text-emerald-100 text-sm">
              <li>• Anonymous reporting without fear</li>
              <li>• Early detection of campus risks</li>
              <li>• Faster resolution & accountability</li>
              <li>• Secure admin dashboards</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
