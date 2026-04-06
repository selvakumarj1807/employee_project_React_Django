import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/axios";

function EmployeeCreate() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [formId, setFormId] = useState("");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* LOAD FORMS */
  useEffect(() => {
    api.get("forms/").then((res) => setForms(res.data));
  }, []);

  /* LOAD EMPLOYEE FOR UPDATE */
  useEffect(() => {
    if (id) {
      api.get(`employees/${id}/`).then((res) => {
        setFormId(res.data.form);
        setFormData(res.data.data);
      });
    }
  }, [id]);

  /* UPDATE SELECTED FORM TEMPLATE */
  useEffect(() => {
    const form = forms.find((f) => String(f.id) === String(formId));
    setSelectedForm(form);
  }, [formId, forms]);

  const handleChange = (label, value) => {
    setFormData({ ...formData, [label]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formId) return setError("Please select a form template first.");

    setLoading(true);
    setError("");

    const payload = {
      form: formId,
      data: formData,
    };

    try {
      if (id) {
        await api.put(`employees/${id}/`, payload);
      } else {
        await api.post("employees/", payload);
      }
      navigate("/employees");
    } catch (err) {
      setError("Failed to save employee data. Please check all fields.");
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
          --border: #e2e8f0;
        }

        body { background: var(--bg); margin: 0; font-family: 'Inter', sans-serif; }

        .page-container {
          max-width: 1000px;
          margin: 40px auto;
          padding: 0 20px;
        }

        .breadcrumb {
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .breadcrumb a { text-decoration: none; color: var(--text-muted); font-weight: 500; }
        .breadcrumb span { color: #cbd5e1; }

        .editor-card {
          background: white;
          border-radius: 24px;
          border: 1px solid var(--border);
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          overflow: hidden;
          animation: slideUp 0.4s ease-out;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .editor-header {
          padding: 30px 40px;
          background: white;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .editor-header h2 { margin: 0; font-size: 22px; font-weight: 800; color: var(--text-main); }
        
        .template-selector {
          background: #f1f5f9;
          padding: 25px 40px;
          border-bottom: 1px solid var(--border);
        }

        .select-wrapper label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .modern-select {
          width: 100%;
          max-width: 400px;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid var(--border);
          font-size: 15px;
          background: white;
          cursor: pointer;
          outline: none;
        }

        .modern-select:focus { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1); }

        .fields-container { padding: 40px; }

        .fields-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px 40px;
        }

        .input-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 8px;
        }

        .modern-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          font-size: 15px;
          box-sizing: border-box;
          transition: 0.2s;
        }

        .modern-input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1); }

        .empty-state {
          text-align: center;
          padding: 60px 0;
          color: var(--text-muted);
        }

        .footer-actions {
          padding: 25px 40px;
          background: #f8fafc;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
          gap: 15px;
        }

        .btn-cancel {
          padding: 12px 24px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 12px;
          color: var(--text-muted);
          font-weight: 600;
          cursor: pointer;
        }

        .btn-submit {
          padding: 12px 32px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-submit:hover { background: #4338ca; }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .error-banner {
          margin: 0 40px 20px;
          background: #fef2f2;
          color: #dc2626;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #fee2e2;
          font-size: 14px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .fields-grid { grid-template-columns: 1fr; }
          .editor-header { padding: 20px; }
        }
      `}</style>

      <div className="page-container">
        <div className="breadcrumb">
          <Link to="/dashboard">Dashboard</Link>
          <span>/</span>
          <Link to="/employees">Employees</Link>
          <span>/</span>
          <b style={{ color: 'var(--text-main)' }}>{id ? 'Update' : 'New Employee'}</b>
        </div>

        <div className="editor-card">
          <header className="editor-header">
            <h2>{id ? "Update Profile" : "Register New Employee"}</h2>
            <Link to="/dashboard" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
              ✕ Cancel
            </Link>
          </header>

          <section className="template-selector">
            <div className="select-wrapper">
              <label>Step 1: Choose Form Template</label>
              <select
                className="modern-select"
                value={formId}
                onChange={(e) => {
                  setFormId(e.target.value);
                  setFormData({}); // Reset data when template changes
                }}
              >
                <option value="">-- Select Template --</option>
                {forms.map((form) => (
                  <option key={form.id} value={form.id}>
                    {form.name}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <form onSubmit={handleSubmit}>
            <section className="fields-container">
              {error && <div className="error-banner">{error}</div>}

              {selectedForm ? (
                <div className="fields-grid">
                  {selectedForm.fields.map((field) => (
                    <div key={field.id} className="input-group">
                      <label>{field.label}</label>
                      <input
                        type={field.field_type}
                        className="modern-input"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        required
                        value={formData[field.label] || ""}
                        onChange={(e) => handleChange(field.label, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div style={{ fontSize: '48px', marginBottom: '10px' }}>📄</div>
                  <p>Please select a form template above to begin entering data.</p>
                </div>
              )}
            </section>

            <footer className="footer-actions">
              <button 
                type="button" 
                className="btn-cancel" 
                onClick={() => navigate("/employees")}
              >
                Discard
              </button>
              <button 
                type="submit" 
                className="btn-submit" 
                disabled={loading || !selectedForm}
              >
                {loading ? "Processing..." : id ? "Update Record" : "Save Employee"}
              </button>
            </footer>
          </form>
        </div>
      </div>
    </>
  );
}

export default EmployeeCreate;