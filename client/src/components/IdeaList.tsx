import IdeaCard from "./IdeaCard";
import List from "@mui/material/List";
import "./ideas.css";
import { useIdeas } from "../hooks/useIdeas";
import { SortKey } from "./Dropdown";

interface IdeaListProps {
  sort: SortKey;
  setSort: (value: SortKey) => void;
}

const IdeaList = ({ sort }: IdeaListProps) => {
  const { ideas, setIdeas, totalVotes, votedIdeas } = useIdeas(sort);

  function handleVoted(ideaId: number, newVotesCount: number) {
    setIdeas((prev) =>
      prev.map((i) =>
        i.id === ideaId ? { ...i, votesCount: newVotesCount } : i
      )
    );
  }

  const limitReached = (totalVotes ?? 0) >= 10;

  return (
    <List className="idea_list">
      {ideas.map((idea) => {
        const alreadyVoted = votedIdeas.includes(idea.id as number);
        return (
          <IdeaCard
            key={idea.id}
            idea={idea}
            onVoted={handleVoted}
            isAlreadyVoted={alreadyVoted}
            isLimitReached={limitReached}
          />
        );
      })}
    </List>
  );
};

export default IdeaList;
