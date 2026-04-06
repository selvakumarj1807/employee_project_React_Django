import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loadEmployees = async () => {
        setLoading(true);
        try {
            const res = await api.get(`employees/?search=${search}`);
            setEmployees(res.data);
        } catch (err) {
            console.error("Failed to fetch employees");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this record? This action cannot be undone.")) {
            try {
                await api.delete(`employees/${id}/`);
                loadEmployees();
            } catch (err) {
                alert("Error deleting employee");
            }
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
          --border: #e2e8f0;
        }

        body { background: var(--bg); margin: 0; font-family: 'Inter', sans-serif; }

        .list-container {
          max-width: 1200px;
          margin: 40px auto;
          padding: 0 20px;
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .list-header h2 { margin: 0; font-size: 24px; font-weight: 800; color: var(--text-main); }

        .btn-dash {
          text-decoration: none;
          background: white;
          color: var(--text-main);
          padding: 10px 18px;
          border-radius: 10px;
          border: 1px solid var(--border);
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s;
        }

        .btn-dash:hover { background: #f1f5f9; border-color: #cbd5e1; }

        .management-card {
          background: white;
          border-radius: 20px;
          border: 1px solid var(--border);
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          overflow: hidden;
        }

        /* SEARCH SECTION */
        .toolbar {
          padding: 24px 30px;
          background: white;
          border-bottom: 1px solid var(--border);
          display: flex;
          gap: 15px;
        }

        .search-wrapper {
          flex: 1;
          position: relative;
        }

        .search-input {
          width: 80%;
          padding: 12px 16px 12px 40px;
          border-radius: 12px;
          border: 1px solid var(--border);
          font-size: 14px;
          background: #f8fafc;
          outline: none;
          transition: border-color 0.2s;
        }

        .search-input:focus { border-color: var(--primary); background: white; }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
        }

        .btn-search {
          padding: 0 24px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        /* TABLE UI */
        .table-container { overflow-x: auto; }

        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        th {
          padding: 16px 30px;
          background: #f8fafc;
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--border);
        }

        td {
          padding: 20px 30px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 14px;
          vertical-align: middle;
        }

        tr:hover td { background: #fafbfc; }

        .form-badge {
          background: #eef2ff;
          color: var(--primary);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
        }

        .data-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .data-tag b { color: var(--text-muted); font-size: 11px; text-transform: uppercase; margin-right: 5px; }

        .actions-cell { display: flex; gap: 8px; }

        .btn-action {
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: white;
          cursor: pointer;
          transition: 0.2s;
        }

        .edit-icon:hover { background: #fffbeb; border-color: #f59e0b; color: #f59e0b; }
        .delete-icon:hover { background: #fef2f2; border-color: #ef4444; color: #ef4444; }

        /* MOBILE CARDS */
        .mobile-view { display: none; padding: 20px; background: #fafbfc; }

        .emp-mobile-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
        }

        .card-top {
          display: flex; justify-content: space-between;
          margin-bottom: 12px; border-bottom: 1px dashed var(--border);
          padding-bottom: 8px;
        }

        .loader-box { padding: 60px; text-align: center; color: var(--text-muted); }

        @media (max-width: 850px) {
          .table-container { display: none; }
          .mobile-view { display: block; }
          .toolbar { padding: 15px; }
        }
      `}</style>

            <div className="list-container">
                <header className="list-header">
                    <h2>Employee Directory</h2>
                    <Link to="/dashboard" className="btn-dash">← Dashboard</Link>
                </header>

                <div className="management-card">
                    {/* TOOLBAR */}
                    <div className="toolbar">
                        <div className="search-wrapper">
                            <span className="search-icon">🔍</span>
                            <input
                                className="search-input"
                                placeholder="Search by name, ID or data..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && loadEmployees()}
                            />
                        </div>
                        <button className="btn-search" onClick={loadEmployees}>Search</button>
                    </div>

                    {loading ? (
                        <div className="loader-box">
                            <p>Fetching records...</p>
                        </div>
                    ) : (
                        <>
                            {/* DESKTOP TABLE */}
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Employee ID</th>
                                            <th>Template</th>
                                            <th>Profile Data</th>
                                            <th style={{ textAlign: 'right' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees.map((emp) => (
                                            <tr key={emp.id}>
                                                <td style={{ fontWeight: '600', color: 'var(--text-main)' }}>#{emp.id}</td>
                                                <td><span className="form-badge">Form {emp.form}</span></td>
                                                <td>
                                                    <div className="data-list">
                                                        {Object.entries(emp.data).map(([k, v]) => (
                                                            <div key={k} className="data-tag">
                                                                <b>{k}:</b> {v}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="actions-cell" style={{ justifyContent: 'flex-end' }}>
                                                        <button 
                                                            className="btn-action edit-icon" 
                                                            title="Edit Record"
                                                            onClick={() => navigate(`/employee-create/${emp.id}`)}
                                                        >
                                                            ✏️
                                                        </button>
                                                        <button 
                                                            className="btn-action delete-icon" 
                                                            title="Delete Record"
                                                            onClick={() => handleDelete(emp.id)}
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* MOBILE VIEW */}
                            <div className="mobile-view">
                                {employees.map((emp) => (
                                    <div key={emp.id} className="emp-mobile-card">
                                        <div className="card-top">
                                            <span style={{ fontWeight: '800' }}>ID: #{emp.id}</span>
                                            <span className="form-badge">Template {emp.form}</span>
                                        </div>
                                        <div className="data-list">
                                            {Object.entries(emp.data).map(([k, v]) => (
                                                <div key={k} className="data-tag">
                                                    <b>{k}:</b> {v}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="actions-cell" style={{ marginTop: '15px' }}>
                                            <button 
                                                className="btn-action edit-icon" 
                                                style={{ width: '100%' }}
                                                onClick={() => navigate(`/employee-create/${emp.id}`)}
                                            >
                                                Edit Record
                                            </button>
                                            <button 
                                                className="btn-action delete-icon" 
                                                style={{ width: '40px' }}
                                                onClick={() => handleDelete(emp.id)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default EmployeeList;