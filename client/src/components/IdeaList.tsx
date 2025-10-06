import React from "react";
import { Idea } from "../types";
import IdeaCard from "./IdeaCard";

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
    <div>
      {ideas.map((idea) => (
        <IdeaCard idea={idea} />
      ))}
    </div>
  );
};

export default IdeaList;
