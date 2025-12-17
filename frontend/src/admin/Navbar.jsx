import { Menu, LogOut, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logout from "../utils/logout";
import toast from "react-hot-toast";
import { useState } from "react";


const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false)

  const handleLogout = async () => {
    setisLoading(true)
    const success = await logout();
    const toastId = toast.loading("Logging out...")
    if (success) {
      navigate("/admin/login");

      toast.success("Logged out successfully",{id:toastId})
      

    }else
      {  toast.error("Failed to logout",{id:toastId})
    setisLoading(false)}

  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur border-b border-gray-200 z-30">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Hamburger (mobile) */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu size={22} />
          </button>

          {/* Brand */}
          <h1 className="text-lg md:text-xl font-extrabold tracking-tight text-blue-900">
            CampusCare<span className="text-emerald-500">+</span>
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Role badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium">
            <ShieldCheck size={16} />
            Admin
          </div>

          {/* Logout */}
          <button
  onClick={handleLogout}
  disabled={isLoading}
  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition disabled:opacity-50"
>
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
