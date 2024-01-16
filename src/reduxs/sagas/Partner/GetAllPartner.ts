import APIList from 'config/api';
import { IGetAllPartnersResponse, IRequest, IResponse } from 'interfaces/common';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { linkAccountInit } from 'reduxs/global-actions/LinkAccountKisInit';
import { IState } from 'reduxs/global-reducers';
import { query } from 'utils';
import { GET_ALL_PARTNER } from '../../actions';

const getAllPartner = () => {
  return query(APIList.getAllPartner);
};

function* doGetAllPartner(request: IRequest<string>) {
  try {
    const response: IResponse<IGetAllPartnersResponse[]> = yield call(getAllPartner);
    yield put({
      type: request.response.success,
      payload: response.data,
    });
    yield put(
      linkAccountInit({
        partnerId: response.data[0].targetPartnerId,
        partnerUsername: yield select((state: IState) => state.loginData?.userInfo?.username ?? ''),
      })
    );
  } catch (error) {
    // alertMessage('danger', 'Get All Partner', error.message);
    yield put({
      type: request.response.fail,
      hideLoading: true,
    });
  }
}

export default function* watchGetAllPartner() {
  yield takeLeading(GET_ALL_PARTNER, doGetAllPartner);
}
