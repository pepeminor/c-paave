import { HashTagResponse } from 'reduxs';

export const ScreenTab = {
  SEC: 'Securities',
  // POST: 'Posts',
  HASHTAG: 'Hashtags',
  NEWS: 'News',
  MEM: 'Members',
  // SEC: 'search_screen.securities_tab',
  // POST: 'search_screen.post_tab',
  // HASHTAG: 'search_screen.hashtag_tab',
  // NEWS: 'search_screen.news_tab',
  // MEM: 'search_screen.member_tab',
} as const;
export type ScreenTab = keyof typeof ScreenTab;

export type SearchedTag = HashTagResponse;

export type SearchScreenTabRef = {
  onSearchTextChange: (value: string) => void;
};
