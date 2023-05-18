import React from "react";
import { v4 as uuidv4 } from "uuid";

type TodoType = {
  id: string;
  title: string;
  isCompleted: boolean;
  sortIndex: number;
};

function ContainerSort() {
  const [todoTitle, setTodoTitle] = React.useState("");
  const [todos, setTodos] = React.useState<TodoType[]>([]);

  const draggedTodoItem = React.useRef<any>(null);

  const handleAddTodo = () => {
    if (!todoTitle) return;
    const todoPayload = {
      id: uuidv4(),
      title: todoTitle,
      isCompleted: false,
      sortIndex: todos.length + 1,
    };

    setTodos((prev) => [...prev, todoPayload]);
  };

  //handle drag on container
  const handleContainerDrag = (container: "incomplete" | "completed") => {
    const index = todos.findIndex(
      (todo) => todo.id === draggedTodoItem.current
    );
    const tempTodos = todos;
    tempTodos[index].isCompleted = container === "completed" ? true : false;
    setTodos([...tempTodos]);
  };
  return (
    <div className="container-sort">
      <div className="input-group">
        <input
          type="text"
          name="todotitle"
          value={todoTitle}
          placeholder="Enter a todo item"
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <button className="btn" onClick={handleAddTodo}>
          Add item
        </button>
      </div>

      <div className="container-sort__wrapper">
        <div className="container-sort__incomplete">
          <h5>Incomplete todos</h5>
          <div
            className="container-sort__items"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleContainerDrag("incomplete")}
          >
            {todos
              .filter((todo) => !todo.isCompleted)
              .map((todo) => (
                <div
                  key={todo.id}
                  className="list-item"
                  draggable
                  onDragOver={(e) => e.preventDefault()}
                  onDragStart={() => (draggedTodoItem.current = todo.id)}
                >
                  <i className="fa-solid fa-bars"></i>
                  <h6>{todo.title}</h6>
                </div>
              ))}
          </div>
        </div>
        <div className="container-sort__completed">
          <h5>Completed todos</h5>
          <div
            className="container-sort__items"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleContainerDrag("completed")}
          >
            {todos
              .filter((todo) => todo.isCompleted)
              .map((todo) => (
                <div
                  key={todo.id}
                  className="list-item"
                  draggable
                  onDragOver={(e) => e.preventDefault()}
                  onDragStart={() => (draggedTodoItem.current = todo.id)}
                >
                  <i className="fa-solid fa-bars"></i>
                  <h6>{todo.title}</h6>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContainerSort;
