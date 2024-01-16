import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGetNewsRequest, IGetNewsSuccess, IListNewsJson, PAGE_SIZE_NEWS } from './News.type';
import { IState } from 'reduxs/global-reducers';
import { isNilOrEmpty } from 'ramda-adjunct';

const initialState = {
  listNewsJson: {} as IListNewsJson,
  listNewsPinned: [] as number[],
  listNewsNotPinned: [] as number[],
  listNews: [] as number[],
  listNewsSearch: [] as number[],
  isEndListNews: false,
  isEndListNewsSearch: false,
};

export const NewsSelectors = {
  selectListNewsPinned: (state: IState) => state.NewsReducer.listNewsPinned,
  selectListNewsNotPinned: (state: IState) => state.NewsReducer.listNewsNotPinned,
  selectListNews: (state: IState) => state.NewsReducer.listNews,
  selectListNewsSearch: (state: IState) => state.NewsReducer.listNewsSearch,
  selectNews: (newsId: number) => (state: IState) => state.NewsReducer.listNewsJson[newsId],
  selectIsEndListNews: (state: IState) => state.NewsReducer.isEndListNews,
  selectIsEndListNewsSearch: (state: IState) => state.NewsReducer.isEndListNewsSearch,
};

const NewsSlice = createSlice({
  name: ' News',
  initialState,
  reducers: {
    getNewsRequest: (state, action: PayloadAction<IGetNewsRequest>) => {
      if (action.payload.isRefresh) {
        if (isNilOrEmpty(action.payload.keyword)) {
          state.listNewsPinned = [];
          state.listNewsNotPinned = [];
          state.listNews = [];
          state.isEndListNews = false;
        } else {
          state.listNewsSearch = [];
          state.isEndListNewsSearch = false;
        }
      }
    },
    getNewsSuccess: (state, action: PayloadAction<IGetNewsSuccess>) => {
      const { listNewsJson, listNews, listNewsPinned, listNewsNotPinned } = state;
      const { isRefresh } = action.payload;
      state.listNewsJson = {
        ...listNewsJson,
        ...action.payload.listNewsJson,
      };

      state.listNewsPinned = isRefresh
        ? action.payload.listNewsPinned
        : [...listNewsPinned, ...action.payload.listNewsPinned];

      state.listNewsNotPinned = isRefresh
        ? action.payload.listNewsNotPinned
        : [...listNewsNotPinned, ...action.payload.listNewsNotPinned];
      state.listNews = isRefresh ? action.payload.listNews : [...listNews, ...action.payload.listNews];

      if (action.payload.listNews.length < PAGE_SIZE_NEWS) {
        state.isEndListNews = true;
      }
    },
    getNewsSearchSuccess: (state, action: PayloadAction<IGetNewsSuccess>) => {
      const { listNewsJson, listNewsSearch } = state;
      state.listNewsJson = {
        ...listNewsJson,
        ...action.payload.listNewsJson,
      };
      if (action.payload.listNews.length > 0) {
        state.listNewsSearch = [...listNewsSearch, ...action.payload.listNews];
      } else {
        state.listNewsSearch = [];
      }
      if (action.payload.listNews.length < PAGE_SIZE_NEWS) {
        state.isEndListNewsSearch = true;
      }
    },
    clearDataSearch: state => {
      state.isEndListNewsSearch = false;
      state.listNewsSearch = [];
    },
    clearData: () => {
      return initialState;
    },
  },
});

export const NewsActions = NewsSlice.actions;
export const NewsReducer = NewsSlice.reducer;
