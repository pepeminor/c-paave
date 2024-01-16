import { ACCOUNT_TYPE } from 'global';
import { IAccount, IAction, IAPI, IParams, IResponse } from 'interfaces/common';
import { call, select, takeEvery, takeLeading } from 'redux-saga/effects';
import { query, queryKis, Params, handleCommonSagaEffect } from 'utils';
import { IState } from 'reduxs/global-reducers';

export function createNormalApiQuerySaga<T = IParams, R = IResponse<any>>(
  api: IAPI,
  actionKey: string,
  callbackSuccess?: (response: IResponse<R>, action: IAction<T>) => void,
  callbackFail?: (action: IAction<T>, error?: any) => void,
  takeEveryParam?: boolean,
  isKis?: boolean
) {
  function queryApi(params: T) {
    if (isKis === true) {
      return queryKis(api, params);
    } else {
      return query(api, params);
    }
  }

  function* doQueryApi(action: IAction<T>) {
    const queryParams = { ...action.payload, showMessage: undefined, navigation: undefined };
    try {
      const response: IResponse<R> = yield call(queryApi, queryParams);
      handleCommonSagaEffect(action);

      yield callbackSuccess?.(response, action);
      yield action.callBack?.handleSuccess?.(response);
      // console.log('Response from saga ' + actionKey, action.payload, response.data);
    } catch (err) {
      // console.error('Error from saga ' + actionKey, action.payload, error);
      // action.response != null && alertMessage('danger', action.response.fail, error.code ?? error.message);
      const { callBack } = action;
      yield callbackFail?.(action, err);
      callBack?.handleFail?.(err);
    }
  }

  return function* watchDoQueryApi() {
    if (takeEveryParam === true) {
      yield takeEvery(actionKey, doQueryApi);
    } else {
      yield takeLeading(actionKey, doQueryApi);
    }
  };
}

type APIConfig = {
  api: IAPI;
  provider?: ACCOUNT_TYPE;
  beforeQuery?: (action?: IAction<any>) => object;
  callbackSuccess?: (response: IResponse<any>, action: IAction<any>) => void;
  callbackFail?: (action: IAction<any>, error?: any) => void;
  subAccountRequired?: boolean;
  accountNumberRequired?: boolean;
  otpTokenRequired?: boolean;
  mapSchema?: { [s: string]: string };
  removeSchema?: string[];
  isMocking?: boolean;
};

export function createApiQuerySaga(
  actionKey: string,
  apisConfig: {
    [name in ACCOUNT_TYPE]?: APIConfig;
  },
  takeEveryParam?: boolean
) {
  function* doQueryApi(action: IAction<any>) {
    const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
    const apiConfig: APIConfig = apisConfig[selectedAccount.type] || ({} as APIConfig);
    if (!apiConfig) return;

    const { api, provider, beforeQuery, callbackSuccess, callbackFail } = apiConfig;

    if (apiConfig.isMocking) {
      handleCommonSagaEffect(action);
      if (callbackSuccess) {
        yield callbackSuccess({ data: {} }, action);
      }
      return;
    }

    try {
      const params: object = beforeQuery && (yield beforeQuery(action));
      const queryFunc = getProvider(provider ?? selectedAccount.type);
      const queryParams = prepareParams({ ...action.payload, ...params }, selectedAccount, apiConfig);
      const response: IResponse<any> = yield call(queryFunc, api, queryParams);
      handleCommonSagaEffect(action);
      if (callbackSuccess) {
        yield callbackSuccess(response, action);
        const handleSuccess = action.callBack?.handleSuccess;
        yield handleSuccess && handleSuccess(response);
      }
      // console.log('Response from saga ' + actionKey, action.payload, response.data);
    } catch (error) {
      // console.log('Error from saga ' + actionKey, action.payload, error);
      if (callbackFail) {
        const handleFail = action.callBack?.handleFail;
        yield handleFail && handleFail();
        yield callbackFail(action, error);
      }
    }
  }

  return function* watchDoQueryApi() {
    if (takeEveryParam === true) {
      yield takeEvery(actionKey, doQueryApi);
    } else {
      yield takeLeading(actionKey, doQueryApi);
    }
  };
}

function getProvider(provider: ACCOUNT_TYPE) {
  switch (provider) {
    case ACCOUNT_TYPE.VIRTUAL:
      return query;
    case ACCOUNT_TYPE.KIS:
      return queryKis;
    default:
      return query;
  }
}

function prepareParams(params: any, selectedAccount: IAccount, apiConfig: APIConfig) {
  const accountNumber = selectedAccount.selectedSubAccount?.accountNumber;
  const clientID = selectedAccount.username;
  return new Params(params)
    .mapFields(apiConfig.mapSchema)
    .removeFields(apiConfig.removeSchema)
    .removeFields(['navigation', 'showMessage'])
    .setField('clientID', clientID)
    .setFieldWithCondition('subAccount', accountNumber, apiConfig.subAccountRequired)
    .setFieldWithCondition('accountNumber', accountNumber, apiConfig.accountNumberRequired).obj;
}
