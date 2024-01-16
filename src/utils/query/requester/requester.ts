/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { METHOD } from 'constants/method';
import { IAPI, IError, IParams, IResponse } from 'interfaces/common';
import { CommonError, FulfilledRequestError, RequestError } from '../helpers';
import { createRequestId, insertObjectIf } from 'utils/common';
import { CHANNEL } from 'constants/enum';
import { alertMessage } from 'utils/common';
import { IAuthTokenResponse } from 'interfaces/authentication';
import { IAuthTokenReducer } from 'interfaces/reducers/IAuthTokenReducer';
import { ACCOUNT_TYPE } from 'global';
import { logOutAction } from 'screens/UserInfo/AlreadyLogin/actions';
import { KIS_CLEAR_OTP_TOKEN } from 'screens/LoginRealAccount/reducers';
import { store } from 'screens/App';

export abstract class Requester<R, P = IParams> {
  apiConfig: IAPI;
  params?: any;
  method: string;
  uri: string;
  finalUri?: string;
  rid: string;
  headers: Record<string, string> = {};
  searchParams?: URLSearchParams;
  requestOption?: RequestInit;
  abortController?: AbortController;
  remainingRetry = 3;
  promise: Promise<IResponse<R>>;
  resolve?: (data: IResponse<R>) => void;
  reject?: (err: unknown) => void;
  handleSpecialError?: (
    response: Response,
    bodyJson: any,
    authToken: IAuthTokenReducer,
    isDemoAccount: boolean
  ) => void;
  refreshTokenPromise: Promise<IAuthTokenResponse> | null = null;
  lastExpiredSessionVersion: number | null = null;

  constructor(apiConfig: IAPI, params?: P, _customBaseURI?: string) {
    this.apiConfig = apiConfig;
    this.params = params;
    this.method = apiConfig.method == null ? METHOD.GET : apiConfig.method;
    this.uri = '';
    this.rid = createRequestId();
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    const accessToken = this.getAccessToken();
    this.checkTokenValid(accessToken);
    this.uri = this.getURI(apiConfig, _customBaseURI) + apiConfig.uri;
  }

  addPathParams() {
    if (this.params == null) {
      return this;
    }
    if (
      (this.method === METHOD.PUT ||
        this.method === METHOD.POST ||
        (this.method === METHOD.DELETE && this.apiConfig.useBodyOnDeleteMethod)) &&
      Array.isArray(this.params)
    ) {
      return this;
    }
    const urlParamsList = this.uri.match(/{(\w|\s)*}/g)?.map(param => param.replace(/{|}/g, ''));
    if (urlParamsList == null) {
      return this;
    }
    const newParams = { ...this.params };
    this.uri = urlParamsList.reduce((uri, param) => {
      delete newParams[param];
      return uri.replace(`{${param}}`, this.params![param]);
    }, this.uri);
    this.params = newParams;
    return this;
  }

  addQueryParams() {
    const searchParams = new URLSearchParams();
    if (this.method === METHOD.GET || (this.method === METHOD.DELETE && !this.apiConfig.useBodyOnDeleteMethod)) {
      if (this.params != null) {
        Object.entries(this.params).forEach(([param, value]) => {
          if (value != null) {
            if (Array.isArray(value)) {
              value.forEach(value => {
                searchParams.append(param, value);
              });
            } else {
              searchParams.set(param, value as string);
            }
          }
        });
      }
    }
    this.searchParams = searchParams;
    return this;
  }

  addHeaders() {
    const localeHeaders: Record<string, string> = {
      platform: CHANNEL.MTS_PAAVE,
      rid: this.rid,
      ...insertObjectIf(this.apiConfig.noCache, {
        CacheControl: 'max-age=0',
      }),
    };

    this.headers = localeHeaders;
    const accessToken = this.getAccessToken();
    this.checkTokenValid(accessToken);
    this.addAuthorizationHeader(accessToken!);
    this.addOtherHeader();
    return this;
  }

  addBody() {
    this.abortController = new AbortController();
    this.requestOption = {
      method: this.method.toUpperCase(),
      headers: this.headers,
      signal: this.abortController.signal,
    };

    if (
      this.method === METHOD.POST ||
      this.method === METHOD.PUT ||
      this.method === METHOD.PATCH ||
      (this.method === METHOD.DELETE && this.apiConfig.useBodyOnDeleteMethod)
    ) {
      if (this.apiConfig.useFormData) {
        if (this.params) {
          const body = new FormData();
          Object.entries(this.params).forEach(([param, value]) => {
            if (value != null) {
              body.append(param, value);
            }
          });
          this.requestOption.body = body;
        }
      } else {
        this.headers['Content-Type'] = 'application/json';
        if (this.params) {
          this.requestOption.body = JSON.stringify(this.params);
        }
      }
    }
    return this;
  }

  abort() {
    if (this.abortController) {
      this.abortController.abort();
    }
    this.reject != null && this.reject(this.throwWithCode(CommonError.REQUEST_ABORTED));
    this.reject = undefined;
    this.resolve = undefined;
  }

  execute(): Promise<IResponse<R>> {
    this.fetch()
      .then((data: R) => this.resolve != null && this.resolve({ data: data }))
      .catch(this.reject);
    return this.promise;
  }

