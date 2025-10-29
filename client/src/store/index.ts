import { create } from "zustand";
import { Idea, userActivity } from "../types";

type State = {
  ideas: Idea[];
  userActivity: userActivity;
};

const useStore = create<State>((set) => ({
  ideas: [],
  userActivity: {
    totalVotes: 0,
    votedIdeas: [],
  },
}));
