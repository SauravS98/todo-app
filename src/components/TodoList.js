import TodoItem from "./TodoItem";

function TodoList({ tasks, toggleTask, deleteTask, startEdit, saveEdit }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          startEdit={startEdit}
          saveEdit={saveEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;