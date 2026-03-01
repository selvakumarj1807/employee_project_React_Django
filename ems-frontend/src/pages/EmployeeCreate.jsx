import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function EmployeeCreate() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [formId, setFormId] = useState("");
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    /* ========= LOAD FORMS ========= */
    useEffect(() => {
        api.get("forms/").then((res) => setForms(res.data));
    }, []);

    /* ========= LOAD EMPLOYEE (EDIT MODE) ========= */
    useEffect(() => {
        if (id) {
            api.get(`employees/${id}/`).then((res) => {
                setFormId(res.data.form);
                setFormData(res.data.data);
            });
        }
    }, [id]);

    /* ========= SET SELECTED FORM ========= */
    useEffect(() => {
        const form = forms.find((f) => f.id == formId);
        setSelectedForm(form);
    }, [formId, forms]);

    /* ========= HANDLE INPUT ========= */
    const handleChange = (label, value) => {
        setFormData({ ...formData, [label]: value });
    };

    /* ========= SUBMIT ========= */
    const handleSubmit = async () => {
        if (!formId) return alert("Please select a form");

        setLoading(true);

        const payload = {
            form: formId,
            data: formData,
        };

        try {
            if (id) {
                await api.put(`employees/${id}/`, payload);
                alert("Employee Updated Successfully");
            } else {
                await api.post("employees/", payload);
                alert("Employee Created Successfully");
            }
            navigate("/employees");
        } catch {
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`
        .page-wrapper{
          min-height:100vh;
          background:#f1f5f9;
          padding:30px 15px;
        }

        .form-card{
          max-width:700px;
          margin:auto;
          background:white;
          padding:35px;
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
          text-align:center;
          margin-bottom:25px;
        }

        .form-control{
          border-radius:12px;
          height:45px;
          transition:.25s;
        }

        .form-control:focus{
          border-color:#6366f1;
          box-shadow:0 0 0 0.15rem rgba(99,102,241,.25);
        }

        label{
          font-weight:600;
          margin-bottom:5px;
        }

        .submit-btn{
          width:100%;
          border:none;
          padding:12px;
          border-radius:12px;
          background:#6366f1;
          color:white;
          font-weight:600;
          transition:.3s;
          margin-top:10px;
        }

        .submit-btn:hover{
          background:#4f46e5;
          transform:translateY(-2px);
        }

        .submit-btn:disabled{
          opacity:.7;
          cursor:not-allowed;
        }

        .select-box{
          height:48px;
          border-radius:12px;
        }

        @media(max-width:576px){
          .form-card{
            padding:25px;
          }
        }
      `}</style>
            <a href="/dashboard" className="btn btn-primary mb-3"><button>Dashboard</button></a>

            <div className="page-wrapper">
                <div className="form-card">
                    <h3 className="title">
                        {id ? "Update Employee" : "Create Employee"}
                    </h3>

                    {/* FORM SELECT */}
                    <select
                        className="form-control select-box mb-3"
                        value={formId}
                        onChange={(e) => setFormId(e.target.value)}
                    >
                        <option value="">Select Form Template</option>
                        {forms.map((form) => (
                            <option key={form.id} value={form.id}>
                                {form.name}
                            </option>
                        ))}
                    </select>

                    {/* DYNAMIC FIELDS */}
                    {selectedForm &&
                        selectedForm.fields.map((field) => (
                            <div key={field.id} className="mb-3">
                                <label>{field.label}</label>

                                <input
                                    type={field.field_type}
                                    className="form-control"
                                    value={formData[field.label] || ""}
                                    onChange={(e) =>
                                        handleChange(field.label, e.target.value)
                                    }
                                />
                            </div>
                        ))}

                    {/* SUBMIT */}
                    <button
                        className="submit-btn"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : id
                                ? "Update Employee"
                                : "Create Employee"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default EmployeeCreate;