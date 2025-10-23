import React from "react";
import { Idea } from "../types";
import IdeaCard from "./IdeaCard";
import List from "@mui/material/List";
import "./ideas.css";

const ideas: Idea[] = [
  {
    text: "Разрешите фронтендерам ничего не делать",
    votes: 1,
  },
  { text: "Разрешите фронтендерам делать", votes: 10 },
  { text: "Разрешите ничего не делать", votes: 15 },
];

const IdeaList = () => {
  return (
    <List className="idea_list">
      {ideas.map((idea) => (
        <IdeaCard idea={idea} />
      ))}
    </List>
  );
};

export default IdeaList;
