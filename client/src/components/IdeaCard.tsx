import React, { useEffect } from "react";
import { Idea } from "../types";
import "./ideas.css";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";

const IdeaCard = ({ idea }: { idea: Idea }) => {
  return (
    <ListItem className="idea_item">
      <ListItemText style={{ width: "60%" }}>{idea.title}</ListItemText>
      <ListItemText
        style={{ width: "30%", color: "green" }}
      >{`Уже проголосвали ${idea.votesCount}`}</ListItemText>
      <ListItemButton style={{ width: "20%" }}>Проголосовать</ListItemButton>
    </ListItem>
  );
};

export default IdeaCard;
