import { Action } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects';
import { initI18n, updateI18n } from '../Localization.action';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getKey } from 'utils';
import { storageKey } from 'constants/enum';
import { LANG } from 'global';
import enDefault from 'assets/locales/en.json';
import koDefault from 'assets/locales/ko.json';
import viDefault from 'assets/locales/vi.json';
import { changeLanguage } from '../Localization.redux';

export function* watchInitI18n(action: Action) {
  if (!initI18n.match(action)) return;
  try {
    const lang: LANG = yield getKey(storageKey.LOCAL_LANG);
    yield i18next.use(initReactI18next).init(
      {
        lng: lang ?? LANG.VI,
        fallbackLng: LANG.EN,
        resources: {
          en: {
            translation: enDefault,
          },
          ko: {
            translation: koDefault,
          },
          vi: {
            translation: viDefault,
          },
        },
        compatibilityJSON: 'v3', // temporary, see more here https://www.i18next.com/misc/migration-guide
      },
      err => {
        if (err) {
          // eslint-disable-next-line no-console
          if (__DEV__) console.error(err);
        }
      }
    );
    yield put(changeLanguage(lang ?? LANG.VI));
    yield put({
      type: action.meta.response?.success,
      payload: true,
    });
    yield put(updateI18n());
  } catch (error) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(action.meta.response?.fail);
    }
  }
}
