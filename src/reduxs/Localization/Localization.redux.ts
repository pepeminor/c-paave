/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LANG } from 'global';
import * as LocalizationCustomAction from './Localization.action';
import { SUCCESS } from 'reduxs/action-type-utils';
import i18next from 'i18next';
import { setLocalLang } from './Localization.helper';

const localizationSlice = createSlice({
  name: 'localization',
  initialState: false,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(SUCCESS(LocalizationCustomAction.initI18n.type), (_, action: PayloadAction<boolean>) => {
      return action.payload;
    });
    builder.addCase(SUCCESS(LocalizationCustomAction.updateI18n.type), (_, action: PayloadAction<boolean>) => {
      return action.payload;
    });
  },
});

const languageSlice = createSlice({
  name: 'language',
  initialState: LANG.VI,
  reducers: {
    changeLanguage(_, action: PayloadAction<LANG>) {
      const language = action.payload;
      i18next.changeLanguage(language);
      setLocalLang(language);
      return language;
    },
  },
});

export const { initI18n, updateI18n } = { ...localizationSlice.actions, ...LocalizationCustomAction };
export const { changeLanguage } = languageSlice.actions;

export const localizationReducer = localizationSlice.reducer;
export const languageReducer = languageSlice.reducer;
