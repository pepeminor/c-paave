/* eslint-disable no-console */
import OneSignal from 'react-native-onesignal';
import config from 'config';
import { LANG } from 'global';
import { EventListener } from './EventListener';
import { useEffect } from 'react';
import { insertObjectIf } from './common';
import { isNotNil } from 'ramda-adjunct';
import { store } from 'screens/App';

// type OneSignalStatus = 'non-login' | 'signin-paave' | 'signin-partner' | 'signout';

function logOneSignalStatus(..._params: any) {
  // console.log(..._params);
}

async function registerOneSignal(): Promise<void> {
  if (!config.isAnEmulator) {
    await initOneSignal();
  } else config.isOneSignalReady = true;
}

async function initOneSignal() {
  logOneSignalStatus('OneSignal - This is real device');

  // OneSignal Init Code
  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId(config.oneSignalId);
  // END OneSignal Init Code

  // Prompt for push on iOS
  OneSignal.promptForPushNotificationsWithUserResponse(response => {
    logOneSignalStatus('OneSignal - Prompt response:', response);
  });

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    const notification = notificationReceivedEvent.getNotification();
    const data = notification.additionalData;
    if (data && 'smartOtp' in data && typeof data.smartOtp === 'string') {
      ReceiveOTPEventHandler.onReceiveOTP(data.smartOtp);
    }
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification);
  });

  try {
    logOneSignalStatus('Check Device State');
    const deviceState = await OneSignal.getDeviceState();
    // const { userId } = await OneSignal.getDeviceState()
    // logOneSignalStatus(userId)
    logOneSignalStatus(deviceState);
  } catch (e) {
    logOneSignalStatus(e);
  }

  // Method for handling notifications opened
  // OneSignal.setNotificationOpenedHandler(notification => {
  //   logOneSignalStatus('OneSignal - notification opened:', notification);
  // });

  // Tags info
  // 1) deviceType: mobile
  // 2) mobileOTP: true/false
  // 3) userid: paave user ID -> In the future, BE uses this tag to send notification for Paave users
  // 4) username: paave username -> BE uses this tag to send notification for Paave users. We will set ExternalID as username. ExternalID can have username, 'non-login' or empty.
  // 5) partner_kis: kis account number -> BE uses this tag to send KIS order matching and copy trading notification Mr Kim
  // 6) aiRating: AI Rating notification
  // 7) theme: AI Rating notification
  // 8) VNIndexReturns: AI Rating notification
  // 9) pinnedNews: AI Rating notification
  // Please consider to use setExternalUserId instead of userid or username

  // MAX 10 tags
  sendTags({
    // appVersion: config.appVersion,
    // deviceId: config.uniqueId,
    deviceType: 'mobile',
    aiRating: 'true',
    // status: 'installed',
    // status_time: new Date().toISOString(),
  });

  removeUnUsedTags();
  config.isOneSignalReady = true;
  logOneSignalStatus('OneSignal - OneSignal is ready');
}

const sendTags: typeof OneSignal.sendTags = tags => {
  // logOneSignalStatus('OneSignal - sendTags:', tags);
  OneSignal.sendTags(tags);
};

const removeUnUsedTags = () => {
  OneSignal.getTags(tags => {
    if (!tags) return;
    if ('appVersion' in tags) {
      OneSignal.deleteTag('appVersion');
    }
    if ('deviceId' in tags) {
      OneSignal.deleteTag('deviceId');
    }
    if ('status' in tags) {
      OneSignal.deleteTag('status');
    }
  });
};

