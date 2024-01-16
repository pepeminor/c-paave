import { call, put, select, takeLeading } from 'redux-saga/effects';
import { LINK_ACCOUNT_KIS_INIT } from '../../actions';
import {
  IGetAllPartnersResponse,
  ILinkAccountKisInitRequest,
  ILinkAccountKisInitResponse,
  ILinkAccountsRequest,
  IRequest,
  IResponse,
} from 'interfaces/common';
import APIList from 'config/api';
import { queryKis, query, OneSignalUtils } from 'utils';
import { linkAccounts } from 'reduxs/global-actions/LinkAccounts';
import { RealAccountSec } from 'screens/AccountTrading';
import { IState } from 'reduxs/global-reducers';

const linkAccountKisInit = (params: ILinkAccountKisInitRequest) => {
  return queryKis(APIList.linkAccountKisInit, params, undefined);
};

const getAllPartner = () => {
  return query(APIList.getAllPartner);
};

function* doLinkAccountKisInit(request: IRequest<ILinkAccountKisInitRequest>) {
  try {
    const response: IResponse<ILinkAccountKisInitResponse> = yield call(linkAccountKisInit, request.payload);
    let partner: IGetAllPartnersResponse | null = yield select((state: IState) => state.allPartner[0]);
    if (partner == null) {
      const response2: IResponse<IGetAllPartnersResponse[]> | undefined = yield call(getAllPartner);
      partner = response2 != null ? response2.data[0] : null;
    }
    const partnerUsername: string = yield select((state: IState) => state.loginRealAccountKISresult?.userInfo.username);
    const params: ILinkAccountsRequest = {
      partnerId: partner?.partnerId ?? '',
      partnerUsername,
      authCode: response.data.authCode,
      realAccountType: RealAccountSec.KIS,
      optBoard: false,
    };
    yield put({
      type: request.response.success,
      payload: response.data,
    });
    yield put(linkAccounts(params));
    OneSignalUtils.sendLoginTag({
      // status: 'signin-partner',
      partner_kis: partnerUsername != null ? partnerUsername.toLowerCase() : '',
    });
  } catch (error) {
    yield put({
      type: request.response.fail,
      hideLoading: true,
    });
  }
}

export default function* watchLinkAccountKisInit() {
  yield takeLeading(LINK_ACCOUNT_KIS_INIT, doLinkAccountKisInit);
}
