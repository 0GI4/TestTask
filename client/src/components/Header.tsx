import React, { useState } from "react";
import SortDropdown, { SortKey } from "./Dropdown";
import "./ideas.css";
import voteIcon from "../assets/icons/free-icon-vote-95377.png";

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
        <div className="ideas_header-rightSide_votes">
          <div className="rightSide_votes-counter">7/10</div>
          <img src={voteIcon} alt="" width={20} height={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;
