import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Delete this employee?")) {
            await api.delete(`employees/${id}/`);
            loadEmployees();
        }
    };

    return (
        <>
            <style>{`
    .page-wrapper{
      padding:30px 15px;
      background:#f1f5f9;
      min-height:100vh;
    }

    .list-card{
      background:white;
      padding:30px;
      border-radius:20px;
      box-shadow:0 15px 40px rgba(0,0,0,0.08);
      animation:fadeIn .5s ease;
    }

    @keyframes fadeIn{
      from{opacity:0; transform:translateY(15px);}
      to{opacity:1; transform:translateY(0);}
    }

    .title{
      font-weight:700;
      margin-bottom:20px;
    }

    .search-bar{
      display:flex;
      gap:10px;
      margin-bottom:20px;
      flex-wrap:wrap;
    }

    .search-bar input{
      border-radius:12px;
      height:45px;
      flex:1;
      min-width:200px;
    }

    .search-btn{
      border:none;
      background:#6366f1;
      color:white;
      padding:0 20px;
      border-radius:12px;
      transition:.3s;
      height:45px;
    }

    .search-btn:hover{
      background:#4f46e5;
    }

    .table-wrapper{
      width:100%;
      overflow-x:auto;
      border-radius:12px;
    }

    table{
      min-width:650px;
    }

    .table thead{
      background:#6366f1;
      color:white;
    }

    .action-btn{
      border:none;
      padding:5px 12px;
      border-radius:8px;
      font-size:13px;
      font-weight:600;
      transition:.2s;
    }

    .edit-btn{ background:#f59e0b; color:white; }
    .delete-btn{ background:#ef4444; color:white; }

    .action-btn:hover{
      transform:scale(1.05);
    }

    .loader{
      text-align:center;
      padding:30px;
      font-weight:600;
    }

    .top-bar{
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-bottom:15px;
      flex-wrap:wrap;
      gap:10px;
    }

    .dash-btn{
      background:#111827;
      color:white;
      border:none;
      padding:8px 16px;
      border-radius:10px;
      font-weight:600;
      transition:.3s;
    }

    .dash-btn:hover{
      background:#000;
    }

    @media(max-width:600px){
      .list-card{
        padding:20px;
      }

      table{
        font-size:13px;
      }
    }
  `}</style>

            <div className="page-wrapper">
                <div className="list-card">

                    {/* HEADER */}
                    <div className="top-bar">
                        <h3 className="title">Employee Records</h3>

                        <button
                            className="dash-btn"
                            onClick={() => navigate("/dashboard")}
                        >
                            Dashboard
                        </button>
                    </div>

                    {/* SEARCH */}
                    <div className="search-bar">
                        <input
                            className="form-control"
                            placeholder="Search employees..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="search-btn" onClick={loadEmployees}>
                            Search
                        </button>
                    </div>

                    {/* LOADING */}
                    {loading ? (
                        <div className="loader">Loading employees...</div>
                    ) : (
                        <div className="table-wrapper">
                            <table className="table table-bordered table-hover align-middle" cellPadding="20px">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Form</th>
                                        <th>Data</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {employees.map((emp) => (
                                        <tr key={emp.id}>
                                            <td>{emp.id}</td>
                                            <td>{emp.form}</td>
                                            <td>
                                                {Object.entries(emp.data).map(([k, v]) => (
                                                    <div key={k}>
                                                        <strong>{k}:</strong> {v}
                                                    </div>
                                                ))}
                                            </td>

                                            <td>
                                                <button
                                                    className="action-btn edit-btn me-2"
                                                    onClick={() =>
                                                        navigate(`/employee-create/${emp.id}`)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="action-btn delete-btn"
                                                    onClick={() => handleDelete(emp.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default EmployeeList;