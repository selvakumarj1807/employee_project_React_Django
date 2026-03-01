import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        form
      );

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(135deg, #667eea, #764ba2);
          height: 100vh;
        }

        .login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          background: #fff;
          border-radius: 15px;
          padding: 35px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          animation: fadeIn 0.6s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .login-title {
          text-align: center;
          margin-bottom: 25px;
          font-weight: 700;
          color: #333;
        }

        .form-control {
          height: 45px;
          border-radius: 10px;
          border: 1px solid #ddd;
          transition: 0.3s;
        }

        .form-control:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 0.15rem rgba(102,126,234,0.25);
        }

        .login-btn {
          width: 100%;
          height: 45px;
          border-radius: 10px;
          font-weight: 600;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          transition: 0.3s;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .error-text {
          color: red;
          font-size: 14px;
          text-align: center;
          margin-bottom: 10px;
        }

        @media (max-width: 576px) {
          .login-card {
            padding: 25px;
          }
        }
      `}</style>

      <div className="login-wrapper">
        <div className="login-card">
          <h3 className="login-title">Welcome Back</h3>

          {error && <div className="error-text">{error}</div>}

          <input
            className="form-control mb-3"
            placeholder="Username"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            className="btn login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;