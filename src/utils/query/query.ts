import { IAPI, IParams, IResponse } from 'interfaces/common';
import { Requester, RequesterKis, RequesterPaave } from './requester';
import { DOMAIN_KIS, DOMAIN_PAAVE } from 'interfaces/apis/Domain';
import { checkConnection } from './helpers';
import { logQuery } from 'utils/Logger';

type QueryProvider = typeof DOMAIN_PAAVE | typeof DOMAIN_KIS;

export async function queryWrapper<T, P = IParams>(
  type: QueryProvider,
  apiConfig: IAPI,
  params?: P,
  customBaseURI?: string
): Promise<IResponse<T>> {
  await checkConnection();
  const currentRequester: Requester<T, P> = getRequester<T, P>(type, apiConfig, params, customBaseURI);
  try {
    const response = await currentRequester.addHeaders().addPathParams().addQueryParams().addBody().execute();
    logQuery({
      requester: currentRequester,
      response: response.data,
    });
    return response;
  } catch (error) {
    logQuery({
      requester: currentRequester,
      error,
    });
    throw error;
  }
}

function getRequester<R, P>(type: QueryProvider, apiConfig: IAPI, params?: P, customBaseURI?: string): Requester<R, P> {
  if (apiConfig.isKisForward || type == DOMAIN_KIS) {
    return new RequesterKis<R, P>(apiConfig, params, customBaseURI);
  }
  return new RequesterPaave<R, P>(apiConfig, params, customBaseURI);
}
