import IdeaCard from "./IdeaCard";
import List from "@mui/material/List";
import "./ideas.css";
import { useIdeas } from "../hooks/useIdeas";
import { SortKey } from "./Dropdown";

interface IdeaListProps {
  sort: SortKey;
  setSort: (value: SortKey) => void;
}

const IdeaList = ({ sort, setSort }: IdeaListProps) => {
  const { ideas, setIdeas } = useIdeas(sort);

  function handleVoted(ideaId: number, newVotesCount: number) {
    setIdeas((prev) =>
      prev.map((i) =>
        i.id === ideaId ? { ...i, votesCount: newVotesCount } : i
      )
    );
  }

  return (
    <List className="idea_list">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} onVoted={handleVoted} />
      ))}
    </List>
  );
};

export default IdeaList;
