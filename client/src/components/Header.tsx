import React from "react";
import SortDropdown, { SortKey } from "./Dropdown";
import "./ideas.css";
import voteIcon from "../assets/icons/free-icon-vote-95377.png";
import useIdeaStore from "../store";

interface HeaderProps {
  sort: SortKey;
  setSort: (value: SortKey) => void;
}

const Header = ({ sort = "popular", setSort }: HeaderProps) => {
  const { userActivity } = useIdeaStore();

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
          <div className="rightSide_votes-counter">
            {userActivity?.totalVotes ?? 0}/10
          </div>
          <img src={voteIcon} alt="" width={20} height={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;
