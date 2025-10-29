export type Idea = {
  id?: number;
  title: string;
  description?: string;
  votesCount: number;
};

export type Vote = {
  id: string;
  ideaId: number;
  ip: string;
  createdAt: string;
};

export type VoteSuccessResponse = {
  message: string;
  vote: Vote;
  idea: Idea;
};

export type VoteErrorResponse = {
  message: string;
};

export type Votes = {
  totalVotes: number;
};

export type userActivity = {
  totalVotes: number;
  votedIdeas: Pick<Idea, "id">[];
};
