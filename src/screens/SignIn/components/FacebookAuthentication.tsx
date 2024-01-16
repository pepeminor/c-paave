import withMemo from 'HOC/withMemo';
import React, { useCallback } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import config from 'config';
import { scaleSize } from 'styles';
import useStyles from '../styles';
import { AuthenticationActions, ILoginParams } from 'reduxs';
import { getUniqueIdSync } from 'react-native-device-info';
import { CHANNEL } from 'constants/enum';
import { useDispatch } from 'react-redux';
import FBIcon from 'assets/icon/FB.svg';
import { LoginManager, AccessToken, Settings, Profile } from 'react-native-fbsdk-next';
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

const FacebookAuthentication = (props: IProps) => {
  const { setLoading, isSignIn = true, onShowModalUserExist } = props;
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const onLoginFacebook = useCallback(async () => {
    try {
      Settings.initializeSDK();
      LoginManager.logOut();
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        // isCancelled
      } else {
        const currentProfile = await Profile.getCurrentProfile();

        AccessToken.getCurrentAccessToken().then(data => {
          const { accessToken, userID } = data || { accessToken: '', userID: '' };
          const params: ILoginParams = {
            isSignIn,
            rememberMe: true,
            data: {
              grant_type: 'social_login',
              login_social_type: 'FACEBOOK',
              login_social_token: accessToken,
              sec_code: 'paave',
              device_id: getUniqueIdSync(),
              username: userID.slice(0, 12),
              platform: Platform.OS === 'ios' ? CHANNEL.MTS_PAAVE_IOS : CHANNEL.MTS_PAAVE_ANDROID,
              appVersion: config.appVersion,
              rememberMe: true,
              client_id: config.authentication.clientId,
              client_secret: config.authentication.clientSecret,
              session_time_in_minute: SelectKisSessionTimeout(store.getState()),
            },
            accessToken,
            fullName: currentProfile?.name ?? '',
            callback: ({ error, data, callbackData }) => {
              if (error) {
                if (error === ERROR.USER_EXIST) {
                  onShowModalUserExist?.(callbackData!);
                  setLoading(false);

                  return;
                }
                track(AMPLITUDE_EVENT.LOGIN_SOCIAL_FAIL, {
                  social_type: 'FACEBOOK',
                });
                return;
              }
              track(AMPLITUDE_EVENT.LOGIN_SOCIAL_SUCCESS, {
                username: data,
                social_type: 'FACEBOOK',
              });
              sendLogEventAppFlyers('af_login_social_facebook');

              setLoading(false);
            },
          };
          setLoading(true);
          dispatch(AuthenticationActions.loginSocialRequest(params));
        });
      }
    } catch (error) {
      alertMessage('danger', t('error_login_social'));
      setLoading(false);
    }
  }, []);

  return (
    <TouchableOpacity style={styles.buttonSocial} onPress={onLoginFacebook}>
      <FBIcon height={scaleSize(24)} width={scaleSize(24)} />
    </TouchableOpacity>
  );
};

export default withMemo(FacebookAuthentication);
