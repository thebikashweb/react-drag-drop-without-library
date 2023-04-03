import React from "react";
import { v4 as uuidv4 } from "uuid";

type ItemType = {
  name: string;
  id: string;
  column: "left" | "right";
};

function SortDnd() {
  const [fruitItems, setFruitItems] = React.useState<Array<ItemType>>([
    {
      name: "Apple",
      id: uuidv4(),
      column: "left",
    },
    {
      name: "Banana",
      id: uuidv4(),
      column: "left",
    },
    {
      name: "Orange",
      id: uuidv4(),
      column: "left",
    },
  ]);
  const [newFruitItem, setNewFruitItem] = React.useState("");

  //handle name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFruitItem(e.target.value);
  };

  //handle new item addition
  const handleAddItem = () => {
    const _fruitItems = [...fruitItems];
    _fruitItems.push({ name: newFruitItem, id: uuidv4(), column: "left" });
    setFruitItems(_fruitItems);
  };

  return (
    <div className="app">
      <h2>Fruit List</h2>
      <div className="input-group">
        <input
          type="text"
          name="fruitName"
          placeholder="e.g Banana"
          onChange={handleNameChange}
        />
        <button className="btn" onClick={handleAddItem}>
          Add item
        </button>
      </div>

      <div className="list-container">
        <div className="list-container__left">
          {Boolean(
            fruitItems.filter((item) => item.column === "left").length
          ) &&
            fruitItems
              .filter((item) => item.column === "left")
              .map((item, index) => (
                <div key={item.id} className="list-item">
                  <i className="fa-solid fa-bars"></i>
                  <h3>{item.name}</h3>
                </div>
              ))}
        </div>
        <div className="list-container__right">empty box</div>
      </div>
    </div>
  );
}

export default SortDnd;
