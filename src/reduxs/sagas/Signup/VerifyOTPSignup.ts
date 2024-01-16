// import { query, METHOD } from '../../../utils';
import { IRequest, IVerifyOTPSignupRequest } from '../../../interfaces/common';
import { put, takeLatest } from 'redux-saga/effects';
import { VERIFY_OTP_SIGNUP } from 'reduxs/actions';

// const verifyOTPSignup = (data: IObject) => {
//   const uri = 'equity/transfer/cash';

//   const params = {
//     ...data,
//   };
//   return query(global.domainSocket, uri, METHOD.POST, params);
// };

function* doVerifyOTPSignup(request: IRequest<IVerifyOTPSignupRequest>) {
  try {
    // const data = request.payload;
    // yield call(verifyOTPSignup, data);

    yield put({
      type: request.response.success,
      hideLoading: true,
    });
    request.payload.navigation.navigate('SignupEnterName', {});
    // yield put({
    //   type: COMMON_SHOW_NOTIFICATION,
    //   payload: {
    //     type: NOTIFICATION_TYPE.SUCCESS,
    //     title: 'Cash Transfer',
    //     content: 'REQUEST_TRANSFER_CASH_SUCCESS',
    //     contentParams: { amount: request.payload.amount },
    //     time: new Date(),
    //   },
    // });
  } catch (err) {
    yield put({
      type: request.response.fail,
      hideLoading: true,
    });

    // yield put({
    //   type: COMMON_SHOW_NOTIFICATION,
    //   payload: {
    //     type: NOTIFICATION_TYPE.ERROR,
    //     title: 'Cash Transfer',
    //     content: err.code != null ? err.code : err.message,
    //     time: new Date(),
    //   },
    // });
  }
}

export default function* watchVerifyOTPSignup() {
  yield takeLatest(VERIFY_OTP_SIGNUP, doVerifyOTPSignup);
}
