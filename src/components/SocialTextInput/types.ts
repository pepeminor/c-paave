import { Suggestion } from 'react-native-controlled-mentions';

export type KeywordType = 'TAG' | 'MENTION';

export type KeywordConfig = {
  [type in KeywordType]?: {
    keyword: string | undefined;
    onSuggestionPress(suggestion: Suggestion): void;
  };
};

export type PollData = {
  data: string;
  id: number;
};
