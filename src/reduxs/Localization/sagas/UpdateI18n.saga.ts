import { Action } from '@reduxjs/toolkit';
import { all, call, put } from 'redux-saga/effects';
import { updateI18n } from '../Localization.action';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enDefault from 'assets/locales/en.json';
import koDefault from 'assets/locales/ko.json';
import viDefault from 'assets/locales/vi.json';
import config from 'config';
import { fetchFileAndStore } from 'utils';
import { LANG } from 'global';

export function* watchUpdateI18n(action: Action) {
  if (!updateI18n.match(action)) return;
  try {
    const [vi, en, ko]: Record<string, string>[] = yield all(
      [LANG.VI, LANG.EN, LANG.KO].map(fileName =>
        call(fetchFileAndStore, fileName, `${config.s3ResourceUrl}/${fileName}.json`)
      )
    );
    yield i18next.use(initReactI18next).init(
      {
        resources: {
          en: {
            translation: en ?? enDefault,
          },
          ko: {
            translation: ko ?? koDefault,
          },
          vi: {
            translation: vi ?? viDefault,
          },
        },
      },
      err => {
        if (err) {
          // eslint-disable-next-line no-console
          if (__DEV__) console.error(err);
        }
      }
    );
    yield put({
      type: action.meta.response?.success,
      payload: true,
    });
  } catch (error) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(action.meta.response?.fail);
    }
  }
}
