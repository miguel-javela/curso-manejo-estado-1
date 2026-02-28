import React from "react";
import logo from './logo.svg';
import './App.css';
import { UseState } from "./UseState";
import { UseReducer } from "./UseReducer";

function App() {
  return (
    <div className="App">
      <UseState name="use State"/>
      <UseReducer name="Use Reducer"/>
    </div>
  );
}

export default App;
