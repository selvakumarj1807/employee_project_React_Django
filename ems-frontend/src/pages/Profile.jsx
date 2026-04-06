import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("auth/profile/")
      .then((res) => setProfile(res.data))
      .catch(() => navigate("/"));
  }, [navigate]);

  if (!profile) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Inter, sans-serif', color: '#64748b' }}>
      Loading account details...
    </div>
  );

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

        * { box-sizing: border-box; font-family: 'Inter', system-ui, sans-serif; }
        
        body {
          margin: 0;
          background-color: var(--bg);
          background-image: radial-gradient(circle at 2px 2px, #e2e8f0 1px, transparent 0);
          background-size: 40px 40px;
        }

        .profile-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .profile-card {
          background: white;
          width: 100%;
          max-width: 480px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
          border: 1px solid var(--card-border);
          animation: slideUp 0.4s ease-out;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .card-header {
          background: #f1f5f9;
          padding: 20px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--card-border);
        }

        .back-link {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }

        .back-link:hover { color: var(--primary); }

        .profile-content {
          padding: 40px 30px;
          text-align: center;
        }

        .avatar-large {
          width: 100px;
          height: 100px;
          background: var(--primary);
          color: white;
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          font-weight: 800;
          margin: 0 auto 20px;
          box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);
        }

        .user-meta h1 {
          margin: 0;
          font-size: 24px;
          color: var(--text-main);
          font-weight: 700;
        }

        .user-meta p {
          margin: 5px 0 30px;
          color: var(--text-muted);
          font-size: 14px;
        }

        .info-grid {
          text-align: left;
          background: #f8fafc;
          border-radius: 16px;
          padding: 10px 20px;
          border: 1px solid var(--card-border);
        }

        .info-item {
          padding: 15px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .info-item:not(:last-child) {
          border-bottom: 1px solid #eef2f6;
        }

        .info-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .info-value {
          font-size: 15px;
          font-weight: 500;
          color: var(--text-main);
        }

        .edit-btn {
          margin-top: 30px;
          width: 100%;
          padding: 12px;
          background: white;
          border: 1px solid var(--card-border);
          border-radius: 12px;
          color: var(--text-main);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .edit-btn:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }

        @media (max-width: 480px) {
          .profile-card { border-radius: 0; min-height: 100vh; }
        }
      `}</style>

      <div className="profile-container">
        <div className="profile-card">
          <div className="card-header">
            <button className="back-link" onClick={() => navigate("/dashboard")}>
              ← Back to Dashboard
            </button>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8' }}>ACCOUNT</span>
          </div>

          <div className="profile-content">
            <div className="avatar-large">
              {profile.username?.charAt(0).toUpperCase()}
            </div>

            <div className="user-meta">
              <h1>{profile.username}</h1>
              <p>Employee Portal Member</p>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Username</span>
                <span className="info-value">{profile.username}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email Address</span>
                <span className="info-value">{profile.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Account Status</span>
                <span className="info-value" style={{ color: '#10b981' }}>● Active</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;