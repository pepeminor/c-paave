import { IAPI, IParams, IResponse } from 'interfaces/common';
import { call } from 'redux-saga/effects';
import { queryWrapper } from './query';
import { DOMAIN_KIS, DOMAIN_PAAVE } from 'interfaces/apis/Domain';

export async function query<T, P = IParams>(
  apiConfig: IAPI,
  params?: P,
  customBaseURI?: string
): Promise<IResponse<T>> {
  return queryWrapper(DOMAIN_PAAVE, apiConfig, params, customBaseURI);
}

export async function queryKis<T, P = IParams>(
  apiConfig: IAPI,
  params?: P,
  customBaseURI?: string
): Promise<IResponse<T>> {
  return queryWrapper(DOMAIN_KIS, apiConfig, params, customBaseURI);
}

export function* callQuery<T, P = IParams>(api: IAPI, request?: P) {
  const response: IResponse<T> = yield call(query, api, request);
  return response.data;
}

export function* callQueryKis<T, P = IParams>(api: IAPI, request?: P) {
  const response: IResponse<T> = yield call(queryKis, api, request);
  return response.data;
}

export * from './helpers';
