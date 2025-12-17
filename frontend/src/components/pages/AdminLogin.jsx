import { useState } from "react";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import "./styles/AdminLogin.css";
import forgotPassword from "../../utils/forgetPassword";
import toast from "react-hot-toast";
import login from "../../utils/login";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const login_data = await login(email, password);

    if (login_data) {
      toast.success("Logged in successfully");
      navigate("/admin/dashboard");
    }

    setLoading(false);
  };

  // Forgot password
  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }

    const value = await forgotPassword(email);
    if (value) toast.success(value);
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-container">

        {/* LEFT PANEL */}
        <div className="admin-login-left">
          <ShieldCheck size={46} className="shield-icon" />

          <h1 className="logo">
            Campus<span>Care</span>
          </h1>

          <p className="tagline">
            Secure administration for a safer campus ecosystem
          </p>

          <ul className="features">
            <li>Anonymous issue monitoring</li>
            <li>Admin-verified actions</li>
            <li>Privacy-first architecture</li>
            <li>Trusted & secure access</li>
          </ul>

          <button
            className="home-btn"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="admin-login-right">
          <h2 className="title">Admin Login</h2>
          <p className="subtitle">Authorized personnel only</p>

          <form onSubmit={handleLogin} className="login-form">

            {/* Email */}
            <div className="input-group">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@college.edu"
                required
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Forgot */}
            <div className="forgot">
              <button type="button" onClick={handleForgotPassword}>
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="login-btn"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
