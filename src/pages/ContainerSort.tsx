import React from "react";
import { v4 as uuidv4 } from "uuid";

type ItemType = {
  name: string;
  id: string;
  column: "left" | "right";
};

function ContainerSort() {
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

  //save reference for dragItem and dragOverItem
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);
  //save reference for dragItem and dragOverItem
  const dragItemRight = React.useRef<any>(null);
  const dragOverItemRight = React.useRef<any>(null);

  //const handle drag sorting
  const handleLeftSort = () => {
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
    _fruitItems.push({ name: newFruitItem, id: uuidv4(), column: "left" });
    setFruitItems(_fruitItems);
  };

  //handle right container drop items
  const handleRightContainerDrop = () => {
    console.log("is this fired?");
    const draggedItem = fruitItems[dragItem.current];
    if (!dragOverItem) return;
    let _fruitItems = [...fruitItems];
    _fruitItems.push({ ...draggedItem, column: "right" });
    _fruitItems = [
      ...new Map(_fruitItems.map((item) => [item["id"], item])).values(),
    ];
    setFruitItems(_fruitItems);
  };
  //handle left container drop items
  const handleLeftContainerDrop = () => {
    console.log("is this fired?");
    const draggedItem = fruitItems[dragItem.current];
    if (!dragOverItem) return;
    let _fruitItems = [...fruitItems];
    _fruitItems.push({ ...draggedItem, column: "left" });
    _fruitItems = [
      ...new Map(_fruitItems.map((item) => [item["id"], item])).values(),
    ];
    setFruitItems(_fruitItems);
  };
  //const handle drag sorting
  const handleRightSort = () => {
    //duplicate items
    let _fruitItems = [...fruitItems];

    //remove and save the dragged item content
    const draggedItemContent = _fruitItems[dragItemRight.current];

    //switch the position
    _fruitItems.splice(dragOverItemRight.current, 0, draggedItemContent);

    //reset the position ref
    dragItemRight.current = null;
    dragOverItemRight.current = null;

    //update the actual array
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
        <div
          className="list-container__left"
          onDrop={handleLeftContainerDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {Boolean(
            fruitItems.filter((item) => item.column === "left").length
          ) &&
            fruitItems
              .filter((item) => item.column === "left")
              .map((item, index) => (
                <div
                  key={item.id}
                  className="list-item"
                  draggable
                  onDragStart={(e) => (dragItem.current = index)}
                  onDragEnter={(e) => (dragOverItem.current = index)}
                  onDragEnd={handleLeftSort}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <i className="fa-solid fa-bars"></i>
                  <h3>{item.name}</h3>
                </div>
              ))}
        </div>
        <div
          className="list-container__right"
          onDrop={handleRightContainerDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {Boolean(
            fruitItems.filter((item) => item.column === "right").length
          ) &&
            fruitItems
              .filter((item) => item.column === "right")
              .map((item, index) => (
                <div
                  key={item.id}
                  className="list-item"
                  draggable
                  onDragStart={(e) => (dragItemRight.current = index)}
                  onDragEnter={(e) => (dragOverItemRight.current = index)}
                  onDragEnd={handleRightSort}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <i className="fa-solid fa-bars"></i>
                  <h3>{item.name}</h3>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default ContainerSort;
