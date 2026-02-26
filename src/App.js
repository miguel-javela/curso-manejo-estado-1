import React from "react";
import logo from './logo.svg';
import './App.css';
import { UseState } from "./UseState";
import { ClassState } from "./ClassState";

function App() {
  return (
    <div className="App">
      <UseState name="use State"/>
      <ClassState name="class State"/>
    </div>
  );
}

export default App;