async function waitForOneSignalReady() {
  // logOneSignalStatus('waitForOneSignalReady - Check onesignal is ready');
  while (!config.isOneSignalReady) {
    logOneSignalStatus('OneSignal - waitForOneSignalReady: Not yet ready');
    // Wait for a short time (e.g., 1 second) before checking again
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  // logOneSignalStatus('waitForOneSignalReady - OneSignal is ready');
}

async function updateTagMobileOTP(mobileOTP: boolean) {
  logOneSignalStatus('OneSignal - updateTagMobileOTP: ' + mobileOTP);
  await waitForOneSignalReady();
  if (config.isAnEmulator) return;
  sendTags({
    mobileOTP: mobileOTP ? 'true' : 'false',
  });
}

async function updateLanguage(lang?: LANG) {
  logOneSignalStatus('OneSignal - updateLanguage:', lang);
  await waitForOneSignalReady();
  if (config.isAnEmulator) return;
  const language = store.getState().currentUserSetting?.language;
  OneSignal.setLanguage((lang ?? language) === 'vi' ? 'vi' : 'en');
  logOneSignalStatus('OneSignal - updateLanguage was done:', language);
}

async function sendNonLoginTag() {
  logOneSignalStatus('OneSignal - sendNonLoginTag');
  await waitForOneSignalReady();
  if (config.isAnEmulator) return;
  updateLanguage();
  setExternalUserId('non-login');
  sendTags({
    aiRating: 'true',
  });
  logOneSignalStatus('OneSignal - sendNonLoginTag was done');
}

async function setExternalUserId(userId: string) {
  logOneSignalStatus('OneSignal - setExternalUserId:', userId);
  await waitForOneSignalReady();
  if (config.isAnEmulator) return;
  OneSignal.setExternalUserId(userId, results => {
    logOneSignalStatus('Results of setting external user id:', results);
  });
}

type SendLoginTagParams = {
  // status?: OneSignalStatus;
  userid?: string; // paave user ID
  username?: string; // paave username
  partner_kis?: string; // partner username
};

async function sendLoginTag(params: SendLoginTagParams) {
  logOneSignalStatus('OneSignal - sendLoginTag:', params);
  await waitForOneSignalReady();
  if (config.isAnEmulator) return;
  updateLanguage();
  params.username && setExternalUserId(params.username);
  const mobileOTP = store.getState().currentUserSetting?.mobileOTP;
  const isSms = store.getState().currentUserSetting?.isSms;
  logOneSignalStatus('OneSignal - sendLoginTag: sendTags');
  sendTags({
    mobileOTP: mobileOTP && !isSms ? 'true' : 'false',
    ...params,
  });
  logOneSignalStatus('OneSignal - sendLoginTag was done');
}

type SendNotificationTagParams = {
  aiRating?: boolean;
  theme?: boolean;
  vnindexReturns?: boolean;
  pinnedNews?: boolean;
};

async function sendNotificationTag(params: SendNotificationTagParams) {
  logOneSignalStatus('OneSignal - sendNotificationTag:', params);
  await waitForOneSignalReady();
  if (config.isAnEmulator) return;
  sendTags({
    ...insertObjectIf(isNotNil(params?.aiRating), { aiRating: params?.aiRating ? 'true' : 'false' }),
    ...insertObjectIf(isNotNil(params?.theme), { theme: params?.theme ? 'true' : 'false' }),
    ...insertObjectIf(isNotNil(params?.vnindexReturns), {
      vnindexReturns: params?.vnindexReturns ? 'true' : 'false',
    }),
    ...insertObjectIf(isNotNil(params?.pinnedNews), { pinnedNews: params?.pinnedNews ? 'true' : 'false' }),
  });
  logOneSignalStatus('OneSignal - sendNotificationTag was done:', params);
}

async function unSubscribeOneSignal() {
  logOneSignalStatus('OneSignal - unSubscribeOneSignal');
  await waitForOneSignalReady();
  if (config.isAnEmulator) return;
  sendTags({
    // Using OneSignal.deleteTags or send empty tag will cause bug "cannot set external user id" => Use a whitespace to clear the tag
    partner_kis: ' ',
  });
}

async function disablePush(value = true) {
  await waitForOneSignalReady();
  if (config.isAnEmulator) return;
  OneSignal.disablePush(value);
}

export const OneSignalUtils = {
  registerOneSignal,
  updateTagMobileOTP,
  sendNonLoginTag,
  updateLanguage,
  unSubscribeOneSignal,
  disablePush,
  sendLoginTag,
  sendNotificationTag,
};

const OneSignalEvent = new EventListener();

export const ReceiveOTPEventHandler = {
  onReceiveOTP: (value: string) => {
    OneSignalEvent.propogate('OneSignal/receiveOTP', value);
  },
  useSubscribeReceiveOTP: (callBack: (value: unknown) => void) => {
    useEffect(() => {
      const unSubs = OneSignalEvent.subscribe('OneSignal/receiveOTP', callBack);
      return unSubs;
    }, []);
  },
};
