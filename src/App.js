import React, { useState } from 'react';
import './App.css';

// component(cmpt) that we pass in a (todo) and it returns the text part 
const Todo = ({ todo, index, completeTodo, removeTodo }) => {
  return (
    <div className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
    {todo.text}

    <div>
    <button onClick={() => completeTodo(index)}>Complete</button>
    <button onClick={() => removeTodo(index)}>x</button>
    </div>
    </div>
  );
} 

export default function App() {

  // The destructuring assignment syntax is a JavaScript expression 
  // that makes it possible to unpack values from arrays, 
  // or properties from objects, into distinct variables, based on their indexes.
  
  // here we are destructuring the array declaring variables todos and setTodos
  // The only argument to the useState() Hook is the initial state. Unlike with classes, the state doesn’t have to be an object. 
  // We can keep a number or a string if that’s all we need
  // useState returns a pair of values: the current state value (todos) and a function (setTodos) that lets you update it.
  const [todos, setTodos] = useState([
    {
      text: "Learn about React",
      isCompleted: false
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false
    },
    {
      text: "Build really cool todo app",
      isCompleted: false
    }
  ]);

  const addTodo = text => {
   // Spread syntax allows an iterable such as an array expression or string 
   // to be expanded in places where zero or more arguments (for function calls) 
   // or elements (for array literals) are expected, or an object expression to be expanded in places 
   // where zero or more key-value pairs (for object literals) are expected.
   // Here we spread the todos object array
    // we pass in the key word {text} to set in the new todo
    const newTodos = [...todos, { text }];
    // the setTodos() is a function initialzed by the useState 'hook' from above
    // and takes the new state value as an argument.
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    // added a toggle complete function
    newTodos[index].isCompleted = !todos[index].isCompleted;;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

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
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
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
