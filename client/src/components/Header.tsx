import React, { useState } from "react";
import SortDropdown, { SortKey } from "./Dropdown";

const Header = () => {
  const [sort, setSort] = useState<SortKey>("popular");
  return (
    <header>
      <h1>Идеи по развитию</h1>
      <SortDropdown value={sort} onChange={setSort} />
    </header>
  );
};

export default Header;
