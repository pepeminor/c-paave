import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerStatus } from 'interfaces/reducer';
import { IPostNewFeedbackRequest, IPostNewFeedbackData, IInitialState } from '.';
import { IState } from 'reduxs/global-reducers';
import { PersistConfig, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: IInitialState = {
  feedBack: {
    data: {} as IPostNewFeedbackData,
    status: ReducerStatus.LOADING,
  },
  timeFeedbackPrevious: {},
};

export const FeedBackSelectors = {
  selectTimeFeedbackPrevious: (userId: number) => (state: IState) =>
    state.FeedBackReducer.timeFeedbackPrevious?.[userId] ?? 0,
};

const FeedBackSlice = createSlice({
  name: 'FeedBack',
  initialState,
  reducers: {
    feedBackRequest(state, _action: PayloadAction<IPostNewFeedbackRequest>) {
      state.feedBack = initialState.feedBack;
    },
    feedBackSuccess(state, action: PayloadAction<IPostNewFeedbackData>) {
      const timestamp = new Date().getTime();
      const { timeFeedbackPrevious } = state;
      state.feedBack.data = action.payload;
      state.feedBack.status = ReducerStatus.SUCCESS;
      state.timeFeedbackPrevious = {
        ...timeFeedbackPrevious,
        [action.payload.userId]: timestamp,
      };
    },
    feedBackFailed(state) {
      state.feedBack = initialState.feedBack;
    },
  },
});

const persistConfig: PersistConfig<ReturnType<typeof FeedBackSlice.reducer>> = {
  key: 'Feedback',
  storage: AsyncStorage,
  whitelist: ['timeFeedbackPrevious'],
};

export const FeedBackActions = FeedBackSlice.actions;
export const FeedBackReducer = persistReducer(persistConfig, FeedBackSlice.reducer);
