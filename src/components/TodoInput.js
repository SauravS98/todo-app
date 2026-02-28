import { useState } from "react";

function TodoInput({ addTask }) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;
    addTask(input);
    setInput("");
  };

  return (
    <div className="input-container">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a task..."
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default TodoInput;