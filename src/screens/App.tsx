/* eslint-disable no-console */
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import TestFairy from 'react-native-testfairy';
import appsFlyer from 'react-native-appsflyer';
import { StatusBar, Platform } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import ReactNativeBiometrics from 'react-native-biometrics';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BIOMETRIC_TYPE } from '../global';
import RootNavigation from './RootNavigation';
import { Global } from '../constants/main';
import config from '../config';
import { BiometryEnum } from '../constants/enum';
import globalStyles from '../styles';
import { OneSignalUtils } from '../utils/onesignal';
import * as Sentry from '@sentry/react-native';
import codePush from 'react-native-code-push';
import { init, track } from '@amplitude/analytics-react-native';
import { IProps as ModalUpdateCodePushType } from 'components/ModalUpdateCodePush';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import { updateUsersSetting } from '../reduxs/global-actions/UserInfo';
import DeviceInfo from 'react-native-device-info';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import useConstructor from 'hooks/useConstructor';
import useAppStateChange from 'hooks/useAppStateChange';
import { onCloseExecuteModal } from 'screens/TradeScreen/components/TradeFormLayout/components/TradeForm/action';
import { initAppFlyers } from 'utils/appFlyers';
import createStore, { initI18n } from 'reduxs';
import { getLastTradingDate } from 'reduxs/global-actions/Market';
import SplashScreen from 'react-native-splash-screen';
import { refreshAuthToken } from 'reduxs/global-actions';

export const { store, persistor } = createStore();
// Construct a new instrumentation instance. This is needed to communicate between the integration and React
export const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();
export const rnBiometrics = new ReactNativeBiometrics();

