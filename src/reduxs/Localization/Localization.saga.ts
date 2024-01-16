import { takeLeading } from 'redux-saga/effects';
import { initI18n, updateI18n } from './Localization.redux';
import { watchInitI18n } from './sagas/InitI18n.saga';
import { watchUpdateI18n } from './sagas/UpdateI18n.saga';

export function* LocalizationSagas() {
  yield takeLeading(initI18n.type, watchInitI18n);
  yield takeLeading(updateI18n.type, watchUpdateI18n);
}
