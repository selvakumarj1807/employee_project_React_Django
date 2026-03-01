import { useState } from "react";
import api from "../api/axios";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* ================= SORTABLE ITEM ================= */
function SortableItem({ field, index, fields, setFields, removeField }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="field-card">
      <div className="field-header">
        <span {...listeners} className="drag">☰</span>
        <strong>Field {index + 1}</strong>
        <button className="remove-btn" onClick={() => removeField(field.id)}>✕</button>
      </div>

      <input
        className="input"
        placeholder="Field Label"
        value={field.label}
        onChange={(e) => {
          const updated = [...fields];
          updated[index].label = e.target.value;
          setFields(updated);
        }}
      />

      <select
        className="input"
        value={field.field_type}
        onChange={(e) => {
          const updated = [...fields];
          updated[index].field_type = e.target.value;
          setFields(updated);
        }}
      >
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        <option value="password">Password</option>
      </select>
    </div>
  );
}

/* ================= MAIN BUILDER ================= */
function FormBuilder() {
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const addField = () =>
    setFields([
      ...fields,
      { id: Date.now().toString(), label: "", field_type: "text" },
    ]);

  const removeField = (id) =>
    setFields(fields.filter((f) => f.id !== id));

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      setFields(arrayMove(fields, oldIndex, newIndex));
    }
  };

  const handleSave = async () => {
    if (!formName) return alert("Enter form name");
    if (!fields.length) return alert("Add fields");

    setLoading(true);
    await api.post("forms/", {
      name: formName,
      fields: fields.map(({ label, field_type }) => ({ label, field_type })),
    });

    setMsg("Form Created Successfully ✅");
    setFormName("");
    setFields([]);
    setLoading(false);
  };

  return (
    <>
      <style>{`
        body{background:#f3f5fb}

        .builder{
          max-width:720px;
          margin:auto;
          margin-top:30px;
          background:white;
          padding:28px;
          border-radius:20px;
          box-shadow:0 15px 35px rgba(0,0,0,.07);
        }

        .header{
          position:sticky;
          top:0;
          background:white;
          padding-bottom:15px;
          margin-bottom:20px;
          border-bottom:1px solid #eee;
        }

        .title{
          text-align:center;
          font-weight:700;
          margin-bottom:15px;
        }

        .input{
          width:100%;
          padding:10px;
          border-radius:10px;
          border:1px solid #ddd;
          margin-bottom:10px;
        }

        .field-card{
          background:#f9fafc;
          padding:15px;
          border-radius:14px;
          margin-bottom:12px;
          border:1px solid #eee;
        }

        .field-header{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:8px;
        }

        .drag{
          cursor:grab;
          font-size:18px;
        }

        .remove-btn{
          border:none;
          background:#ef4444;
          color:white;
          width:26px;
          height:26px;
          border-radius:50%;
        }

        .add{
          width:100%;
          padding:10px;
          border:none;
          border-radius:10px;
          background:#10b981;
          color:white;
          margin-bottom:15px;
        }

        .save{
          width:100%;
          padding:12px;
          border:none;
          border-radius:12px;
          background:#4f46e5;
          color:white;
          font-weight:600;
        }

        .empty{
          text-align:center;
          padding:20px;
          color:#777;
        }

        .msg{
          text-align:center;
          color:green;
          margin-bottom:10px;
        }

        @media(max-width:600px){
          .builder{
            margin:15px;
            padding:18px;
          }
        }
      `}</style>
      <a href="/dashboard" className="btn btn-primary mb-3"><button>Dashboard</button></a>

      <div className="builder">
        <div className="header">
          <h3 className="title">Dynamic Form Builder</h3>
          {msg && <div className="msg">{msg}</div>}
          <input
            className="input"
            placeholder="Enter Form Name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
          <button className="add" onClick={addField}>
            + Add Field
          </button>
        </div>

        {fields.length === 0 && (
          <div className="empty">No fields yet. Click Add Field 👆</div>
        )}

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={fields.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
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

        <button className="save" onClick={handleSave}>
          {loading ? "Saving..." : "Save Form"}
        </button>
      </div>
    </>
  );
}

export default FormBuilder;