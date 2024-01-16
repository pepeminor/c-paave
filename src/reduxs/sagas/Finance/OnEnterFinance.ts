import { takeLeading } from 'redux-saga/effects';
import { FINANCE_ENTER_SCREEN } from '../../actions';
import { IAction } from '../../../interfaces/common';

function* queryFinanceData(_action: IAction<string>) {
  //
}

export default function* watchOnEnterScreen() {
  yield takeLeading(FINANCE_ENTER_SCREEN, queryFinanceData);
}
