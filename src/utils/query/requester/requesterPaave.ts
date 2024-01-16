/* eslint-disable no-console */
import { IAPI, IParams } from 'interfaces/common';
import { CommonError, headersAIRating } from '../helpers';
import config from 'config';
import { IAuthTokenResponse, IRefreshAuthTokenParams } from 'interfaces/authentication';
import { setAuthToken, showRestartSubDisableModal } from 'reduxs/global-actions';
import { Requester } from './requester';
import APIList from 'config/api';
import { alertMessage } from 'utils/common';
import i18next from 'i18next';
import { IAuthTokenReducer } from 'interfaces/reducers/IAuthTokenReducer';
import { logOutAction } from 'screens/UserInfo/AlreadyLogin/actions';
import { store } from 'screens/App';

export class RequesterPaave<R, P = IParams> extends Requester<R, P> {
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
          bodyJson.code === CommonError.OPJECT_NOT_FOUND ||
          bodyJson.code === CommonError.TOKEN_EXPIRED
        ) {
          store.dispatch(
            logOutAction({
              isDemoAccount,
              version: authToken.version || 0,
              refreshToken: authToken.refreshToken,
            })
          );
        } else if (
          bodyJson.code === CommonError.SUB_ACCOUNT_IS_DISABLED ||
          bodyJson.code === CommonError.CANNOT_PLACE_ORDER_WITH_DISABLED_SUBACCOUNT
        ) {
          store.dispatch(showRestartSubDisableModal());
        } else if (bodyJson.code === CommonError.BIOMETRIC_ACTIVE_ON_ANOTHER_DEVICE) {
          alertMessage('danger', i18next.t('LOGIN_BIOMETRIC_FAIL'), i18next.t('BIOMETRIC_ACTIVE_ON_ANOTHER_DEVICE'));
        } else if (
          !(this.uri.includes('equity/account/sellable') && bodyJson.code === CommonError.INVALID_OWNERSHIP_STOCK)
        ) {
          if (this.apiConfig.notShowAlert !== true) {
            if (
              this.apiConfig.notShowAlertWithCodes == null ||
              (bodyJson.code != null && !this.apiConfig.notShowAlertWithCodes.includes(bodyJson.code))
            ) {
              alertMessage('danger', `${bodyJson.code}`, bodyJson.message, this.rid);
            }
          }
        }
      }
    };
  }

  protected getAccessToken(): string | undefined | null {
    return store.getState().authToken.accessToken;
  }

  protected addAuthorizationHeader(accessToken: string): void {
    if (this.uri === `${config.AIRatingUrl}/getInOut` || this.uri === `${config.AIRatingUrl}/find`) {
      this.headers = headersAIRating as unknown as Record<string, string>;
    } else {
      if (this.apiConfig.authenticated) {
        this.headers.authorization = `jwt ${accessToken}`;
      }
    }
  }

  protected addOtherHeader(): void {}

  protected async refreshToken(): Promise<IAuthTokenResponse> {
    const refreshToken = store.getState().authToken.refreshToken;
    const expiredRefreshToken = store.getState().authToken.refExpiredTime;

    this.checkTokenValid(refreshToken);

    if (new Date(expiredRefreshToken) >= new Date()) {
      // REFRESH ACCESS TOKEN WHEN TOKEN IS EXPIRED
      const refreshToken = store.getState().authToken.refreshToken;
      const refreshTokenParams: IRefreshAuthTokenParams = {
        grant_type: config.authentication.grantType,
        client_id: config.authentication.clientId,
        client_secret: config.authentication.clientSecret,
        refresh_token: refreshToken,
      };

      const result: Response = await new RequesterPaave(APIList.refreshToken, refreshTokenParams)
        .addHeaders()
        .addPathParams()
        .addQueryParams()
        .addBody()
        .rawFetch();

      if (result.ok) {
        const newToken: IAuthTokenResponse = (await result.json()) as IAuthTokenResponse;
        store.dispatch(setAuthToken(newToken));
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

  protected getURI(apiConfig: IAPI, customBaseURI?: string): string {
    if (customBaseURI) {
      return customBaseURI;
    }
    if (apiConfig.useFullUri != null) {
      return '';
    }
    return config.apiUrl.baseURI;
  }
}
