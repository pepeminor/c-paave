import { put, takeLeading } from 'redux-saga/effects';
import { LOGIN_REAL_ACCOUNT } from '../../actions';
import {
  IClientData,
  ILoginRealAccountKisResult,
  ILoginRealAccountRequest,
  IRequest,
  IResponse,
} from 'interfaces/common';
import { loadKisClientData, loginDomainKis } from 'utils';
import { RealAccountSec } from 'screens/AccountTrading';
import { Global } from 'constants/main';
import { Platform } from 'react-native';
import { LOGIN_REAL_ACCOUNT_KIS_SUCCESS } from 'screens/LoginRealAccount/reducers';
import { CHANNEL } from 'constants/enum';
import { setKisAuthToken, generateKisCardFrom, generateNewKisCard } from 'reduxs/global-actions/Authentication';
import config from 'config';

export function reduceKisUsername(username: string) {
  if (username?.includes('057')) {
    username = username.replace('057', '');
  }
  return username.toUpperCase();
}

function* doLoginRealAccount(request: IRequest<ILoginRealAccountRequest>) {
  switch (request.payload.sec) {
    case RealAccountSec.KIS:
      try {
        const clientData: IResponse<IClientData> = yield loadKisClientData(Global.sockets[request.payload.sec]);
        const reducedKisUserName = reduceKisUsername(request.payload.username);
        const params = {
          grant_type: 'password',
          client_id: clientData.data.clientId,
          client_secret: clientData.data.clientSecret,
          sec_code: 'kis',
          username: reducedKisUserName,
          password: request.payload.password,
          mobileLogin: true,
          macAddress: config.macAddress,
          platform: Platform.OS === 'ios' ? CHANNEL.MTS_PAAVE_IOS : CHANNEL.MTS_PAAVE_ANDROID,
          appVersion: config.appVersion,
        };
        const response: IResponse<ILoginRealAccountKisResult> = yield loginDomainKis(
          Global.sockets[request.payload.sec],
          params
        );
        const authToken = {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          accExpiredTime: response.data.accExpiredTime,
          refExpiredTime: response.data.refExpiredTime,
        };

        yield put(setKisAuthToken(authToken));
        yield put({
          type: LOGIN_REAL_ACCOUNT_KIS_SUCCESS,
          payload: response.data,
        });
        yield put({
          type: request.response.success,
        });
        const paramsMatrix = {
          username: reducedKisUserName,
          from: generateKisCardFrom.CONNECT_ACCOUNT,
        };
        yield put(generateNewKisCard(paramsMatrix));
      } catch (e: any) {
        yield put({
          type: request.response.fail,
          hideLoading: true,
        });
      }
      break;
    default:
      break;
  }
}

export default function* watchLoginRealAccount() {
  yield takeLeading(LOGIN_REAL_ACCOUNT, doLoginRealAccount);
}
