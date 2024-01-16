import { takeLeading } from 'redux-saga/effects';
import { watchNewsSaga } from './sagas/getNews';
import { NewsActions } from './News.redux';
import { changeLanguage } from 'reduxs/Localization';
import { watchGetNewsLanguageSaga } from './sagas/getNewsChangeLanguage';

export function* NewsSagas() {
  yield takeLeading(NewsActions.getNewsRequest.type, watchNewsSaga);
  yield takeLeading(changeLanguage.type, watchGetNewsLanguageSaga);
}
