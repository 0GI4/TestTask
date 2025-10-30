import React, { useState } from "react";
import "./App.css";
import IdeaList from "./components/IdeaList";
import Header from "./components/Header";
import { SortKey } from "./components/Dropdown";

function App() {
  const [sort, setSort] = useState<SortKey>("popular");

  return (
    <div className="App">
      <Header sort={sort} setSort={setSort} />
      <IdeaList sort={sort} setSort={setSort} />
    </div>
  );
}

export default App;
