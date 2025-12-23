import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ShieldCheck, LogIn, FlagTriangleRight, BadgeAlert } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const NavLink = ({ label, sectionId }) => {
    const handleScroll = () => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      setOpen(false);
    };

    return (
      <button
        onClick={handleScroll}
        className="text-gray-700 hover:text-emerald-700 cursor-pointer transition font-medium"
      >
        {label}
      </button>
    );
  };


  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img className="text-emerald-600 w-7 h-7" src="/icons/icon-512.png"/>
            <span className="text-xl font-bold text-gray-900">
              Campus<span className="text-emerald-600">Care</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink label="Track Issue" sectionId="track-issue" />
            <NavLink label="How It Works" sectionId="how-it-works" />
            <NavLink label="Categories" sectionId="categories" />
            <NavLink label="Privacy" sectionId="privacy" />

            <button
              onClick={() => navigate("/admin/login")}
              className="flex items-center gap-2 border border-emerald-700 text-emerald-700 px-4 py-2 cursor-pointer rounded-lg hover:bg-emerald-700 hover:text-white transition"
            >
              <LogIn size={18} />
              Admin Login
            </button>

            <button
              onClick={() => navigate("/issues/report")}
              className="flex items-center gap-2 bg-emerald-600 border border-emerald-700 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-white hover:text-emerald-700 transition"
            >
              <BadgeAlert />
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
        className={`md:hidden bg-white border-t overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          <NavLink label="Features" sectionId="features" />
          <NavLink label="How It Works" sectionId="how-it-works" />
          <NavLink label="Categories" sectionId="categories" />
          <NavLink label="Privacy" sectionId="privacy" />

          <button
            onClick={() => navigate("/admin/login")}
            className="flex items-center justify-center gap-2 border border-emerald-700 text-emerald-700 px-4 py-2 rounded-lg"
          >
            <LogIn size={18} />
            Admin Login
          </button>

          <button
            onClick={() => navigate("/issues/report")}
            className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            <FlagTriangleRight size={18} />
            Report Issue
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;