import React, { useEffect } from "react";
import { Idea } from "../types";
import "./ideas.css";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";

const IdeaCard = ({ idea }: { idea: Idea }) => {
  useEffect(() => {
    fetch("/api/").then((res) => console.log(res));
  }, []);
  return (
    <ListItem>
      <ListItemText style={{ width: "60%" }}>{idea.text}</ListItemText>
      <ListItemText
        style={{ width: "30%", color: "green" }}
      >{`Уже проголосвали ${idea.votes}`}</ListItemText>
      <ListItemButton style={{ width: "20%" }}>Проголосовать</ListItemButton>
    </ListItem>
  );
};

export default IdeaCard;
