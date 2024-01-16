/* eslint-disable no-console */
import React from 'react';
import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useMemo, useRef } from 'react';
import { IProps } from './LinkSocial.type';
import GoogleIcon from 'assets/icon/GoogleIcon.svg';
import FBIcon from 'assets/icon/FB.svg';
import AppleIcon from 'assets/icon/appleid.svg';
import { scaleSize } from 'styles';
import { AccessToken, LoginManager, Settings } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import config from 'config';
import { Platform } from 'react-native';
import { isNotNilOrEmpty } from 'ramda-adjunct';
import appleAuth from '@invertase/react-native-apple-authentication';
import { IS_IOS, SOCIAL_LINK } from 'constants/main';
import { useDispatch } from 'react-redux';

const initializeState = {
  showModalRequestPassword: false,
};

const useLinkSocialLogic = (props: IProps) => {
  const dispatch = useDispatch();

  const propsRef = useRef({
    ...props,
    ...initializeState,
  });

  propsRef.current = { ...propsRef.current, ...props };
  const [state] = useMergingState(initializeState, propsRef);

  const handlers = useHandlers({
    onLinkFaceBook: async () => {
      try {
        Settings.initializeSDK();
        LoginManager.logOut();
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        if (result.isCancelled) {
          // isCancelled
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const { accessToken } = data || { accessToken: '' };
            dispatch(
              props.linkSocial({
                params: {
                  socialType: SOCIAL_LINK.FACEBOOK,
                  socialToken: accessToken,
                  secCode: 'paave',
                },
                callback: () => {},
              })
            );
          });
        }
      } catch (error) {
        console.log('Link Facebook error', error);
      }
    },
    onLinkGoogle: async () => {
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
          const { accessToken } = await GoogleSignin.getTokens();

          dispatch(
            props.linkSocial({
              params: {
                socialType: SOCIAL_LINK.GOOGLE,
                socialToken: accessToken,
                secCode: 'paave',
              },
              callback: () => {},
            })
          );

          await GoogleSignin.signOut();
          await GoogleSignin.clearCachedAccessToken(accessToken);

          await GoogleSignin.revokeAccess();
        }
      } catch (error) {
        //TODO: handle error login with google
        console.log('Link Goole error', error);
      }
    },
    onLinkAppleID: async () => {
      if (Platform.OS === 'ios') {
        try {
          // Start the sign-in request
          const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
          });

          // Ensure Apple returned a user identityToken
          if (!appleAuthRequestResponse.identityToken) {
            throw new Error('Apple Sign-In failed - no identify token returned');
          } else {
            dispatch(
              props.linkSocial({
                params: {
                  socialType: SOCIAL_LINK.APPLE_ID,
                  socialToken: appleAuthRequestResponse.authorizationCode!,
                  secCode: 'paave',
                },
                callback: () => {},
              })
            );
          }
        } catch (err) {
          console.log('Link Apple error', err);
        }
      }
    },
    onUnlinkSocial: (socialType: SOCIAL_LINK) => {
      dispatch(
        props.unlinkSocial({
          params: {
            socialType,
          },
        })
      );
    },
  });

  const socialList = useMemo(() => {
    const list = [
      {
        name: 'Google',
        socialType: SOCIAL_LINK.GOOGLE,
        icon: <GoogleIcon height={scaleSize(24)} width={scaleSize(24)} />,
        onLink: handlers.onLinkGoogle,
        onUnlink: handlers.onUnlinkSocial,
      },
      {
        name: 'Facebook',
        socialType: SOCIAL_LINK.FACEBOOK,
        icon: <FBIcon height={scaleSize(24)} width={scaleSize(24)} />,
        onLink: handlers.onLinkFaceBook,
        onUnlink: handlers.onUnlinkSocial,
      },
    ];
    if (IS_IOS) {
      list.push({
        name: 'AppleID',
        socialType: SOCIAL_LINK.APPLE_ID,
        icon: <AppleIcon height={scaleSize(24)} width={scaleSize(24)} />,
        onLink: handlers.onLinkAppleID,
        onUnlink: handlers.onUnlinkSocial,
      });
    }
    return list;
  }, []);

  return {
    state,
    handlers,
    socialList,
  };
};

export { useLinkSocialLogic };
