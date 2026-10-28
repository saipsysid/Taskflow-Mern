
import { useCallback, useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import {
  getTasks,
  getStats,
  addTask,
  updateTask,
  deleteTask
} from "../services/taskService";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0
  });
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    try {
      const [taskData, statsData] = await Promise.all([
        getTasks(),
        getStats()
      ]);

      setTasks(taskData);
      setStats(statsData);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleSave(taskData) {
    if (editingTask) {
      await updateTask(editingTask._id, taskData);
      setEditingTask(null);
    } else {
      await addTask(taskData);
    }

    await loadData();
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await deleteTask(id);

      if (editingTask?._id === id) {
        setEditingTask(null);
      }

      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggle(task) {
    try {
      await updateTask(task._id, {
        completed: !task.completed
      });

      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    if (filter === "High Priority") {
      return task.priority === "High";
    }

    return true;
  });

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-1">Productivity Dashboard</h2>
      <p className="text-muted">Plan your work. Track your progress.</p>

      {error && (
        <div className="alert alert-danger">
          {error}
          <button
            className="btn btn-sm btn-outline-danger ms-3"
            onClick={loadData}
          >
            Retry
          </button>
        </div>
      )}

      <div className="row g-3 my-2">
        {[
          ["Total Tasks", stats.total, "primary"],
          ["Completed", stats.completed, "success"],
          ["Pending", stats.pending, "warning"]
        ].map(([label, value, color]) => (
          <div className="col-md-4" key={label}>
            <div className={`card border-${color} shadow-sm`}>
              <div className="card-body">
                <p className="text-muted mb-1">{label}</p>
                <h3>{value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 mt-1">
        <div className="col-lg-5">
          <TaskForm
            onSave={handleSave}
            editingTask={editingTask}
            onCancel={() => setEditingTask(null)}
          />
        </div>

        <div className="col-lg-7">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <h4 className="mb-0">Your Tasks</h4>

            <select
              className="form-select"
              style={{ maxWidth: "180px" }}
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>High Priority</option>
            </select>
          </div>

          <TaskList
            tasks={filteredTasks}
            onEdit={setEditingTask}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        </div>
      </div>
    </div>
  );
}
