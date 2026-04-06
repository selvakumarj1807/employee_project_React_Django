import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* ================= SORTABLE ITEM ================= */

function SortableItem({ field, index, fields, setFields, removeField }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="field-card">
      <div className="field-controls">
        <div className="drag-handle" {...attributes} {...listeners}>
          ⠿
        </div>
        <span className="field-number">Step {index + 1}</span>
        <button className="remove-btn" onClick={() => removeField(field.id)}>
          Delete
        </button>
      </div>

      <div className="field-content">
        <div className="input-group">
          <label>Field Label</label>
          <input
            className="field-input"
            placeholder="e.g. Full Name"
            value={field.label}
            onChange={(e) => {
              const updated = [...fields];
              updated[index].label = e.target.value;
              setFields(updated);
            }}
          />
        </div>

        <div className="input-group">
          <label>Input Type</label>
          <select
            className="field-select"
            value={field.field_type}
            onChange={(e) => {
              const updated = [...fields];
              updated[index].field_type = e.target.value;
              setFields(updated);
            }}
          >
            <option value="text">Short Text</option>
            <option value="number">Number</option>
            <option value="date">Date Picker</option>
            <option value="password">Secure Password</option>
          </select>
        </div>
      </div>
    </div>
  );
}

/* ================= MAIN BUILDER ================= */

function FormBuilder() {
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const addField = () =>
    setFields([
      ...fields,
      { id: Date.now().toString(), label: "", field_type: "text" },
    ]);

  const removeField = (id) => setFields(fields.filter((f) => f.id !== id));

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      setFields(arrayMove(fields, oldIndex, newIndex));
    }
  };

  const handleSave = async () => {
    if (!formName) return alert("Please name your form");
    if (!fields.length) return alert("Add at least one field");

    setLoading(true);
    try {
      await api.post("forms/", {
        name: formName,
        fields: fields.map(({ label, field_type }) => ({ label, field_type })),
      });
      setMsg("Form published successfully! ✨");
      setTimeout(() => setMsg(""), 3000);
      setFormName("");
      setFields([]);
    } catch (err) {
      alert("Failed to save form");
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

        .builder-container {
          max-width: 1000px;
          margin: 40px auto;
          padding: 0 20px;
        }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .back-link {
          text-decoration: none;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .main-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          border: 1px solid var(--border);
          overflow: hidden;
        }

        .builder-header {
          padding: 30px;
          background: #fff;
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .form-setup {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 16px;
          align-items: flex-end;
        }

        .form-name-input {
          width: 80%;
          padding: 12px 16px;
          border: 1px solid var(--border);
          border-radius: 10px;
          font-size: 18px;
          font-weight: 600;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-name-input:focus { border-color: var(--primary); }

        .btn-add {
          padding: 12px 20px;
          background: #f1f5f9;
          color: var(--text-main);
          border: 1px solid var(--border);
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-add:hover { background: #e2e8f0; }

        .canvas {
          padding: 30px;
          background: #fafbfc;
          min-height: 200px;
        }

        .field-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: 12px;
          margin-bottom: 16px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .field-controls {
          padding: 10px 16px;
          background: #f8fafc;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          border-radius: 12px 12px 0 0;
        }

        .drag-handle {
          cursor: grab;
          color: #cbd5e1;
          font-size: 20px;
          margin-right: 12px;
          user-select: none;
        }

        .field-number {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .remove-btn {
          margin-left: auto;
          background: none;
          border: none;
          color: #ef4444;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .field-content {
          padding: 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .input-group label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 6px;
        }

        .field-input, .field-select {
          width: 80%;
          padding: 10px;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 14px;
        }

        .builder-footer {
          padding: 20px 30px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 20px;
        }

        .success-msg { color: #10b981; font-weight: 600; font-size: 14px; }

        .btn-save {
          padding: 12px 32px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
        }

        .empty-state {
          text-align: center;
          padding: 60px 0;
          color: var(--text-muted);
        }

        @media (max-width: 600px) {
          .field-content { grid-template-columns: 1fr; }
          .form-setup { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="builder-container">
        <div className="top-bar">
          <Link to="/dashboard" className="back-link">← Dashboard</Link>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8' }}>WORKFLOW DESIGNER</div>
        </div>

        <div className="main-card">
          <div className="builder-header">
            <div className="form-setup">
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--primary)', marginBottom: '8px' }}>FORM TITLE</label>
                <input
                  className="form-name-input"
                  placeholder="Untitled Form"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <button className="btn-add" onClick={addField}>
                + Add New Field
              </button>
            </div>
          </div>

          <div className="canvas">
            {fields.length === 0 ? (
              <div className="empty-state">
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>📋</div>
                <p>Your form is empty. Click <b>"Add New Field"</b> to start building.</p>
              </div>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                  {fields.map((field, index) => (
                    <SortableItem
                      key={field.id}
                      field={field}
                      index={index}
                      fields={fields}
                      setFields={setFields}
                      removeField={removeField}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </div>

          <div className="builder-footer">
            {msg && <span className="success-msg">{msg}</span>}
            <button className="btn-save" onClick={handleSave} disabled={loading}>
              {loading ? "Publishing..." : "Save & Publish Form"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormBuilder;