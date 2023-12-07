import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { ColumnType, TodoType } from "./ContainerSort";

const sampleTodos: TodoType[] = [
  {
    id: uuidv4(),
    title: "Todo item 1",
    column: "incomplete",
    sortIndex: 0,
  },
  {
    id: uuidv4(),
    title: "Todo item 2",
    column: "incomplete",
    sortIndex: 1,
  },
  {
    id: uuidv4(),
    title: "Todo item 3",
    column: "incomplete",
    sortIndex: 2,
  },
  {
    id: uuidv4(),
    title: "Todo item 4",
    column: "completed",
    sortIndex: 3,
  },
  {
    id: uuidv4(),
    title: "Todo item 5",
    column: "completed",
    sortIndex: 4,
  },
];

const getInitialTodos = (): TodoType[] => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : sampleTodos;
};

function SortDnd() {
  const [todos, setTodos] = React.useState<TodoType[]>(getInitialTodos());

  const [sortedTodos, setSortedTodos] = React.useState(
    todos.sort((a, b) => (a.sortIndex > b.sortIndex ? 1 : -1))
  );

  React.useEffect(() => {
    setSortedTodos(todos.sort((a, b) => (a.sortIndex > b.sortIndex ? 1 : -1)));
  }, [todos]);

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDragEnd = (result: DropResult) => {
    console.log("result", result);
    const { source, destination } = result;
    if (!destination) return;

    const tempTodos = [...sortedTodos];
    const [movedItem] = tempTodos.splice(source.index, 1);
    console.log("moved", movedItem);
    movedItem.column = destination.droppableId as ColumnType;
    tempTodos.splice(destination?.index, 0, movedItem);
    console.log("final one", tempTodos);
    setTodos(tempTodos.map((todo, index) => ({ ...todo, sortIndex: index })));
  };

  return (
    <div className="app">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="container-sort__wrapper">
          <div className="container-sort__column">
            <h5>Incomplete</h5>
            <div className="container-sort__items">
              <Droppable droppableId="incomplete">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {sortedTodos
                      .filter((todo) => todo.column === "incomplete")
                      .map((todo, index) => (
                        <Draggable
                          key={todo.id}
                          draggableId={todo.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="list-item-draggable"
                            >
                              <i className="fa-solid fa-bars"></i>
                              <h3>{todo.title}</h3>
                            </div>
                          )}
                        </Draggable>
                      ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
          <div className="container-sort__column">
            <h5>Completed</h5>
            <div className="container-sort__items">
              <Droppable droppableId="completed">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {sortedTodos
                      .filter((todo) => todo.column === "completed")
                      .map((todo, index) => (
                        <Draggable
                          key={todo.id}
                          draggableId={todo.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="list-item-draggable"
                            >
                              <i className="fa-solid fa-bars"></i>
                              <h3>{todo.title}</h3>
                            </div>
                          )}
                        </Draggable>
                      ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
        ;
      </DragDropContext>
    </div>
  );
}

export default SortDnd;
