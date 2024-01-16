import appsFlyer from 'react-native-appsflyer';
import config from '../config';
import { isNilOrEmpty } from 'ramda-adjunct';

export const initAppFlyers = (dataLogEvent: { key: string; params?: any }) => {
  if (isNilOrEmpty(config.appsFlyerDevKey)) return;

  appsFlyer.initSdk(
    {
      devKey: config.appsFlyerDevKey,
      isDebug: false,
      appId: '6443872980', //appId from app store
      onInstallConversionDataListener: true, //Optional
      onDeepLinkListener: true, //Optional
      timeToWaitForATTUserAuthorization: 10, //for iOS 14.5
    },
    () => {
      appsFlyer.logEvent(dataLogEvent.key, dataLogEvent?.params);
    },
    () => {
      //To do error
    }
  );
};

export const sendLogEventAppFlyers = (key: string, params?: any) => {
  if (isNilOrEmpty(config.appsFlyerDevKey)) return;

  appsFlyer.logEvent(key, params).catch(() => {
    initAppFlyers({
      key,
      params,
    });
  });
};
