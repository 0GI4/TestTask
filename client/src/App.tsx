import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import IdeaList from "./components/IdeaList";
import Header from "./components/Header";
import Test1 from "./components/Test1";

function App() {
  return (
    <div className="App">
      <Header />
      <IdeaList />
    </div>
  );
}

export default App;
