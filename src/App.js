import { useState, useEffect, useMemo } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Filters from "./components/Filters";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    const savedTheme = JSON.parse(localStorage.getItem("dark"));
    if (saved) setTasks(saved);
    if (savedTheme !== null) setDark(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [dark]);

  const addTask = (text) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false, editing: false },
    ]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const startEdit = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, editing: true } : t
      )
    );
  };

  const saveEdit = (id, newText) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, text: newText, editing: false } : t
      )
    );
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const filteredTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <div className={dark ? "app dark" : "app"}>
      <div className="container">
        <div className="topbar">
          <h1>✨ Todo App</h1>
          <button onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        <TodoInput addTask={addTask} />
        <Filters filter={filter} setFilter={setFilter} />

        <TodoList
          tasks={filteredTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          startEdit={startEdit}
          saveEdit={saveEdit}
        />

        <div className="footer">
          <span>{tasks.filter((t) => !t.completed).length} tasks left</span>
          <button className="clear" onClick={clearCompleted}>
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;