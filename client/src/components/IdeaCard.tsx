import React, { useRef, useState } from "react";
import { Idea } from "../types";
import "./ideas.css";
import { ListItem } from "@mui/material";
import { voteForIdea } from "../api/ideas";

type VoteSuccessResponse = {
  message: string;
  vote: { id: string; ideaId: number; ip: string; createdAt: string };
  idea: {
    id: number;
    title: string;
    description: string;
    votesCount: number;
    createdAt: string;
  };
};

const IdeaCard = ({
  idea,
  onVoted,
}: {
  idea: Idea;
  onVoted: (ideaId: number, newVotesCount: number) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  const clickGuardRef = useRef<number>(0);

  async function onVote(ideaId: number) {
    const now = Date.now();
    if (loading || now - clickGuardRef.current < 700) return; 
    clickGuardRef.current = now;

    setLoading(true);
    setStatusText(null);
    setErrorText(null);
    try {
      const res = (await voteForIdea(String(ideaId))) as VoteSuccessResponse;
      onVoted(ideaId, res.idea.votesCount);
      setStatusText(res.message || "Голос принят.");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Ошибка голосования.";
      setErrorText(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ListItem className="idea_item" divider>
      <div
        style={{ width: "60%", overflow: "hidden", textOverflow: "ellipsis" }}
      >
        {idea.title}
      </div>

      <div
        style={{
          width: "30%",
          color: "green",
          textAlign: "right",
          paddingRight: 8,
        }}
      >
        {`Уже проголосовали ${idea.votesCount}`}
      </div>

      <button
        type="button"
        onClick={() => onVote(idea.id as number)}
        className="idea_vote-button"
        style={{ width: "20%" }}
        disabled={loading}
        aria-label={`Проголосовать за идею ${idea.title}`}
      >
        {loading ? "Голосуем..." : "Проголосовать"}
      </button>

      {statusText && (
        <div style={{ color: "teal", marginLeft: 12 }}>{statusText}</div>
      )}
      {errorText && (
        <div style={{ color: "crimson", marginLeft: 12 }}>{errorText}</div>
      )}
    </ListItem>
  );
};

export default IdeaCard;
