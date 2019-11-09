import React, { useState } from "react";
import "./App.css";

const MOCK = [
  { id: 1, text: "Buy KFC", isChecked: true },
  { id: 2, text: "Buy Fish", isChecked: false }
];

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState(MOCK);

  function handleSubmit(e) {
    e.preventDefault();
    if (newTodo === "") return;
    setTodos([...todos, { id: Date.now(), text: newTodo , isChecked: false }]);
    e.target.reset();
  }
  function removeTodo(todoId) {
    setTodos(todos.filter(todo => todo.id !== todoId));
  }

  function handleChecked(index) {
    const getTodoByIndex = todos.find((todo, _index) => _index === index)
    setTodos([
      ...todos.slice(0, index),
      { ...getTodoByIndex ,  isChecked : !getTodoByIndex.isChecked},
      ...todos.slice(index + 1)
    ]);
  }

  function handleClearTodo() {
    setTodos([])
  }

  function handleNewTodoChange(e) {
    e.preventDefault();
    setNewTodo(e.target.value);
  }

  return (
    <div className="app">
      <form className={"container"} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={"Enter New todo..."}
          className={"todo-form"}
          onChange={handleNewTodoChange}
        />
        <div className={"panel-menu"}>
            <a href="#" onClick={handleClearTodo} >Clear All</a>
        </div>
        <ul className="todo-container">
          {todos.map((todo, index) => {
            return (
              <li className="todo-item" key={todo.id}>
                <input
                  checked={todo.isChecked}
                  onChange={() => handleChecked(index)}
                  className="todo-checkbox"
                  type="checkbox"
                  id={todo.id}
                />
                <div className={todo.isChecked ?  'checked' : 'unchecked'}>{todo.text}</div>
                <div>
                  <button
                    className={"btn-remove"}
                    type="button"
                    onClick={() => removeTodo(todo.id)}
                  >
                    X
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </form>
    </div>
  );
}

export default App;
