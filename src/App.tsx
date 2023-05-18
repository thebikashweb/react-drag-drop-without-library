import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import MainRoutes from "./Routes";

function App() {
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