const App = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const ModalUpdateCodePush = useRef<FunctionComponent<ModalUpdateCodePushType>>();

  const getConfigInfo = () => {
    config.isAnEmulator = DeviceInfo.isEmulatorSync();
    config.uniqueId = DeviceInfo.getUniqueIdSync();
    config.macAddress = DeviceInfo.getMacAddressSync();
    config.appVersion = DeviceInfo.getVersion();
    config.appBuildNo = DeviceInfo.getBuildNumber();
    config.systemVersion = DeviceInfo.getSystemVersion();
  };

  const initThirdPartySoftware = async () => {
    // TestFairy
    TestFairy.begin('SDK-zDEdKxmE');
    TestFairy.disableFeedbackForm();

    if (!__DEV__) {
      // Sentry
      Sentry.init({
        dsn: config.sentrySetting.sentryDSN,
        tracesSampleRate: config.sentrySetting.tracesSampleRate,
        debug: config.sentrySetting.debug,
        environment: config.sentrySetting.environment,
        enableAutoSessionTracking: true,
        autoSessionTracking: true,
        sessionTrackingIntervalMillis: 5000, // default 30000 - end session in x seconds if the app goes to the background
        integrations: [
          new Sentry.ReactNativeTracing({
            // Pass instrumentation to be used as `routingInstrumentation`
            routingInstrumentation,
            // ...
          }),
        ],
      });
    }

    if (__DEV__) {
      console.log('Debug mode or Emulator: Skip AppsFlyer, Amplitude and Firebase');
    } else {
      console.log('Release mode and Real Device: Register AppsFlyer, Amplitude and Firebase');

      initAppFlyers({ key: 'af_opened_app' });

      // Amplitude
      if (config.amplitudeKey.length > 0) {
        init(config.amplitudeKey, undefined, {
          trackingOptions: {
            adid: true,
            carrier: true,
            deviceManufacturer: true,
            deviceModel: true,
            ipAddress: true,
            language: true,
            osName: true,
            osVersion: true,
            platform: true,
          },
        })
          .promise.catch(e => console.log('Amplitude init error', e))
          .then(() => {
            track(AMPLITUDE_EVENT.OPEN_APP);
            console.log('Amplitude init success');
          });
      }

      // Firebase
      if (firebase.apps.length === 0 && config.frbiosKey.length !== 0) {
        if (Platform.OS === 'ios') {
          firebase
            .initializeApp({
              apiKey: config.frbiosKey,
              projectId: 'paave-channel',
              appId: config.frbiosAppId,
              databaseURL: 'https://paave-channel-default-rtdb.firebaseio.com/',
              messagingSenderId: '844649573794',
              storageBucket: 'paave-channel.appspot.com',
            })
            .then(() => {
              messaging()
                .getAPNSToken()
                .then(token => token && appsFlyer.updateServerUninstallToken(token));
            });
        } else if (Platform.OS === 'android') {
          firebase
            .initializeApp({
              apiKey: config.frbAndroidKey,
              projectId: 'paave-channel',
              appId: config.frbAndroidAppId,
              databaseURL: 'https://paave-channel-default-rtdb.firebaseio.com/',
              messagingSenderId: '844649573794',
              storageBucket: 'paave-channel.appspot.com',
            })
            .then(() => {
              messaging()
                .getToken()
                .then(token => appsFlyer.updateServerUninstallToken(token));
            });
        }
      }
    }
  };

  useConstructor(() => {
    // Code for componentWillMount here
    // This code is called only one time before intial render
    // update for exist usersSetting
    store.dispatch(updateUsersSetting(null));

    getConfigInfo();
    initThirdPartySoftware();

    store.dispatch(initI18n());
    store.dispatch(getLastTradingDate());
    OneSignalUtils.registerOneSignal();
  });

  const checkCodePushUpdate = () => {
    return codePush.sync(
      {
        installMode: codePush.InstallMode.ON_NEXT_RESTART,
        mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESUME,
      },
      (syncStatus: number) => {
        if (syncStatus === codePush.SyncStatus.INSTALLING_UPDATE) {
          if (ModalUpdateCodePush) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            ModalUpdateCodePush.current = require('components/ModalUpdateCodePush/index.tsx').default;
          }
          setIsVisibleModal(true);
        }
      }
    );
  };

  useEffect(() => {
    setIsVisibleModal(false);
    ModalUpdateCodePush.current = undefined;
    checkCodePushUpdate();
  }, []);

  useAppStateChange((appState, nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      store.dispatch(onCloseExecuteModal({})); // close modal order confirm
      setIsVisibleModal(false);
      ModalUpdateCodePush.current = undefined;
      OneSignalUtils.registerOneSignal();
      const refreshToken = store.getState().authToken.refreshToken;
      refreshToken !== '' &&
        store.dispatch(
          refreshAuthToken({
            grant_type: config.authentication.grantType,
            client_id: config.authentication.clientId,
            client_secret: config.authentication.clientSecret,
            refresh_token: refreshToken,
          })
        );
    }
  });

  const getBiometricType = async () => {
    await rnBiometrics.isSensorAvailable().then(async resultObject => {
      const { available, biometryType } = resultObject;
      if (available && biometryType === BiometryEnum.TouchID) {
        Global.biometricType = BIOMETRIC_TYPE.TouchID;
      } else if (available && biometryType === BiometryEnum.FaceID) {
        Global.biometricType = BIOMETRIC_TYPE.FaceID;
      } else if (available && biometryType === BiometryEnum.Biometrics) {
        Global.biometricType = BIOMETRIC_TYPE.TouchID;
      } else {
        Global.biometricType = BIOMETRIC_TYPE.None;
      }
    });
  };

  useEffect(() => {
    SplashScreen.hide();

    getBiometricType();
  }, []);

  return (
    <GestureHandlerRootView style={globalStyles.container}>
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <PersistGate persistor={persistor} loading={null}>
          <RootNavigation />
          {ModalUpdateCodePush.current && <ModalUpdateCodePush.current isVisibleModal={isVisibleModal} />}
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

export default Sentry.wrap(codePush(codePushOptions)(App));
