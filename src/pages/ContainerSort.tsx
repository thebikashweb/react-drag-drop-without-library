import React from "react";
import { v4 as uuidv4 } from "uuid";

type TodoType = {
  id: string;
  title: string;
  column: ColumnType;
  sortIndex: number;
};

const sampleTodos: Array<TodoType> = [
  {
    id: uuidv4(),
    title: "Create a video ",
    column: "incomplete",
    sortIndex: 1,
  },
  {
    id: uuidv4(),
    title: "Edit video",
    column: "incomplete",
    sortIndex: 2,
  },
  {
    id: uuidv4(),
    title: "Publish video ",
    column: "incomplete",
    sortIndex: 3,
  },
];

const columns = {
  incomplete: true,
  progress: true,

  completed: true,
  another: true,
};

type Column = typeof columns;

type ColumnType = keyof Column;

function ContainerSort() {
  const [todoTitle, setTodoTitle] = React.useState("");
  const [todos, setTodos] = React.useState<TodoType[]>(sampleTodos);

  const draggedTodoItem = React.useRef<any>(null);

  const handleAddTodo = () => {
    if (!todoTitle) return;
    const todoPayload: TodoType = {
      id: uuidv4(),
      title: todoTitle,
      column: "incomplete",
      sortIndex: todos.length + 1,
    };

    setTodos((prev) => [...prev, todoPayload]);
  };

  const handleContainerDrag = (column: ColumnType) => {
    const index = todos.findIndex(
      (todo) => todo.id === draggedTodoItem.current
    );
    const tempTodos = [...todos];
    tempTodos[index].column = column;
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
        {Object.keys(columns).map((key: any) => (
          <div key={key} className={`container-sort__column`}>
            <h5>{key.toLocaleUpperCase()} todos</h5>
            <div
              className="container-sort__items"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleContainerDrag(key)}
            >
              {todos
                .filter((todo) => todo.column === key)
                .map((todo) => (
                  <div
                    key={todo.id}
                    className="list-item"
                    draggable
                    onDragStart={(e) => (draggedTodoItem.current = todo.id)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <i className="fa-solid fa-bars"></i>
                    <h6>{todo.title}</h6>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContainerSort;
