import React, { useEffect, useState } from "react";
import { Idea } from "../types";
import IdeaCard from "./IdeaCard";
import List from "@mui/material/List";
import "./ideas.css";
import { getIdeas } from "../api/ideas";

const IdeaList = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const data = await getIdeas(controller.signal);
        setIdeas(data);
      } catch (e) {
        if ((e as any)?.name === "AbortError") return;
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  // Колбэк, который карточка вызовет после успешного голосования
  function handleVoted(ideaId: number, newVotesCount: number) {
    setIdeas(prev =>
      prev.map(i => (i.id === ideaId ? { ...i, votesCount: newVotesCount } : i))
    );
  }

  if (loading) return <div className="idea_list__loading">Загрузка…</div>;
  if (error) return <div className="idea_list__error">Ошибка: {error}</div>;

  return (
    <List className="idea_list">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} onVoted={handleVoted} />
      ))}
    </List>
  );
};

export default IdeaList;
