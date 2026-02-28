import { useState } from "react";

function TodoItem({ task, toggleTask, deleteTask, startEdit, saveEdit }) {
  const [editText, setEditText] = useState(task.text);

  return (
    <li className="fade-in">
      {task.editing ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={() => saveEdit(task.id, editText)}>💾</button>
        </>
      ) : (
        <>
          <span
            className={task.completed ? "completed" : ""}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.text}
          </span>

          <div className="actions">
            <button onClick={() => toggleTask(task.id)}>✔️</button>
            <button onClick={() => startEdit(task.id)}>✏️</button>
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;