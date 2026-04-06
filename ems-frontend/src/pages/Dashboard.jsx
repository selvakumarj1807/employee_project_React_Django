import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Form Builder", path: "/form-builder", icon: "📝" },
    { name: "Create Employee", path: "/employee-create", icon: "👤" },
    { name: "Employees", path: "/employees", icon: "👥" },
  ];

  useEffect(() => {
    api.get("auth/profile/")
      .then((res) => setProfile(res.data))
      .catch(() => logout());
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const changePassword = async () => {
    const old_password = prompt("Enter Old Password");
    const new_password = prompt("Enter New Password");
    if (!old_password || !new_password) return;

    try {
      await api.put("auth/change-password/", { old_password, new_password });
      alert("Password changed successfully");
    } catch {
      alert("Password change failed");
    }
  };

  return (
    <>
      <style>{`
        :root {
          --primary: #4f46e5;
          --sidebar-bg: #0f172a;
          --body-bg: #f8fafc;
          --card-border: #e2e8f0;
          --text-main: #1e293b;
          --text-muted: #64748b;
        }

        * { box-sizing: border-box; font-family: 'Inter', system-ui, sans-serif; }
        body { margin: 0; background: var(--body-bg); color: var(--text-main); }

        .dashboard-wrapper { display: flex; min-height: 100vh; }

        /* SIDEBAR */
        .sidebar {
          width: 280px;
          background: var(--sidebar-bg);
          color: #f8fafc;
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .sidebar-brand {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
          padding-left: 10px;
        }

        .brand-icon {
          width: 32px; height: 32px;
          background: var(--primary);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }

        .nav-item {
          text-decoration: none;
          color: #94a3b8;
          padding: 12px 16px;
          border-radius: 12px;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: 0.2s;
          font-weight: 500;
        }

        .nav-item:hover {
          background: rgba(255,255,255,0.05);
          color: white;
        }

        .nav-active {
          background: var(--primary) !important;
          color: white !important;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }

        /* MAIN CONTENT */
        .main-content { flex: 1; padding: 30px; overflow-y: auto; }

        .top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .page-title h2 { margin: 0; font-size: 24px; font-weight: 700; }
        .page-title p { margin: 4px 0 0; color: var(--text-muted); font-size: 14px; }

        /* PROFILE DROPDOWN */
        .user-menu-container { position: relative; }
        .user-trigger {
          display: flex; align-items: center; gap: 10px;
          padding: 6px 14px;
          background: white;
          border: 1px solid var(--card-border);
          border-radius: 30px;
          cursor: pointer;
          transition: 0.2s;
        }
        .user-trigger:hover { border-color: var(--primary); }
        .avatar-circle {
          width: 32px; height: 32px;
          background: #e2e8f0;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700; color: var(--primary);
        }

        .dropdown-panel {
          position: absolute; right: 0; top: 50px;
          width: 200px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          border: 1px solid var(--card-border);
          overflow: hidden;
          z-index: 50;
        }

        .dropdown-item {
          width: 100%; border: none; background: none;
          padding: 12px 16px; text-align: left;
          font-size: 14px; color: var(--text-main);
          cursor: pointer; display: flex; align-items: center; gap: 10px;
        }
        .dropdown-item:hover { background: #f1f5f9; }
        .logout-btn { color: #ef4444; }

        /* STAT CARDS */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
        }

        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid var(--card-border);
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.2s;
        }
        .stat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 20px -5px rgba(0,0,0,0.05); }

        .stat-icon {
          width: 54px; height: 54px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
        }

        .blue-icon { background: #eef2ff; color: #4f46e5; }
        .green-icon { background: #f0fdf4; color: #22c55e; }
        .purple-icon { background: #faf5ff; color: #a855f7; }
        .orange-icon { background: #fff7ed; color: #f97316; }

        .stat-info h3 { margin: 0; font-size: 28px; font-weight: 800; color: var(--text-main); }
        .stat-info p { margin: 2px 0 0; font-size: 14px; color: var(--text-muted); font-weight: 500; }

        @media (max-width: 900px) {
          .sidebar { 
            position: fixed; left: ${isMobileMenuOpen ? "0" : "-280px"}; 
            height: 100vh;
          }
          .mobile-toggle { display: block; }
        }
      `}</style>

      <div className="dashboard-wrapper">
        {/* SIDEBAR */}
        <nav className="sidebar">
          <div className="sidebar-brand">
            <div className="brand-icon">E</div>
            <span>EMS PORTAL</span>
          </div>

          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? "nav-active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* MAIN CONTENT */}
        <main className="main-content">
          <header className="top-nav">
            <div className="page-title">
              <h2>Dashboard Overview</h2>
              <p>Welcome back, {profile?.username || "Admin"}</p>
            </div>

            <div className="user-menu-container">
              <div 
                className="user-trigger" 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="avatar-circle">
                  {(profile?.username || "A").charAt(0).toUpperCase()}
                </div>
                <span>{profile?.username || "Loading..."}</span>
                <span style={{ fontSize: '10px' }}>▼</span>
              </div>

              {showProfileMenu && (
                <div className="dropdown-panel">
                  <button className="dropdown-item" onClick={() => navigate("/profile")}>
                    👤 My Profile
                  </button>
                  <button className="dropdown-item" onClick={() => navigate("/change-password")}>
                    🔑 Change Password
                  </button>
                  <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '4px 0' }} />
                  <button className="dropdown-item logout-btn" onClick={logout}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </header>

          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon blue-icon">👥</div>
              <div className="stat-info">
                <h3>12</h3>
                <p>Total Employees</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green-icon">📝</div>
              <div className="stat-info">
                <h3>5</h3>
                <p>Active Forms</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple-icon">🏢</div>
              <div className="stat-info">
                <h3>3</h3>
                <p>Departments</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange-icon">⏳</div>
              <div className="stat-info">
                <h3>4</h3>
                <p>Pending Requests</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Dashboard;