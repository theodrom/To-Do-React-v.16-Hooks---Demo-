import React, { useState} from 'react';
import './App.css';

export default function App() {

  // destructuring the array with todos and setTodos
  // useState returns a pair: the current state value and a function that lets you update it.
  const [todos, setTodos] = useState([
    { text: "Learn about React" },
    { text: "Meet friend for lunch" },
    { text: "Build really cool todo app" }
  ]);

  const addTodo = text => {
    // check the spread operator...
    // we pass in the key word {text} to set in the new todo
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  // component(cmpt) that we pass in a (todo) and it returns the text part 
  const Todo = ({ todo }) => <div className="todo">{todo.text}</div>;

  // we'll render our todos here ...
  return (
    <div className="app">
      <div className="todo-list">

        {/* creates a new array of items by mapping over the todo 
        items from state and displaying them by index. */}
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
          />
        ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

function TodoForm({addTodo}) {
  // cmpt that states the initial value of a new ToDo
  // and a function that sets the new state
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    // prevents the form submiting
    e.preventDefault();
    // if there is no value adds nothing
    if(!value) return;
    // adds the value from the form-input
    addTodo(value);
    // cleans the input with a new empty string
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />

    </form>
  );
}
