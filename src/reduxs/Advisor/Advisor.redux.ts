import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AdvisorState } from './Advisor.type';
import * as CustomAction from './Advisor.action';
import { merge } from 'lodash';
import { IState } from 'reduxs/global-reducers';

const initialState: AdvisorState = {
  monthlySorted: [],
  annualSorted: [],
  map: {},
  profitLoss: {},
  chartData: {},
  viewsAndFollowers: {},
  isFollowing: {},
};

export const AdvisorSelectors = {
  isFollowing: (advisorId: number) => (state: IState) => state.Advisor.isFollowing[advisorId],
  selectAdvisorInfo: (advisorId: number) => (state: IState) => state.Advisor.map[advisorId]?.[state.lang],
  selectAdvisorChartData: (advisorId: number) => (state: IState) => state.Advisor.chartData[advisorId],
  selectAdvisorProfitLoss: (advisorId: number) => (state: IState) => state.Advisor.profitLoss[advisorId],
  selectAdvisorViewsAndFollows: (advisorId: number) => (state: IState) => state.Advisor.viewsAndFollowers[advisorId],
};

const advisorSlice = createSlice({
  initialState,
  name: 'Advisor',
  reducers: {
    updateAdvisorList: (state, action: PayloadAction<AdvisorState['map']>) => {
      state.map = { ...state.map, ...action.payload };
      state.monthlySorted = Object.keys(state.map).map(Number);
      state.annualSorted = Object.keys(state.map).map(Number);
    },
    updateAdvisorState: (state, action: PayloadAction<Partial<AdvisorState>>) => {
      const newState = merge(state, action.payload);

      // Update advisor rank
      if ('profitLoss' in action.payload) {
        newState.monthlySorted = newState.monthlySorted.sort((a, b) => {
          const aProfitLoss = newState.profitLoss[a]?.oneMonthProfitLoss.navProfitRatio || 0;
          const bProfitLoss = newState.profitLoss[b]?.oneMonthProfitLoss.navProfitRatio || 0;
          return bProfitLoss - aProfitLoss;
        });
        newState.annualSorted = newState.annualSorted.sort((a, b) => {
          const aProfitLoss = newState.profitLoss[a]?.oneYearProfitLoss.navProfitRatio || 0;
          const bProfitLoss = newState.profitLoss[b]?.oneYearProfitLoss.navProfitRatio || 0;
          return bProfitLoss - aProfitLoss;
        });
      }
      return newState;
    },
    increaseViewsCount: (state, action: PayloadAction<number | undefined>) => {
      if (action.payload == null) return;
      const advisor = state.viewsAndFollowers[action.payload];
      if (advisor == null) return;
      if (advisor.totalViews == null) {
        advisor.totalViews = 0;
      }
      advisor.totalViews += 1;
    },
  },
  extraReducers(builder) {
    builder.addCase(CustomAction.initAdvisorData.type, state => {
      state.profitLoss = {};
      state.chartData = {};
      state.viewsAndFollowers = {};
      state.isFollowing = {};
    });
    builder.addCase(
      CustomAction.followAdvisor.fulfilled,
      (state, action: PayloadAction<AdvisorState['isFollowing']>) => {
        for (const [key, value] of Object.entries(action.payload)) {
          const advisor = state.viewsAndFollowers[Number(key)];
          if (advisor == null) continue;
          if (value) {
            if (advisor.totalFollowers == null) {
              advisor.totalFollowers = 0;
            }
            advisor.totalFollowers += 1;
          } else {
            if (advisor.totalFollowers == null) {
              advisor.totalFollowers = 1;
            }
            advisor.totalFollowers -= 1;
          }
        }
        state.isFollowing = { ...state.isFollowing, ...action.payload };
      }
    );
  },
});

export const AdvisorActions = { ...advisorSlice.actions, ...CustomAction };
export const AdvisorReducer = advisorSlice.reducer;
