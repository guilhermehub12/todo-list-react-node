import { useEffect, useState } from "react";
import axios from "axios";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineFileAdd,
} from "react-icons/ai";
import "./App.css";

function App() {
  const Todos = ({ todos }) => {
    return (
      <div className="todos">
        {todos.map((todo) => {
          return (
            <div className="todo">
              <button
                onClick={() => modifyStatusTodo(todo)}
                className="checkbox"
                style={{ backgroundColor: todo.status ? "#a879e6" : "white" }}
              ></button>
              <p>{todo.name}</p>
              <button>
                <AiOutlineEdit
                  onClick={() => handleWithEditButtonClick(todo)}
                  size={20}
                  color={"#64697b"}
                ></AiOutlineEdit>
              </button>
              <button>
                <AiOutlineDelete
                  onClick={() => deleteTodo(todo)}
                  size={20}
                  color={"#64697b"}
                ></AiOutlineDelete>
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const url = "http://localhost:3000/todos";

  async function handleWithNewButton() {
    setInputVisibility(!inputVisibility);
  }

  async function getTodos() {
    const response = await axios.get(url);
    setTodos(response.data);
  }

  async function createTodo() {
    const response = await axios.post(url, { name: inputValue });
    getTodos();
    setInputVisibility(!inputVisibility);
    setInputValue("")
  }

  async function deleteTodo(todo) {
    const response = await axios.delete(`${url}/${todo.id}`);
    getTodos();
  }

  async function editTodo(todo) {
    const response = await axios.put(url, {
      id: selectedTodo.id,
      name: inputValue,
    });
    setSelectedTodo()
    setInputVisibility(false);
    getTodos()
    setInputValue("")
  }

  async function modifyStatusTodo(todo) {
    const response = await axios.put(url, {
      id: todo.id,
      status: !todo.status,
    });
    getTodos();
  }

  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo)
    setInputVisibility(true)
    getTodos();
  }

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisibility, setInputVisibility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>Tasks</h1>
        </div>
        <input
          value={inputValue}
          style={{ display: inputVisibility ? "block" : "none" }}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          className="inputName"
        />
        <button
          className="newTaskButton"
          onClick={inputVisibility ? selectedTodo ? editTodo : createTodo : handleWithNewButton}
        >
          <AiOutlineFileAdd size={15}></AiOutlineFileAdd>
          {inputVisibility ? "Confirm" : "New Task"}
        </button>
        <Todos todos={todos} />
      </header>
    </div>
  );
}

export default App;
