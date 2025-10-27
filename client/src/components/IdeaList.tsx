import IdeaCard from "./IdeaCard";
import List from "@mui/material/List";
import "./ideas.css";
import { Idea } from "../types";

interface IdeaListProps {
  ideas: Idea[];
  setIdeas: (ideas: Idea[] | ((prev: Idea[]) => Idea[])) => void;
  loading: boolean;
  error: null | string;
}

const IdeaList = ({ ideas, setIdeas, loading, error }: IdeaListProps) => {
  // Колбэк, который карточка вызовет после успешного голосования
  function handleVoted(ideaId: number, newVotesCount: number) {
    setIdeas((prev) =>
      prev.map((i) =>
        i.id === ideaId ? { ...i, votesCount: newVotesCount } : i
      )
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
