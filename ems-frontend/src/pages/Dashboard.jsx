import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const menu = [
    { name: "Form Builder", path: "/form-builder" },
    { name: "Create Employee", path: "/employee-create" },
    { name: "Employees", path: "/employees" },
  ];

  /* ===================== LOAD PROFILE ===================== */

  useEffect(() => {
    api
      .get("auth/profile/")
      .then((res) => setProfile(res.data))
      .catch(() => logout());
  }, []);

  /* ===================== LOGOUT ===================== */

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  /* ===================== CHANGE PASSWORD ===================== */

  const changePassword = async () => {
    const old_password = prompt("Enter Old Password");
    const new_password = prompt("Enter New Password");

    if (!old_password || !new_password) return;

    try {
      await api.put("auth/change-password/", {
        old_password,
        new_password,
      });

      alert("Password changed successfully");
    } catch {
      alert("Password change failed");
    }
  };

  return (
    <>
      <style>{`

      *{
        box-sizing:border-box;
        font-family:"Segoe UI",sans-serif;
      }

      body{
        margin:0;
        background:#f4f6f9;
      }

      .layout{
        display:flex;
        min-height:100vh;
      }

      /* SIDEBAR */

      .sidebar{
        width:260px;
        background:linear-gradient(180deg,#1f2937,#111827);
        color:white;
        padding:25px 20px;
        transition:0.3s;
      }

      .logo{
        font-size:22px;
        font-weight:700;
        margin-bottom:25px;
        border-bottom:1px solid rgba(255,255,255,0.1);
        padding-bottom:10px;
      }

      .menu-link{
        display:block;
        padding:12px 15px;
        margin-bottom:10px;
        border-radius:10px;
        text-decoration:none;
        color:#d1d5db;
        transition:0.25s;
      }

      .menu-link:hover{
        background:rgba(255,255,255,0.08);
        color:white;
        transform:translateX(5px);
      }

      .active-link{
        background:#4f46e5;
        color:white !important;
        font-weight:600;
      }

      /* CONTENT */

      .content{
        flex:1;
        padding:25px;
      }

      /* TOPBAR */

      .topbar{
        background:white;
        padding:12px 18px;
        border-radius:12px;
        margin-bottom:20px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        box-shadow:0 3px 12px rgba(0,0,0,0.05);
      }

      .menu-btn{
        border:none;
        background:#4f46e5;
        color:white;
        padding:8px 14px;
        border-radius:8px;
        font-size:16px;
        display:none;
      }

      /* PROFILE */

      .profile-box{
        position:relative;
        cursor:pointer;
        font-weight:600;
      }

      .profile-menu{
        position:absolute;
        right:0;
        top:40px;
        background:white;
        border-radius:10px;
        box-shadow:0 5px 15px rgba(0,0,0,0.1);
        overflow:hidden;
      }

      .profile-menu button{
        display:block;
        width:180px;
        border:none;
        padding:10px 15px;
        background:white;
        text-align:left;
        cursor:pointer;
      }

      .profile-menu button:hover{
        background:#f1f5f9;
      }

      /* CARDS */

      .grid{
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
        gap:20px;
      }

      .card{
        background:white;
        padding:25px;
        border-radius:15px;
        box-shadow:0 5px 20px rgba(0,0,0,0.05);
        transition:0.3s;
      }

      .card:hover{
        transform:translateY(-5px);
      }

      .card h3{
        margin:0;
        font-size:26px;
        color:#4f46e5;
      }

      .card p{
        margin-top:8px;
        color:#6b7280;
      }

      /* MOBILE */

      @media(max-width:768px){

        .sidebar{
          position:fixed;
          left:${open ? "0" : "-260px"};
          top:0;
          height:100%;
          z-index:1000;
        }

        .menu-btn{
          display:block;
        }

      }

      `}</style>

      <div className="layout">

        {/* SIDEBAR */}
        <div className="sidebar">

          <div className="logo">EMS Panel</div>

          {menu.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`menu-link ${location.pathname === item.path ? "active-link" : ""
                }`}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CONTENT */}
        <div className="content">

          <div className="topbar">

            <button
              className="menu-btn"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>

            <h4 style={{ margin: 0 }}>Dashboard</h4>

            {/* PROFILE */}
            <div
              className="profile-box"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              {profile?.username || "User"}

              {showProfileMenu && (
                <div className="profile-menu">

                  <button
                    onClick={() => navigate("/profile")}
                  >
                    My Profile
                  </button>

                  <button onClick={changePassword}>
                    Change Password
                  </button>

                  <button onClick={logout}>
                    Logout
                  </button>

                </div>
              )}
            </div>

          </div>

          {/* STAT CARDS */}

          <div className="grid">

            <div className="card">
              <h3>12</h3>
              <p>Total Employees</p>
            </div>

            <div className="card">
              <h3>5</h3>
              <p>Active Forms</p>
            </div>

            <div className="card">
              <h3>3</h3>
              <p>Departments</p>
            </div>

            <div className="card">
              <h3>4</h3>
              <p>Pending Requests</p>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;