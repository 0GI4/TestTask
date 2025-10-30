import { create } from "zustand";
import { Idea, userActivity } from "../types";

export type State = {
  ideas: Idea[];
  userActivity: userActivity;
};

export type Action = {
  setIdeas: (ideas: Idea[] | ((prev: Idea[]) => Idea[])) => void;
  setTotalVotes: (totalVotes: number) => void;
  setVotedIdeas: (ids: number[]) => void;
  addVotedIdea: (id: number) => void;
  incrementTotalVotes: () => void;
};

const useIdeaStore = create<State & Action>((set) => ({
  ideas: [],
  userActivity: {
    totalVotes: 0,
    votedIdeas: [],
  },
  setIdeas: (value: Idea[] | ((prev: Idea[]) => Idea[])) =>
    set((state) => ({
      ideas:
        typeof value === "function"
          ? (value as (prev: Idea[]) => Idea[])(state.ideas)
          : value,
    })),
  setTotalVotes: (totalVotes: number) =>
    set((state) => ({
      userActivity: {
        ...state.userActivity,
        totalVotes,
      },
    })),
  setVotedIdeas: (ids) =>
    set((state) => ({
      userActivity: { ...state.userActivity, votedIdeas: ids },
    })),
  addVotedIdea: (id) =>
    set((state) =>
      state.userActivity.votedIdeas.includes(id)
        ? state
        : {
            userActivity: {
              ...state.userActivity,
              votedIdeas: [...state.userActivity.votedIdeas, id],
            },
          }
    ),
  incrementTotalVotes: () =>
    set((state) => ({
      userActivity: {
        ...state.userActivity,
        totalVotes: state.userActivity.totalVotes + 1,
      },
    })),
}));

export default useIdeaStore;
