import withMemo from 'HOC/withMemo';
import React, { useCallback } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import GoogleIcon from 'assets/icon/GoogleIcon.svg';
import config from 'config';
import { scaleSize } from 'styles';
import useStyles from '../styles';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { isNotNilOrEmpty } from 'ramda-adjunct';
import { AuthenticationActions, ILoginParams } from 'reduxs';
import { getUniqueIdSync } from 'react-native-device-info';
import { CHANNEL } from 'constants/enum';
import { useDispatch } from 'react-redux';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import { ERROR } from 'constants/error';
import { IResponse } from 'interfaces/common';
import { ILoginResponse } from 'interfaces/authentication';
import { PayloadAction } from '@reduxjs/toolkit';
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

const GoogleAuthentication = (props: IProps) => {
  const { setLoading, isSignIn = true, onShowModalUserExist } = props;
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const onLoginGoogle = useCallback(async () => {
    try {
      GoogleSignin.configure({
        offlineAccess: true,
        forceCodeForRefreshToken: true,
        webClientId: config.webClientId,
        iosClientId: Platform.OS === 'ios' ? config.iosClientId : config.webClientId,
      });

      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();

      if (isNotNilOrEmpty(userInfo)) {
        const params: ILoginParams = {
          isSignIn,
          accessToken: userInfo.idToken || '',
          rememberMe: true,
          data: {
            grant_type: 'social_login',
            login_social_type: 'GOOGLE',
            login_social_token: `idToken:${userInfo.idToken}`,
            sec_code: 'paave',
            client_id: config.authentication.clientId,
            client_secret: config.authentication.clientSecret,
            device_id: getUniqueIdSync(),
            platform: Platform.OS === 'ios' ? CHANNEL.MTS_PAAVE_IOS : CHANNEL.MTS_PAAVE_ANDROID,
            appVersion: config.appVersion,
            rememberMe: true,
            session_time_in_minute: SelectKisSessionTimeout(store.getState()),
          },
          fullName: userInfo.user.name ?? '',
          callback: ({ error, data, callbackData }) => {
            if (error) {
              if (error === ERROR.USER_EXIST) {
                onShowModalUserExist?.(callbackData!);
                setLoading(false);

                return;
              }
              track(AMPLITUDE_EVENT.LOGIN_SOCIAL_FAIL, {
                social_type: 'GOOGLE',
              });
              return;
            }
            track(AMPLITUDE_EVENT.LOGIN_SOCIAL_SUCCESS, {
              username: data,
              social_type: 'GOOGLE',
            });
            sendLogEventAppFlyers('af_login_social_google');

            setLoading(false);
          },
        };
        setLoading(true);
        dispatch(AuthenticationActions.loginSocialRequest(params));
        await GoogleSignin.revokeAccess();

        await GoogleSignin.signOut();
      }
    } catch (error) {
      //TODO: handle error login with google
      alertMessage('danger', t('error_login_social'));
      setLoading(false);
    }
  }, []);

  return (
    <TouchableOpacity style={styles.buttonSocial} onPress={onLoginGoogle}>
      <GoogleIcon height={scaleSize(24)} width={scaleSize(24)} />
    </TouchableOpacity>
  );
};

export default withMemo(GoogleAuthentication);
