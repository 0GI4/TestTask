import React, { useEffect, useRef, useState } from "react";
import { Idea } from "../types";
import "./ideas.css";
import { ListItem } from "@mui/material";
import { voteForIdea } from "../api/ideas";
import useIdeaStore from "../store";

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
  isAlreadyVoted,
  isLimitReached,
}: {
  idea: Idea;
  onVoted: (ideaId: number, newVotesCount: number) => void;
  isAlreadyVoted: boolean;
  isLimitReached: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  const { addVotedIdea, incrementTotalVotes } = useIdeaStore();

  const clickGuardRef = useRef<number>(0);
  const statusTimerRef = useRef<number | null>(null);

  const disabled = loading || isLimitReached || isAlreadyVoted;

  // Скрыть "Голос принят." через 3 секунды
  useEffect(() => {
    if (!statusText) return;
    if (statusTimerRef.current) {
      window.clearTimeout(statusTimerRef.current);
      statusTimerRef.current = null;
    }
    statusTimerRef.current = window.setTimeout(() => {
      setStatusText(null);
      statusTimerRef.current = null;
    }, 3000);

    return () => {
      if (statusTimerRef.current) {
        window.clearTimeout(statusTimerRef.current);
        statusTimerRef.current = null;
      }
    };
  }, [statusText]);

  async function onVote(ideaId: number) {
    const now = Date.now();
    if (loading || now - clickGuardRef.current < 700) return;
    clickGuardRef.current = now;
    if (disabled) return;

    setLoading(true);
    setStatusText(null);
    setErrorText(null);
    try {
      const res = (await voteForIdea(String(ideaId))) as VoteSuccessResponse;

      onVoted(ideaId, res.idea.votesCount);
      addVotedIdea(ideaId);
      incrementTotalVotes();

      setStatusText(res.message || "Голос принят.");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Ошибка голосования.";
      setErrorText(msg);
      if (msg.includes("уже голосовали") || msg.includes("Уже голосовали")) {
        addVotedIdea(ideaId);
      }
    } finally {
      setLoading(false);
    }
  }

  const btnText = isLimitReached
    ? "Вы уже проголосовали за 10 идей"
    : isAlreadyVoted
    ? "Уже голосовали"
    : loading
    ? "Голосуем..."
    : "Проголосовать";

  return (
    <ListItem className="idea_item" divider>
      <div
        style={{ width: "60%", overflow: "hidden", textOverflow: "ellipsis" }}
        title={idea.title}
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
        disabled={disabled}
        aria-disabled={disabled}
        data-disabled={disabled ? "true" : "false"}
        data-state={
          isLimitReached ? "limit" : isAlreadyVoted ? "voted" : "ready"
        }
        aria-label={
          isLimitReached
            ? "Вы уже проголосовали за 10 идей"
            : `Проголосовать за идею ${idea.title}`
        }
        title={isLimitReached ? "Лимит голосов исчерпан" : undefined}
      >
        {btnText}
      </button>

      {statusText && (
        <div
          className="idea_status"
          role="status"
          aria-live="polite"
          data-visible={!!statusText}
          style={{ marginLeft: 12 }}
        >
          {statusText}
        </div>
      )}
      {errorText && (
        <div
          className="idea_error"
          style={{ color: "crimson", marginLeft: 12 }}
        >
          {errorText}
        </div>
      )}
    </ListItem>
  );
};

export default IdeaCard;
