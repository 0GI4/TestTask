import React from "react";
import { Idea } from "../types";
import "./ideas.css";

const IdeaCard = ({ idea }: { idea: Idea }) => {
  return (
    <div className="idea">
      <div className="idea-main-text">{`${idea.text}`}</div>

      <div className="idea-votes-text">{`Уже проголосовали ${idea.votes} человек`}</div>

      <button className="idea-button_vote">Проголосовать</button>
    </div>
  );
};

export default IdeaCard;
