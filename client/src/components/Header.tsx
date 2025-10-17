import React, { useState } from "react";
import SortDropdown, { SortKey } from "./Dropdown";
import "./ideas.css";

const Header = () => {
  const [sort, setSort] = useState<SortKey>("popular");
  return (
    <header className="ideas_header">
      <div className="ideas_header-leftSide">
        {" "}
        <h1>Идеи по развитию</h1>
      </div>
      <div className="ideas_header-rightSide">
        {" "}
        <SortDropdown value={sort} onChange={setSort} />
      </div>
    </header>
  );
};

export default Header;
