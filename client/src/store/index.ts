import { create } from "zustand";
import { Idea, userActivity } from "../types";

export type State = {
  ideas: Idea[];
  userActivity: userActivity;
};

export type Action = {
  setIdeas: (ideas: Idea[] | ((prev: Idea[]) => Idea[])) => void;
  setTotalVotes: (totalVotes: number) => void;
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
}));

export default useIdeaStore;
