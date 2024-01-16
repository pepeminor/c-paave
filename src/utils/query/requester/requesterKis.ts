/* eslint-disable no-console */
import { IAPI, IParams } from 'interfaces/common';
import { Requester } from './requester';
import { CommonError } from '../helpers';
import { IAuthTokenResponse, IRefreshAuthTokenParams } from 'interfaces/authentication';
import { setKisAuthToken } from 'reduxs/global-actions';
import { RealAccountSec } from 'screens/AccountTrading';
import config from 'config';
import { getKisClientData } from 'utils/socketApisKis';
import APIList from 'config/api';
import { alertMessage } from 'utils/common';
import { SpecialErrorCode } from 'constants/enum';
import { ERROR_TYPE } from 'reduxs/sagas/Authentication/KisVerifyAndSaveOTP';
import { IAuthTokenReducer } from 'interfaces/reducers/IAuthTokenReducer';
import { logOutAction } from 'screens/UserInfo/AlreadyLogin/actions';
import { store } from 'screens/App';

export class RequesterKis<R, P = IParams> extends Requester<R, P> {
  constructor(apiConfig: IAPI, params?: P, customBaseURI?: string) {
    super(apiConfig, params, customBaseURI);
    this.handleSpecialError = (
      response: Response,
      bodyJson: any,
      authToken: IAuthTokenReducer,
      isDemoAccount: boolean
    ) => {
      if (response.status === 400) {
        if (
          bodyJson.code === CommonError.SESSION_EXPIRED ||
          bodyJson.code === CommonError.OBJECT_NOT_FOUND ||
          bodyJson.code === CommonError.OPJECT_NOT_FOUND
        ) {
          store.dispatch(
            logOutAction({
              isDemoAccount,
              version: authToken.version || 0,
              refreshToken: authToken.refreshToken,
            })
          );
        } else if (
          !bodyJson.code.match(SpecialErrorCode.SERVICE_UNAVAILABLE) &&
          !bodyJson.code.match(SpecialErrorCode.NODATA) &&
          !bodyJson.code.match(ERROR_TYPE.VERIFY_MATRIX_ID_FAIL) &&
          !bodyJson.code.match(ERROR_TYPE.MATRIX_ID_IS_USED) &&
          !bodyJson.code.match(ERROR_TYPE.NO_MATRIX_CARD_ID_FOUND) &&
          !bodyJson.code.match(CommonError.URI_NOT_FOUND) &&
          !bodyJson.code.includes('prohibit cash withdraw status')
        ) {
          alertMessage('danger', `${bodyJson.code}`, bodyJson.message, this.rid);
        }
      }
    };
  }

  protected addAuthorizationHeader(accessToken: string): void {
    if (this.apiConfig.isKisForward) {
      this.headers.authorization = `jwt ${store.getState().kisAuthToken.accessToken}`;
      this.headers.secToken = store.getState().authToken.accessToken;
    }
    if (this.apiConfig.authenticated) {
      this.headers.authorization = `jwt ${accessToken}`;
    }
  }

  protected addOtherHeader(): void {
    if (this.apiConfig.withOtpToken) {
      const otpToken = store.getState().kisOTPToken;
      if (!otpToken) {
        throw this.throwWithCode(CommonError.OTP_TOKEN_IS_REQUIRED);
      }
      this.headers.otpToken = otpToken;
    }
  }

  protected getAccessToken(): string {
    return store.getState().kisAuthToken.accessToken;
  }

  protected async refreshToken(): Promise<IAuthTokenResponse> {
    const refreshToken = store.getState().kisAuthToken.refreshToken;
    const expiredRefreshToken = store.getState().kisAuthToken.refExpiredTime;
    this.checkTokenValid(refreshToken);

    if (new Date(expiredRefreshToken) >= new Date()) {
      // REFRESH ACCESS TOKEN WHEN TOKEN IS EXPIRED
      const kisClientData = await getKisClientData();
      const refreshTokenParams: IRefreshAuthTokenParams = {
        grant_type: config.authentication.grantType,
        client_id: kisClientData.clientId,
        client_secret: kisClientData.clientSecret,
        refresh_token: refreshToken,
      };
      const result: Response = await new RequesterKis(APIList.refreshToken, refreshTokenParams)
        .addHeaders()
        .addPathParams()
        .addQueryParams()
        .addBody()
        .rawFetch();

      if (result.ok) {
        const newToken: IAuthTokenResponse = (await result.json()) as IAuthTokenResponse;
        store.dispatch(setKisAuthToken(newToken));
        this.addAuthorizationHeader(newToken.accessToken);
        return newToken;
      } else {
        if (__DEV__) {
          console.log('fail to refresh token', result.status, await result.text());
        }
        throw this.throwWithCode(CommonError.TOKEN_ERROR);
      }
    } else {
      throw this.throwWithCode(CommonError.TOKEN_ERROR);
    }
  }

  protected getURI(apiConfig: IAPI, customBaseURI?: string) {
    if (customBaseURI) {
      return customBaseURI;
    }
    if (apiConfig.useFullUri != null) {
      return '';
    }
    if (apiConfig.isKisForward != null) {
      return config.apiUrl.baseURIKisForward;
    }
    return `${config[RealAccountSec.KIS].baseURI}/api/v1`;
  }
}
