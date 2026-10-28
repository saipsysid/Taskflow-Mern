
export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onToggle
}) {
  if (tasks.length === 0) {
    return <p className="text-muted">No tasks found.</p>;
  }

  return (
    <div className="d-grid gap-3">
      {tasks.map((task) => (
        <div className="card shadow-sm" key={task._id}>
          <div className="card-body">
            <div className="d-flex justify-content-between gap-2">
              <div>
                <h5 className={task.completed ? "completed" : ""}>
                  {task.title}
                </h5>

                <p className="text-muted mb-2">
                  {task.description || "No description"}
                </p>
              </div>

              <span
                className={`badge align-self-start ${
                  task.priority === "High"
                    ? "bg-danger"
                    : task.priority === "Medium"
                    ? "bg-warning text-dark"
                    : "bg-success"
                }`}
              >
                {task.priority}
              </span>
            </div>

            <p className="small mb-3">
              Deadline:{" "}
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "Not set"}
              {" · "}
              {task.completed ? "Completed" : "Pending"}
            </p>

            <div className="d-flex flex-wrap gap-2">
              <button
                className="btn btn-sm btn-success"
                onClick={() => onToggle(task)}
              >
                {task.completed ? "Mark Pending" : "Complete"}
              </button>

              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => onEdit(task)}
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => onDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
