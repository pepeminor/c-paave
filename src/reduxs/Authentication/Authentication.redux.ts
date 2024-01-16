/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IContinueLoginSocialParams,
  ICreatePasswordParams,
  ILinkSocialParams,
  ILoginParams,
  ISocialLinkItem,
  IUnlinkSocialParams,
} from '.';
import { PersistConfig } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { IState } from 'reduxs/global-reducers';
import { ISocialLink } from 'interfaces/user';
import { SOCIAL_LINK } from 'constants/main';
import { isNotNilOrEmpty } from 'ramda-adjunct';

export const SOCIAL_LINK_LIST = [SOCIAL_LINK.FACEBOOK, SOCIAL_LINK.GOOGLE, SOCIAL_LINK.APPLE_ID];
const defaultSocialLinkAccount = {
  avatar: '',
  name: '',
  email: '',
  socialType: SOCIAL_LINK.APPLE_ID,
  isLoading: false,
  isLinked: false,
};

const initialState = {
  isCheckingUserName: false,
  showModalRequestPassword: false,
  socialLinkAccounts: {
    [SOCIAL_LINK.FACEBOOK]: {
      ...defaultSocialLinkAccount,
      socialType: SOCIAL_LINK.FACEBOOK,
    } as ISocialLinkItem,
    [SOCIAL_LINK.GOOGLE]: {
      ...defaultSocialLinkAccount,
      socialType: SOCIAL_LINK.GOOGLE,
    } as ISocialLinkItem,
    [SOCIAL_LINK.APPLE_ID]: {
      ...defaultSocialLinkAccount,
      socialType: SOCIAL_LINK.APPLE_ID,
    } as ISocialLinkItem,
  },
};

export const AuthenticationSelectors = {
  selectedIsCheckingUserName: (state: IState) => state.AuthenticationReducer.isCheckingUserName,
  selectedSocialLinkAccounts: (type: SOCIAL_LINK) => (state: IState) =>
    state.AuthenticationReducer.socialLinkAccounts[type],
  selectedShowModalRequestPassword: (state: IState) => state.AuthenticationReducer.showModalRequestPassword,
};

const AuthenticationSlice = createSlice({
  name: 'Authentication',
  initialState,
  reducers: {
    loginSocialRequest(_state, _action: PayloadAction<ILoginParams>) {
      //LoginSocial To call saga
    },
    continueLoginSocialRequest(_state, _action: PayloadAction<IContinueLoginSocialParams>) {
      //LoginSocial To call saga
    },
    createPassword(_state, _action: PayloadAction<ICreatePasswordParams>) {
      //To call saga
    },
    showModalRequestPassword(state) {
      state.showModalRequestPassword = true;
    },
    hideModalRequestPassword(state) {
      state.showModalRequestPassword = false;
    },
    setSocialLinkAccounts(state, action: PayloadAction<ISocialLink[]>) {
      SOCIAL_LINK_LIST.forEach(socialType => {
        const socialLink = action.payload?.find(item => item.socialType === socialType);
        if (isNotNilOrEmpty(socialLink)) {
          state.socialLinkAccounts[socialType] = {
            ...state.socialLinkAccounts[socialType],
            ...socialLink,
            isLoading: false,
            isLinked: true,
          };
        } else {
          state.socialLinkAccounts[socialType] = {
            ...state.socialLinkAccounts[socialType],
            ...socialLink,
            isLoading: false,
            isLinked: false,
          };
        }
      });
    },
    linkSocialRequest(state, action: PayloadAction<ILinkSocialParams>) {
      const { socialType } = action.payload.params;
      state.socialLinkAccounts[socialType].isLoading = true;
    },
    linkSocialSuccess(state, action: PayloadAction<{ socialType: SOCIAL_LINK }>) {
      const { socialType } = action.payload;

      state.socialLinkAccounts[socialType].isLoading = false;
      state.socialLinkAccounts[socialType].isLinked = true;
    },
    linkSocialFailed(state, action: PayloadAction<{ socialType: SOCIAL_LINK }>) {
      const { socialType } = action.payload;

      state.socialLinkAccounts[socialType].isLoading = false;
    },
    unlinkSocialRequest(state, action: PayloadAction<IUnlinkSocialParams>) {
      const { socialType } = action.payload.params;
      state.socialLinkAccounts[socialType].isLoading = true;
    },
    unlinkSocialSuccess(state, action: PayloadAction<{ socialType: SOCIAL_LINK }>) {
      const { socialType } = action.payload;
      state.socialLinkAccounts[socialType] = defaultSocialLinkAccount;
      state.socialLinkAccounts[socialType].socialType = socialType;
    },
    unlinkSocialFailed(state, action: PayloadAction<{ socialType: SOCIAL_LINK }>) {
      const { socialType } = action.payload;
      state.socialLinkAccounts[socialType].isLoading = false;
    },
    checkLinkedAccounts() {
      // To call saga
    },
  },
});

const persistConfig: PersistConfig<ReturnType<typeof AuthenticationSlice.reducer>> = {
  key: 'Authentication',
  storage: AsyncStorage,
  whitelist: ['listAccountKISLogin'],
};

export const AuthenticationActions = AuthenticationSlice.actions;
export const AuthenticationReducer = persistReducer(persistConfig, AuthenticationSlice.reducer);
