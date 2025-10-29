import { useEffect } from "react";
import useIdeaStore, { State } from "../store";
import { getIdeas, getTotalVotes } from "../api/ideas";
import { SortKey } from "../components/Dropdown";

export function useIdeas(sort: SortKey) {
  const { ideas, setIdeas, setTotalVotes, userActivity } = useIdeaStore();

  useEffect(() => {
    (async () => {
      const ideasData = await getIdeas(sort);
      setIdeas(ideasData);

      const votes = await getTotalVotes();
      setTotalVotes(votes.totalVotes);
    })();
  }, [setIdeas, setTotalVotes, sort]);

  return { ideas, totalVotes: userActivity.totalVotes, setIdeas };
}
