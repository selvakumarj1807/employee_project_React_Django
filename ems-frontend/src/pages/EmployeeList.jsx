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

      body{
        margin:0;
        font-family:Segoe UI;
        background:#f4f6fb;
      }

      .container{
        max-width:1100px;
        margin:auto;
        padding:20px;
      }

      .card{
        background:white;
        padding:25px;
        border-radius:18px;
        box-shadow:0 10px 30px rgba(0,0,0,.08);
        animation:fadeIn .5s ease;
      }

      @keyframes fadeIn{
        from{opacity:0; transform:translateY(10px)}
        to{opacity:1; transform:translateY(0)}
      }

      .header{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:20px;
        flex-wrap:wrap;
        gap:10px;
      }

      .title{
        margin:0;
        font-weight:700;
      }

      .dash-btn{
        background:#111827;
        color:white;
        border:none;
        padding:8px 14px;
        border-radius:8px;
        cursor:pointer;
      }

      .search-bar{
        display:flex;
        gap:10px;
        margin-bottom:20px;
        flex-wrap:wrap;
      }

      .search-bar input{
        flex:1;
        min-width:200px;
        padding:10px;
        border-radius:10px;
        border:1px solid #ddd;
      }

      .search-btn{
        background:#6366f1;
        border:none;
        color:white;
        padding:10px 20px;
        border-radius:10px;
        cursor:pointer;
      }

      /* TABLE */

      .table-wrapper{
        overflow-x:auto;
      }

      table{
        width:100%;
        border-collapse:collapse;
      }

      th,td{
        padding:12px;
        border-bottom:1px solid #eee;
        text-align:left;
      }

      thead{
        background:#6366f1;
        color:white;
      }

      tr:hover{
        background:#f9fafb;
      }

      .action-btn{
        border:none;
        padding:6px 10px;
        border-radius:6px;
        font-size:13px;
        margin-right:6px;
        cursor:pointer;
      }

      .edit-btn{
        background:#f59e0b;
        color:white;
      }

      .delete-btn{
        background:#ef4444;
        color:white;
      }

      /* MOBILE CARD VIEW */

      .mobile-list{
        display:none;
      }

      .employee-card{
        background:#f9fafc;
        padding:15px;
        border-radius:12px;
        margin-bottom:12px;
        border:1px solid #eee;
      }

      .emp-header{
        display:flex;
        justify-content:space-between;
        margin-bottom:8px;
        font-weight:600;
      }

      .emp-data{
        font-size:14px;
        margin-bottom:6px;
      }

      .card-actions{
        margin-top:8px;
      }

      /* LOADER */

      .loader{
        text-align:center;
        padding:30px;
        font-weight:600;
      }

      /* RESPONSIVE */

      @media(max-width:768px){

        table{
          display:none;
        }

        .mobile-list{
          display:block;
        }

      }

      `}</style>

            <div className="container">

                <div className="card">

                    <div className="header">
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
                            placeholder="Search employees..."
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <button className="search-btn" onClick={loadEmployees}>
                            Search
                        </button>
                    </div>

                    {loading ? (
                        <div className="loader">Loading employees...</div>
                    ) : (
                        <>
                            {/* DESKTOP TABLE */}

                            <div className="table-wrapper">
                                <table>
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
                                                        className="action-btn edit-btn"
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

                            {/* MOBILE CARD VIEW */}

                            <div className="mobile-list">
                                {employees.map((emp) => (
                                    <div key={emp.id} className="employee-card">

                                        <div className="emp-header">
                                            <span>ID: {emp.id}</span>
                                            <span>{emp.form}</span>
                                        </div>

                                        {Object.entries(emp.data).map(([k, v]) => (
                                            <div key={k} className="emp-data">
                                                <strong>{k}:</strong> {v}
                                            </div>
                                        ))}

                                        <div className="card-actions">

                                            <button
                                                className="action-btn edit-btn"
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