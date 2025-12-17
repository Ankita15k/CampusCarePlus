import { ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-28 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-800 to-emerald-700" />
      <div className="absolute inset-0 bg-[url('/images/hero.png')] bg-cover bg-center opacity-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">

        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-2 text-emerald-200 mb-4">
          <ShieldCheck size={20} />
          <span className="text-sm font-medium">
            Secure • Anonymous • Confidential
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          See an Issue? Don’t Stay Silent.
        </h2>

        <p className="mt-6 text-emerald-100 text-lg max-w-2xl mx-auto">
          Reporting takes less than two minutes and your identity is never
          revealed. Campus Care ensures your concern is heard safely.
        </p>

        <button
          onClick={() => navigate("/issues/report")}
          className="mt-10 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-10 py-4 rounded-xl font-semibold text-lg transition shadow-lg"
        >
          Report an Issue Now
          <ArrowRight size={20} />
        </button>

        <p className="mt-6 text-sm text-emerald-200">
          No sign-up required • Protected by modern security standards
        </p>
      </div>
    </section>
  );
};

export default CTA;
