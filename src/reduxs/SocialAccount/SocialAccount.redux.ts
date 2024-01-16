import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as SocialAccountCustomActions from './SocialAccount.action';
import { SocialAccountState } from './SocialAccount.type';
import { IAccountData } from 'reduxs/SocialPost';
import { mergeDeepRight } from 'ramda';
import { IState } from 'reduxs/global-reducers';

const initialState: SocialAccountState = {
  info: undefined,

  userJson: {},
};

export const SocialAccountSelectors = {
  selectAccount: (userId: string) => (state: IState) => state.SocialAccount.userJson[userId] ?? {},
  selectUserJson: (state: IState) => state.SocialAccount.userJson ?? {},
};
const socialAccountSlice = createSlice({
  initialState,
  name: 'SocialAccount',
  reducers: {
    getAccountInfoById: (_state, _action: PayloadAction<{ userId: string }>) => {},
    getAccountInfoByIdSuccess: (state, action: PayloadAction<{ data: IAccountData }>) => {
      state.userJson = mergeDeepRight(state.userJson, { [action.payload.data.userName]: action.payload.data });
    },
  },
  extraReducers(builder) {
    builder.addCase(
      SocialAccountCustomActions.getSocialAccountInfo.fulfilled,
      (state, action: PayloadAction<SocialAccountState['info']>) => {
        state.info = action.payload;
      }
    );
  },
});

export const SocialAccountActions = { ...socialAccountSlice.actions, ...SocialAccountCustomActions };
export const SocialAccountReducer = socialAccountSlice.reducer;