  protected async rawFetch() {
    const searchParams =
      this.searchParams && this.searchParams.toString() !== '' ? `?${this.searchParams.toString()}` : '';
    this.finalUri = this.uri + searchParams;
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      this.abort();
      throw this.throwWithCode(CommonError.TIMEOUT);
    }, 20000);
    try {
      return fetch(this.finalUri, this.requestOption);
    } finally {
      if (timeoutId != null) clearTimeout(timeoutId);
    }
  }

  protected throwWithCode(error: string | IError, response?: Response): RequestError<R, P> {
    if (response != null) {
      if (typeof error === 'string') {
        const code = error as string;
        return new FulfilledRequestError(code, this, response, {
          code,
        });
      } else {
        const err = error as IError;
        return new FulfilledRequestError(err.code!, this, response, err);
      }
    } else {
      if (typeof error === 'string') {
        const code = error as string;
        return new RequestError(code, this);
      } else {
        const err = error as IError;
        return new RequestError(err.code!, this);
      }
    }
  }

  protected async fetch(): Promise<R> {
    // only need first layer. do just copy object with .... we need to copy in case the properties value is changed
    const authToken: IAuthTokenReducer = { ...store.getState().authToken };
    const isDemoAccount: boolean = store.getState().selectedAccount.type === ACCOUNT_TYPE.DEMO;
    this.checkTokenValid(authToken.refreshToken);
    if (this.resolve == null) {
      throw this.throwWithCode('ALREADY_ABORTED');
    }
    const result: Response = await this.rawFetch();
    if (this.resolve == null) {
      throw this.throwWithCode('ALREADY_ABORTED');
    }
    const responseBody = await result.text();
    // To log api, use Logger.ts instead
    // if (__DEV__) {
    //   console.log(result.status, responseBody, this.uri, {
    //     curl: fetchToCurl(this.finalUri!, this.requestOption as FetchOptions),
    //   });
    // }
    if (this.resolve == null) {
      throw this.throwWithCode('ALREADY_ABORTED');
    }
    if (!result.ok) {
      if (result.status === 401 || result.status === 403) {
        // token is expired or otp token is expired
        try {
          const responseBodyJson: IError = JSON.parse(responseBody);
          if (
            responseBodyJson.code === CommonError.OTP_TOKEN_IS_EXPIRED ||
            responseBodyJson.code === CommonError.OTP_TOKEN_IS_REQUIRED
          ) {
            store.dispatch({
              type: KIS_CLEAR_OTP_TOKEN,
            });
            alertMessage('danger', `Error code`, responseBodyJson.code, this.rid);
          }
          throw this.throwWithCode(responseBodyJson, result);
        } catch (e: unknown) {
          // cannot decode json. just ignore
        }
        // we will refresh token and re execute request
        const token: IAuthTokenResponse = await this.doCheckRefreshToken(authToken, isDemoAccount);
        if (this.resolve == null) {
          throw this.throwWithCode('ALREADY_ABORTED');
        }
        this.addAuthorizationHeader(token.accessToken);
        return this.fetch();
      }
      let data: any = null;
      try {
        data = JSON.parse(responseBody);
        if (this.apiConfig.notShowAlert !== true) {
          if (
            this.apiConfig.notShowAlertWithCodes == null ||
            !this.apiConfig.notShowAlertWithCodes.includes(data.code)
          ) {
            alertMessage('danger', data.code ? `${data.code}` : '', data.message || '', `${this.rid}`);
          }
        }
      } catch (e) {
        data = { code: 'RESPONSE_STATUS_' + result.statusText };
      }
      this.handleSpecialError != null && this.handleSpecialError(result, data, authToken, isDemoAccount);
      throw this.throwWithCode(data, result);
    }
    const response: R = JSON.parse(responseBody) as R;
    return response;
  }

  // only doing refresh token in one request.
  protected doCheckRefreshToken(authToken: IAuthTokenReducer, isDemoAccount: boolean): Promise<IAuthTokenResponse> {
    const refreshTokenVersion = authToken.version || 0;
    if (this.lastExpiredSessionVersion != null && this.lastExpiredSessionVersion >= refreshTokenVersion) {
      throw new Error(CommonError.SESSION_EXPIRED);
    }
    if (this.refreshTokenPromise == null) {
      this.refreshTokenPromise = this.refreshToken();
    }
    return this.refreshTokenPromise.catch(_ => {
      if (this.lastExpiredSessionVersion == null || this.lastExpiredSessionVersion < refreshTokenVersion) {
        this.lastExpiredSessionVersion = refreshTokenVersion;
      }
      store.dispatch(
        logOutAction({
          isDemoAccount,
          version: refreshTokenVersion,
          refreshToken: authToken.refreshToken,
        })
      );
      throw this.throwWithCode(CommonError.SESSION_EXPIRED);
    });
  }

  protected checkTokenValid(token?: string | null) {
    if (this.apiConfig.authenticated && (token == null || token === '')) {
      const authToken = { ...store.getState().authToken };
      const isDemoAccount: boolean = store.getState().selectedAccount.type === ACCOUNT_TYPE.DEMO;
      const refreshTokenVersion = authToken.version || 0;
      store.dispatch(
        logOutAction({
          isDemoAccount,
          version: refreshTokenVersion,
          refreshToken: authToken.refreshToken,
        })
      );
      throw this.throwWithCode(CommonError.LOGIN_REQUIRED);
    }
  }

  protected abstract addAuthorizationHeader(accessToken: string): void;

  protected abstract addOtherHeader(): void;

  protected abstract refreshToken(): Promise<IAuthTokenResponse>;

  protected abstract getAccessToken(): string | undefined | null;

  protected abstract getURI(apiConfig: IAPI, customBaseURI?: string): string;
}
