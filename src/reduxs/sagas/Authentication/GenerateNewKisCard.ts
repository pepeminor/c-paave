import { put, call, takeLeading, select } from 'redux-saga/effects';
import { IGenerateNewKisCardResponse, IRequest, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { queryKis } from 'utils';
import { GENERATE_NEW_KIS_CARD } from 'reduxs/actions';
import { generateKisCardFrom, setAuthToken, setKisAuthToken } from 'reduxs/global-actions/Authentication';
import { defaultAuthTokenState } from 'reduxs/global-reducers/Authentication';
import { RESET_GLOBAL_ACCOUNT_LIST } from 'reduxs/global-reducers/AccountList';
import { notifyKisMobileOtp } from '../../../components/ModalOTPKIS/action';
import { INotifyOtpPartner } from 'interfaces/notification';
import { IState } from 'reduxs/global-reducers';
import { IUserSetting } from '../../../interfaces/user';
import { KIS_OPEN_MODAL_OTP } from '../../actions';

const generateNewKisCard = (username: string) => {
  const params = {
    clientID: username,
  };
  return queryKis(APIList.generateNewKisCard, params);
};

function* doGenerateNewKisCard(request: IRequest<{ username: string; from: generateKisCardFrom }>) {
  const currentUserSetting: IUserSetting = yield select((state: IState) => state.currentUserSetting);
  try {
    const response: IResponse<IGenerateNewKisCardResponse> = yield call(generateNewKisCard, request.payload.username);

    yield put({
      type: request.response.success,
      payload: { ...response.data },
      hideLoading: true,
    });

    if (response.data.wordMatrixId != null) {
      if (request.payload.from === generateKisCardFrom.CONNECT_ACCOUNT) {
        const paramsNotifyKisMobileOtp = {
          forceSMS: true,
          matrixId: response.data.wordMatrixId,
          playerId: request.payload.username,
        };
        yield call(queryKis, APIList.postCallSmsToKisMobileNumberOwner, paramsNotifyKisMobileOtp);
        yield put({
          type: KIS_OPEN_MODAL_OTP,
        });
      } else if (currentUserSetting != null) {
        const paramsNotifyKisMobileOtp: INotifyOtpPartner = {
          forceSMS: currentUserSetting.isSms ? true : false,
          matrixId: response.data.wordMatrixId,
          partnerId: 'kis',
        };
        yield put(notifyKisMobileOtp(paramsNotifyKisMobileOtp));
      }
    }
  } catch (error) {
    if (request.payload.from === generateKisCardFrom.LOGIN) {
      yield put(setAuthToken(defaultAuthTokenState));
      yield put(setKisAuthToken(defaultAuthTokenState));
      yield put({ type: RESET_GLOBAL_ACCOUNT_LIST });
    }
    yield put({
      type: request.response.fail,
      hideLoading: true,
    });
    // yield put({
    //   type: COMMON_SHOW_NOTIFICATION,
    //   payload: {
    //     type: NOTIFICATION_TYPE.ERROR,
    //     title: 'Generate Kis Card',
    //     content: error.code ?? error.message,
    //     time: new Date(),
    //   },
    // });
    // alertMessage('danger', 'Generate Kis Card', error.code ?? error.message);
  }
}

export default function* watchGenerateNewKisCard() {
  yield takeLeading(GENERATE_NEW_KIS_CARD, doGenerateNewKisCard);
}
