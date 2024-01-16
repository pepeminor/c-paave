import withMemo from 'HOC/withMemo';
import React, { useCallback } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import config from 'config';
import { scaleSize } from 'styles';
import useStyles from '../styles';
import AppleIcon from 'assets/icon/appleid.svg';
import { AuthenticationActions, ILoginParams } from 'reduxs';
import { getUniqueIdSync } from 'react-native-device-info';
import { CHANNEL } from 'constants/enum';
import { useDispatch } from 'react-redux';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import { IResponse } from 'interfaces/common';
import { ILoginResponse } from 'interfaces/authentication';
import { PayloadAction } from '@reduxjs/toolkit';
import { ERROR } from 'constants/error';
import { alertMessage } from 'utils';
import { t } from 'i18next';
import { sendLogEventAppFlyers } from 'utils/appFlyers';
import { SelectKisSessionTimeout } from 'reduxs/global-reducers/KisSessionTimeout';
import { store } from 'screens/App';
interface IProps {
  setLoading: (loading: boolean) => void;
  isSignIn?: boolean;
  onShowModalUserExist?: (data: {
    responseData: IResponse<ILoginResponse>;
    action: PayloadAction<ILoginParams>;
  }) => void;
}

const AppleAuthentication = (props: IProps) => {
  const { setLoading, isSignIn = true, onShowModalUserExist } = props;
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const onAppleButtonPress = useCallback(async () => {
    if (Platform.OS === 'ios') {
      try {
        // Start the sign-in request
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
          setLoading(false);
          throw new Error('Apple Sign-In failed - no identify token returned');
        } else {
          const params: ILoginParams = {
            accessToken: appleAuthRequestResponse.authorizationCode!,
            fullName: `${appleAuthRequestResponse.fullName?.givenName ?? ''}${
              appleAuthRequestResponse.fullName?.familyName ?? ''
            }`,
            isSignIn,
            rememberMe: true,
            data: {
              grant_type: 'social_login',
              login_social_type: 'APPLE',
              login_social_token: appleAuthRequestResponse.authorizationCode!,
              sec_code: 'paave',
              client_id: config.authentication.clientId,
              client_secret: config.authentication.clientSecret,
              device_id: getUniqueIdSync(),
              platform: Platform.OS === 'ios' ? CHANNEL.MTS_PAAVE_IOS : CHANNEL.MTS_PAAVE_ANDROID,
              appVersion: config.appVersion,
              rememberMe: true,
              session_time_in_minute: SelectKisSessionTimeout(store.getState()),
            },
            callback: ({ error, data, callbackData }) => {
              if (error) {
                if (error === ERROR.USER_EXIST) {
                  onShowModalUserExist?.(callbackData!);
                  setLoading(false);

                  return;
                }
                track(AMPLITUDE_EVENT.LOGIN_SOCIAL_FAIL, {
                  social_type: 'APPLE',
                });
                return;
              }
              track(AMPLITUDE_EVENT.LOGIN_SOCIAL_SUCCESS, {
                username: data,
                social_type: 'APPLE',
              });
              sendLogEventAppFlyers('af_login_social_apple');

              setLoading(false);
            },
          };
          setLoading(true);
          dispatch(AuthenticationActions.loginSocialRequest(params));
        }
      } catch (err) {
        alertMessage('danger', t('error_login_social'));
        setLoading(false);
      }
    }
  }, []);

  return (
    <TouchableOpacity style={styles.buttonSocial} onPress={onAppleButtonPress}>
      <AppleIcon height={scaleSize(24)} width={scaleSize(24)} />
    </TouchableOpacity>
  );
};

export default withMemo(AppleAuthentication);
