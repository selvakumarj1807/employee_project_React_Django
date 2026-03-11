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

  /* LOAD FORMS */
  useEffect(() => {
    api.get("forms/").then((res) => setForms(res.data));
  }, []);

  /* LOAD EMPLOYEE */
  useEffect(() => {
    if (id) {
      api.get(`employees/${id}/`).then((res) => {
        setFormId(res.data.form);
        setFormData(res.data.data);
      });
    }
  }, [id]);

  /* SET SELECTED FORM */
  useEffect(() => {
    const form = forms.find((f) => f.id == formId);
    setSelectedForm(form);
  }, [formId, forms]);

  /* HANDLE INPUT */
  const handleChange = (label, value) => {
    setFormData({ ...formData, [label]: value });
  };

  /* SUBMIT */
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

      body{
        background:#f4f6fb;
        margin:0;
        font-family:Segoe UI;
      }

      .container{
        max-width:900px;
        margin:auto;
        padding:20px;
      }

      .card{
        background:white;
        padding:30px;
        border-radius:18px;
        box-shadow:0 15px 35px rgba(0,0,0,0.08);
        animation:fadeIn .5s ease;
      }

      @keyframes fadeIn{
        from{opacity:0; transform:translateY(15px);}
        to{opacity:1; transform:translateY(0);}
      }

      .header{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:20px;
      }

      .title{
        font-weight:700;
        margin:0;
      }

      .back{
        text-decoration:none;
        background:#6366f1;
        color:white;
        padding:8px 14px;
        border-radius:8px;
        font-size:14px;
      }

      .form-group{
        margin-bottom:18px;
      }

      label{
        font-weight:600;
        margin-bottom:5px;
        display:block;
      }

      input,select{
        width:100%;
        padding:10px 12px;
        border-radius:10px;
        border:1px solid #ddd;
        font-size:14px;
        transition:.25s;
      }

      input:focus,select:focus{
        outline:none;
        border-color:#6366f1;
        box-shadow:0 0 0 2px rgba(99,102,241,.2);
      }

      .grid{
        display:grid;
        grid-template-columns:1fr 1fr;
        column-gap:50px;
      }

      .submit-btn{
        width:100%;
        border:none;
        padding:12px;
        border-radius:12px;
        background:#6366f1;
        color:white;
        font-weight:600;
        margin-top:15px;
        cursor:pointer;
        transition:.25s;
      }

      .submit-btn:hover{
        background:#4f46e5;
        transform:translateY(-2px);
      }

      .submit-btn:disabled{
        opacity:.7;
        cursor:not-allowed;
      }

      .empty{
        text-align:center;
        color:#777;
        padding:20px;
      }

      /* MOBILE */

      @media(max-width:768px){

        .grid{
          grid-template-columns:1fr;
        }

        .card{
          padding:20px;
        }

        .header{
          flex-direction:column;
          align-items:flex-start;
          gap:10px;
        }

      }

      `}</style>

      <div className="container">

        <div className="card">

          <div className="header">
            <h3 className="title">
              {id ? "Update Employee" : "Create Employee"}
            </h3>

            <a href="/dashboard" className="back">
              ← Dashboard
            </a>
          </div>

          {/* FORM TEMPLATE */}

          <div className="form-group">
            <label>Select Form Template</label>

            <select
              value={formId}
              onChange={(e) => setFormId(e.target.value)}
            >
              <option value="">Select Form</option>

              {forms.map((form) => (
                <option key={form.id} value={form.id}>
                  {form.name}
                </option>
              ))}
            </select>
          </div>

          {/* DYNAMIC FIELDS */}

          {selectedForm ? (

            <div className="grid">

              {selectedForm.fields.map((field) => (

                <div key={field.id} className="form-group">

                  <label>{field.label}</label>

                  <input
                    type={field.field_type}
                    value={formData[field.label] || ""}
                    onChange={(e) =>
                      handleChange(field.label, e.target.value)
                    }
                  />

                </div>

              ))}

            </div>

          ) : (

            <div className="empty">
              Select a form template to load fields
            </div>

          )}

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