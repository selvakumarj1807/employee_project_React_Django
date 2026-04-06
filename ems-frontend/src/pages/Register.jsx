import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevents page reload
    setLoading(true);
    setError("");

    try {
      await api.post("auth/register/", form);
      alert("Registration Successful! Please log in.");
      navigate("/");
    } catch (err) {
      setError("Registration failed. Please check your details.");
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
          padding: 20px;
        }

        .register-card {
          background: white;
          width: 100%;
          max-width: 440px;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
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
          margin-bottom: 18px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-main);
          margin-bottom: 6px;
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

        .error-message {
          background: #fef2f2;
          color: #dc2626;
          padding: 10px;
          border-radius: 8px;
          font-size: 13px;
          margin-bottom: 20px;
          text-align: center;
          border: 1px solid #fee2e2;
        }

        .submit-btn {
          width: 100%;
          padding: 13px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          margin-top: 10px;
        }

        .submit-btn:hover {
          background: var(--primary-hover);
        }

        .submit-btn:active {
          transform: scale(0.98);
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

        @media(max-width: 480px) {
          .register-card {
            padding: 30px 20px;
          }
        }
      `}</style>

      <div className="auth-page">
        <div className="register-card">
          <div className="header">
            <h1>Create Account</h1>
            <p>Join the employee network today</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="input-field"
                placeholder="Choose a username"
                required
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="input-field"
                placeholder="name@company.com"
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Create a strong password"
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <div className="footer-links">
            Already have an account? <Link to="/">Sign in</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;