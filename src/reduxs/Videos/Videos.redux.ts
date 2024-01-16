import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVideoItem, IVideosResponse, VideosState, VideoTab } from './Videos.type';
import { IState } from 'reduxs/global-reducers';

const initialState: VideosState = {
  FULL_VIDEO: {
    isLoading: false,
    videosList: [],
    videosListLength: 0,
    nextPageToken: '',
    totalResults: 0,
    resultsPerPage: 5,
    first5Videos: [],
    firstVideo: {} as IVideoItem,
  },
  SHORT_VIDEO: {
    isLoading: false,
    videosList: [],
    videosListLength: 0,
    nextPageToken: '',
    totalResults: 0,
    resultsPerPage: 5,
    first5Videos: [],
    firstVideo: {} as IVideoItem,
  },
  EDUCATION: {
    isLoading: false,
    videosList: [],
    videosListLength: 0,
    nextPageToken: '',
    totalResults: 0,
    resultsPerPage: 5,
    first5Videos: [],
    firstVideo: {} as IVideoItem,
  },
};

export const VideosSelectors = {
  selectedFullVideos: (state: IState) => state.VideosReducer.FULL_VIDEO.videosList,
  selectedShortVideos: (state: IState) => state.VideosReducer.SHORT_VIDEO.videosList,
  selectedEducationVideos: (state: IState) => state.VideosReducer.EDUCATION.videosList,

  selectedFirst5FullVideos: (state: IState) => state.VideosReducer.FULL_VIDEO.first5Videos,
  selectedFirst5ShortVideos: (state: IState) => state.VideosReducer.SHORT_VIDEO.first5Videos,
  selectedFirst5Education: (state: IState) => state.VideosReducer.EDUCATION.first5Videos,

  selectedNextPageToken: (key: keyof VideosState) => (state: IState) => state.VideosReducer[key].nextPageToken,
  selectedTotalResults: (key: keyof VideosState) => (state: IState) => state.VideosReducer[key].totalResults,
  selectedVideosListLength: (key: keyof VideosState) => (state: IState) => state.VideosReducer[key].videosListLength,
};

const videosSlice = createSlice({
  initialState,
  name: 'Videos',
  reducers: {
    getVideosListRequest(state, action: PayloadAction<VideoTab>) {
      state[action.payload].isLoading = true;
    },
    getVideosListSuccess(state, action: PayloadAction<IVideosResponse>) {
      if (state[action.payload.storeKey].nextPageToken === '') {
        state[action.payload.storeKey].first5Videos = action.payload.items.slice(0, 5);
        state[action.payload.storeKey].firstVideo = action.payload.items[0];
      }
      state[action.payload.storeKey].isLoading = false;
      state[action.payload.storeKey].nextPageToken = action.payload.nextPageToken;
      state[action.payload.storeKey].totalResults = action.payload.pageInfo.totalResults;
      state[action.payload.storeKey].resultsPerPage = action.payload.pageInfo.resultsPerPage;
      const oldList = state[action.payload.storeKey].videosList;
      const newList = [...oldList, ...action.payload.items];
      state[action.payload.storeKey].videosList = newList;
      state[action.payload.storeKey].videosListLength = newList.length;
    },
    getVideosListFailure(state, action: PayloadAction<VideoTab>) {
      state[action.payload].isLoading = false;
    },
  },
});

export const VideosActions = videosSlice.actions;
export const VideosReducer = videosSlice.reducer;
