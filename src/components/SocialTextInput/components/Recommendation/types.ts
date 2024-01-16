export type RecommendTag = {
  tag: string;
  count?: number;
};

export type RecommendSymbol = {
  symbol: string;
  count?: number;
};

export type RecommendUser = {
  username: string;
  fullname: string;
};

export type RecommendData = RecommendTag | RecommendSymbol | RecommendUser;
