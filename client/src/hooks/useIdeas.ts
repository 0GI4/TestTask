import { useEffect } from "react";
import useIdeaStore from "../store";
import { getIdeas, getTotalVotes } from "../api/ideas";
import { SortKey } from "../components/Dropdown";

export function useIdeas(sort: SortKey) {
  const { ideas, setIdeas, setTotalVotes, userActivity, setVotedIdeas } =
    useIdeaStore();

  useEffect(() => {
    (async () => {
      const ideasData = await getIdeas(sort);
      setIdeas(ideasData);

      const votes = await getTotalVotes();
      setTotalVotes(votes.totalVotes);
      setVotedIdeas(Array.isArray(votes.votedIdeas) ? votes.votedIdeas : []);
    })();
  }, [setIdeas, setTotalVotes, setVotedIdeas, sort]);

  return {
    ideas,
    totalVotes: userActivity.totalVotes,
    votedIdeas: userActivity.votedIdeas,
    setIdeas,
  };
}
