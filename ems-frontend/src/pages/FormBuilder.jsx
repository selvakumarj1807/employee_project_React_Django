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
        <div className="left">
          <span {...listeners} className="drag">☰</span>
          <strong>Field {index + 1}</strong>
        </div>

        <button className="remove-btn" onClick={() => removeField(field.id)}>
          ✕
        </button>
      </div>

      <div className="field-grid">
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

  const removeField = (id) => setFields(fields.filter((f) => f.id !== id));

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

      body{
        background:#f3f5fb;
        margin:0;
        font-family:Segoe UI;
      }

      .container{
        max-width:900px;
        margin:auto;
        padding:20px;
      }

      .builder{
        background:white;
        padding:30px;
        border-radius:18px;
        box-shadow:0 15px 35px rgba(0,0,0,.07);
      }

      .header{
        position:sticky;
        top:0;
        background:white;
        padding-bottom:15px;
        margin-bottom:20px;
        border-bottom:1px solid #eee;
        z-index:5;
      }

      .title{
        text-align:center;
        font-weight:700;
        margin-bottom:15px;
      }

      .input{
        width:100%;
        padding:10px 12px;
        border-radius:10px;
        border:1px solid #ddd;
        font-size:14px;
      }

      .field-card{
        background:#f9fafc;
        padding:16px;
        border-radius:14px;
        margin-bottom:12px;
        border:1px solid #eee;
        transition:0.25s;
      }

      .field-card:hover{
        box-shadow:0 8px 18px rgba(0,0,0,0.05);
      }

      .field-header{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:10px;
      }

      .left{
        display:flex;
        align-items:center;
        gap:10px;
      }

      .drag{
        cursor:grab;
        font-size:18px;
      }

      .field-grid{
        display:grid;
        grid-template-columns:2fr 1fr;
        gap:50px;
      }

      .remove-btn{
        border:none;
        background:#ef4444;
        color:white;
        width:28px;
        height:28px;
        border-radius:50%;
        cursor:pointer;
      }

      .add{
        width:100%;
        padding:10px;
        border:none;
        border-radius:10px;
        background:#10b981;
        color:white;
        margin-top:10px;
        cursor:pointer;
      }

      .save{
        width:100%;
        padding:12px;
        border:none;
        border-radius:12px;
        background:#4f46e5;
        color:white;
        font-weight:600;
        margin-top:15px;
        cursor:pointer;
      }

      .empty{
        text-align:center;
        padding:25px;
        color:#777;
      }

      .msg{
        text-align:center;
        color:green;
        margin-bottom:10px;
      }

      .back{
        display:inline-block;
        margin-bottom:15px;
        text-decoration:none;
        background:#4f46e5;
        color:white;
        padding:8px 14px;
        border-radius:8px;
      }

      /* MOBILE */

      @media(max-width:768px){

        .field-grid{
          grid-template-columns:1fr;
        }

        .builder{
          padding:20px;
        }

      }

      `}</style>

      <div className="container">

        <a href="/dashboard" className="back">← Dashboard</a>

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
            <div className="empty">
              No fields yet. Click <b>Add Field</b> 👆
            </div>
          )}

          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
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
      </div>
    </>
  );
}

export default FormBuilder;