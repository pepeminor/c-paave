/**
 * Logger
 * @module Logger to log query
 */

/* eslint-disable no-console */
import { Requester } from './query/requester';
import fetchToCurl, { FetchOptions } from 'fetch-to-curl';
import { CommonError, FulfilledRequestError, RequestError } from './query/helpers';
import { IAPI } from 'interfaces/common';

const CONFIG = {
  /**
   * Switch to true to enable logger
   */
  enabled: false,

  params: true,
  curl: true,
  response: true,
  error: true,

  /**
   * List of APIs to enable logger
   * Empty array means enable all APIs
   */
  enableApis: [
    // APIList.symbolLatest
  ] as IAPI[],
};

const getBackgroundColor = (response?: any, error?: any) => {
  if (response != null) return '#15A25E';
  if (
    error != null &&
    'message' in error &&
    (error.message === CommonError.REQUEST_ABORTED || error.message === 'Aborted')
  ) {
    return '#C8A104';
  }
  return '#B80300';
};

type LogQueryParams<R, P> = {
  requester: Requester<R, P>;
  response?: any;
  error?: any;
};
export const logQuery = <R, P>({ requester, response, error }: LogQueryParams<R, P>) => {
  if (!CONFIG.enabled) return;
  if (CONFIG.enableApis.length > 0 && !CONFIG.enableApis.includes(requester.apiConfig)) return;
  const backgroundColor = getBackgroundColor(response, error);
  const searchParams =
    requester.searchParams && requester.searchParams.toString() !== '' ? `?${requester.searchParams.toString()}` : '';
  console.log(`%c${requester.rid} ${requester.uri}`, `background: ${backgroundColor}; color: #000`);
  if (CONFIG.params) {
    console.log(`${requester.rid} Params:`, requester.params);
  }
  try {
    CONFIG.curl &&
      console.log(
        `${requester.rid} ${fetchToCurl(requester.uri + searchParams, requester.requestOption as FetchOptions)}`
      );
  } catch (error) {
    //
  }
  if (response != null && CONFIG.response) {
    console.log(`${requester.rid} Response:`, response);
  }
  if (error != null && CONFIG.error) {
    if (error instanceof FulfilledRequestError || error instanceof RequestError) {
      console.log(`${requester.rid} Error:`, error.response?.status, error.message);
    } else {
      console.log(`${requester.rid} Error:`, error);
    }
  }
};
