import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ShieldCheck, LogIn } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const NavLink = ({ label, href }) => (
    <a
      href={href}
      className="text-gray-700 hover:text-emerald-700 transition font-medium"
      onClick={() => setOpen(false)}
    >
      {label}
    </a>
  );

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <ShieldCheck className="text-emerald-600 w-7 h-7" />
            <span className="text-xl font-bold text-gray-900">
              Campus<span className="text-emerald-600">Care</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink label="Features" href="#features" />
            <NavLink label="How It Works" href="#how-it-works" />
            <NavLink label="Categories" href="#categories" />
            <NavLink label="Privacy" href="#privacy" />

            <button
              onClick={() => navigate("/admin/login")}
              className="flex items-center gap-2 border border-emerald-700 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-700 hover:text-white transition"
            >
              <LogIn size={18} />
              Admin Login
            </button>

            <button
              onClick={() => navigate("/issues/report")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg transition font-semibold"
            >
              Report Issue
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          <NavLink label="Features" href="#features" />
          <NavLink label="How It Works" href="#how-it-works" />
          <NavLink label="Categories" href="#categories" />
          <NavLink label="Privacy" href="#privacy" />

          <button
            onClick={() => navigate("/admin/login")}
            className="flex items-center justify-center gap-2 border border-emerald-700 text-emerald-700 px-4 py-2 rounded-lg"
          >
            <LogIn size={18} />
            Admin Login
          </button>

          <button
            onClick={() => navigate("/issues/report")}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Report Issue
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
