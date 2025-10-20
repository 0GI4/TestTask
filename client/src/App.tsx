import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import IdeaList from "./components/IdeaList";
import Header from "./components/Header";
import Test1 from "./components/Test1";

function App() {
  const [value, setValue] = useState<number>(0);
  return (
    <div className="App">
      <Header />
      <Test1 value={value} setValue={setValue} />
      <IdeaList />
    </div>
  );
}

export default App;
