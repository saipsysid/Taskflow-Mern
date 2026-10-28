
import { useEffect, useState } from "react";

const emptyTask = {
  title: "",
  description: "",
  priority: "Medium",
  dueDate: ""
};

export default function TaskForm({ onSave, editingTask, onCancel }) {
  const [form, setForm] = useState(emptyTask);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description || "",
        priority: editingTask.priority,
        dueDate: editingTask.dueDate
          ? editingTask.dueDate.slice(0, 10)
          : ""
      });
    } else {
      setForm(emptyTask);
    }

    setError("");
  }, [editingTask]);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    try {
      setError("");
      await onSave({
        ...form,
        title: form.title.trim(),
        dueDate: form.dueDate || null
      });

      setForm(emptyTask);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="card card-body shadow-sm mb-4" onSubmit={handleSubmit}>
      <h5>{editingTask ? "Edit Task" : "Add New Task"}</h5>

      {error && <div className="alert alert-danger">{error}</div>}

      <input
        className="form-control mb-3"
        name="title"
        placeholder="Task title *"
        value={form.title}
        onChange={handleChange}
        maxLength={100}
        required
      />

      <textarea
        className="form-control mb-3"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        rows="2"
      />

      <label className="form-label">Priority</label>
      <select
        className="form-select mb-3"
        name="priority"
        value={form.priority}
        onChange={handleChange}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <label className="form-label">Deadline</label>
      <input
        type="date"
        className="form-control mb-3"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />

      <div className="d-flex gap-2">
        <button className="btn btn-primary" type="submit">
          {editingTask ? "Update Task" : "Add Task"}
        </button>

        {editingTask && (
          <button
            className="btn btn-secondary"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
