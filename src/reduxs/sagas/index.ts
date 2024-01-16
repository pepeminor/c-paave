import { all, spawn } from 'redux-saga/effects';
import { cancelableSaga } from './CancelableSagas';
import { unCancelableSaga } from './UnCancelableSagas';
import { call } from 'ramda';

export default function* () {
  const sagas = [cancelableSaga, unCancelableSaga];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log('Saga error', saga.name, e);
          }
        }
      })
    )
  );
}
