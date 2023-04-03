import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import MainRoutes from "./Routes";

function App() {
  const [fruitItems, setFruitItems] = React.useState([
    "Apple",
    "Banana",
    "Orange",
  ]);
  const [newFruitItem, setNewFruitItem] = React.useState("");

  //save reference for dragItem and dragOverItem
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);

  //const handle drag sorting
  const handleSort = () => {
    //duplicate items
    let _fruitItems = [...fruitItems];

    //remove and save the dragged item content
    const draggedItemContent = _fruitItems.splice(dragItem.current, 1)[0];

    //switch the position
    _fruitItems.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setFruitItems(_fruitItems);
  };

  //handle name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFruitItem(e.target.value);
  };

  //handle new item addition
  const handleAddItem = () => {
    const _fruitItems = [...fruitItems];
    _fruitItems.push(newFruitItem);
    setFruitItems(_fruitItems);
  };

  return (
    <div className="app">
      <div className="app__navigation">
        <Link to="/">List sort without library</Link>
        <Link to="/container-sort">Container sort without library</Link>
        <Link to="/sort-dnd">Sort with ReactDnD</Link>
      </div>
      <MainRoutes />
    </div>
  );
}

export default App;
