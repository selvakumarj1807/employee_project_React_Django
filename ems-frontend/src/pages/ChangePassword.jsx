import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "", // Added for better UX
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (form.new_password !== form.confirm_password) {
      return setMessage({ type: "error", text: "New passwords do not match" });
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await api.put("auth/change-password/", {
        old_password: form.old_password,
        new_password: form.new_password
      });
      setMessage({ type: "success", text: "Password updated successfully!" });
      setForm({ old_password: "", new_password: "", confirm_password: "" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to change password. Check your old password." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        :root {
          --primary: #4f46e5;
          --bg: #f8fafc;
          --text-main: #1e293b;
          --text-muted: #64748b;
          --card-border: #e2e8f0;
        }

        .settings-page {
          min-height: 100vh;
          background: var(--bg);
          padding: 40px 20px;
          display: flex;
          justify-content: center;
          font-family: 'Inter', sans-serif;
        }

        .settings-card {
          width: 100%;
          max-width: 500px;
          background: white;
          border-radius: 20px;
          border: 1px solid var(--card-border);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .card-header {
          padding: 24px 32px;
          border-bottom: 1px solid var(--card-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-header h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: var(--text-main);
        }

        .back-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }

        .back-btn:hover { color: var(--primary); }

        .card-body { padding: 32px; }

        .form-group { margin-bottom: 20px; }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 8px;
        }

        .input-control {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          font-size: 15px;
          transition: all 0.2s;
          box-sizing: border-box;
        }

        .input-control:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
        }

        .alert {
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          margin-bottom: 24px;
          text-align: center;
        }

        .alert-error { background: #fef2f2; color: #dc2626; border: 1px solid #fee2e2; }
        .alert-success { background: #f0fdf4; color: #16a34a; border: 1px solid #dcfce7; }

        .submit-btn {
          width: 100%;
          padding: 13px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .submit-btn:hover { background: #4338ca; }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .password-hint {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 6px;
        }
      `}</style>

      <div className="settings-page">
        <div className="settings-card">
          <div className="card-header">
            <h2>Security Settings</h2>
            <button className="back-btn" onClick={() => navigate("/dashboard")}>
              ✕ Close
            </button>
          </div>

          <div className="card-body">
            {message.text && (
              <div className={`alert alert-${message.type}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleChangePassword}>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  className="input-control"
                  placeholder="Enter current password"
                  required
                  value={form.old_password}
                  onChange={(e) => setForm({ ...form, old_password: e.target.value })}
                />
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', margin: '24px 0' }}></div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  className="input-control"
                  placeholder="Enter new password"
                  required
                  value={form.new_password}
                  onChange={(e) => setForm({ ...form, new_password: e.target.value })}
                />
                <p className="password-hint">Use at least 8 characters with numbers.</p>
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  className="input-control"
                  placeholder="Repeat new password"
                  required
                  value={form.confirm_password}
                  onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;