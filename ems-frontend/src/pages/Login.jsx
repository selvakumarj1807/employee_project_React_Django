import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Added to handle form submission properly
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login/", form);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        :root {
          --primary: #4f46e5;
          --primary-hover: #4338ca;
          --bg: #f8fafc;
          --text-main: #1e293b;
          --text-muted: #64748b;
        }

        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg);
          background-image: radial-gradient(circle at 2px 2px, #e2e8f0 1px, transparent 0);
          background-size: 40px 40px;
          font-family: 'Inter', system-ui, sans-serif;
        }

        .login-card {
          background: white;
          width: 100%;
          max-width: 400px;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .header {
          text-align: center;
          margin-bottom: 32px;
        }

        .logo-box {
          width: 48px;
          height: 48px;
          background: var(--primary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: white;
          font-weight: bold;
          font-size: 24px;
        }

        .header h1 {
          color: var(--text-main);
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }

        .header p {
          color: var(--text-muted);
          font-size: 14px;
          margin-top: 8px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-main);
          margin-bottom: 8px;
        }

        .input-wrapper {
          position: relative;
        }

        .input-field {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          font-size: 15px;
          transition: all 0.2s;
          box-sizing: border-box;
        }

        .input-field:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
        }

        .error-banner {
          background: #fef2f2;
          color: #dc2626;
          padding: 12px;
          border-radius: 8px;
          font-size: 13px;
          margin-bottom: 20px;
          border: 1px solid #fee2e2;
          text-align: center;
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          margin-top: 10px;
        }

        .submit-btn:hover {
          background: var(--primary-hover);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .footer-links {
          margin-top: 24px;
          text-align: center;
          font-size: 14px;
          color: var(--text-muted);
        }

        .footer-links a {
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
        }

        .footer-links a:hover {
          text-decoration: underline;
        }

        .flex-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-muted);
        }
      `}</style>

      <div className="auth-page">
        <div className="login-card">
          <div className="header">
            <h1>Welcome Back</h1>
            <p>Enter your credentials to access your portal</p>
          </div>

          {error && <div className="error-banner">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. johndoe"
                  required
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••"
                  required
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            <div className="flex-row">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <div className="footer-links" style={{marginTop: 0}}>
                <a href="#">Forgot password?</a>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="footer-links">
            Don't have an account? <Link to="/register">Create an account</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;