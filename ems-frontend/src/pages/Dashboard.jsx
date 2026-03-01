import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Dashboard() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Form Builder", path: "/form-builder" },
    { name: "Create Employee", path: "/employee-create" },
    { name: "Employees", path: "/employees" },
  ];

  return (
    <>
      <style>{`
        .layout {
          min-height: 100vh;
          background: #f4f6f9;
        }

        .sidebar {
          width: 260px;
          background: linear-gradient(180deg,#1f2937,#111827);
          color: white;
          transition: 0.3s;
        }

        .logo {
          font-size: 22px;
          font-weight: bold;
          letter-spacing: 1px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 15px;
        }

        .menu-link {
          display: block;
          padding: 12px 15px;
          border-radius: 10px;
          text-decoration: none;
          color: #d1d5db;
          margin-bottom: 8px;
          transition: 0.3s;
        }

        .menu-link:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
          transform: translateX(5px);
        }

        .active-link {
          background: #4f46e5;
          color: #fff !important;
          font-weight: 600;
        }

        .content {
          flex: 1;
          padding: 30px;
        }

        .topbar {
          background: white;
          padding: 12px 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .menu-btn {
          border: none;
          background: #4f46e5;
          color: white;
          padding: 8px 14px;
          border-radius: 8px;
          display: none;
        }

        .card-box {
          background: white;
          padding: 25px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px);}
          to { opacity:1; transform: translateY(0);}
        }

        @media(max-width:768px){
          .sidebar{
            position: fixed;
            left: ${open ? "0" : "-260px"};
            top:0;
            height:100%;
            z-index:999;
            padding:20px;
          }

          .menu-btn{
            display:block;
          }
        }
      `}</style>

      <div className="layout d-flex">
        {/* Sidebar */}
        <div className="sidebar p-3">
          <div className="logo">EMS</div>

          {menu.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`menu-link ${
                location.pathname === item.path ? "active-link" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Main Content */}
        <div className="content">
          <div className="topbar">
            <button className="menu-btn" onClick={() => setOpen(!open)}>
              ☰ Menu
            </button>
            <h5 className="mb-0">Dashboard</h5>
          </div>

          <div className="card-box">
            <h2>Welcome to Dashboard 👋</h2>
            <p>This is your employee management system control panel.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;