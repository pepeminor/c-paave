import { SCClientSocket } from 'socketcluster-client';
import { IConfig } from 'config';
import { IAccount, IClientData } from 'interfaces/common';
import { WS } from './enum';
import { ACCOUNT_TYPE, BIOMETRIC_TYPE } from 'global';
import { RealAccountSec } from 'screens/AccountTrading';
import { Platform } from 'react-native';

export const Global: {
  sockets: Record<WS | RealAccountSec, SCClientSocket | undefined>;
  config?: IConfig;
  biometricType?: BIOMETRIC_TYPE;
  sourceIp: string | undefined;
  paaveDefaultAccount: IAccount;
  kisClientData?: IClientData;
  urlGoToAfterLogin?: string;
} = {
  sockets: {
    [WS.PRICE_BOARD]: undefined,
    [WS.WTS]: undefined,
    [WS.TTL]: undefined,
    [WS.MOBILE_SERVER]: undefined,
    [RealAccountSec.KIS]: undefined,
    // [RealAccountSec.MAS]: undefined,
    // [RealAccountSec.KBSV]: undefined,
    // [RealAccountSec.VCSC]: undefined,
    // [RealAccountSec.JBSV]: undefined,
    // [RealAccountSec.NHSV]: undefined,
  },
  biometricType: undefined,
  sourceIp: undefined,
  paaveDefaultAccount: {
    username: 'Virtual Account',
    type: ACCOUNT_TYPE.VIRTUAL,
  },
  urlGoToAfterLogin: undefined,
};

export const TIME_FORMAT_INPUT = 'HHmmss';
export const DATE_FORMAT_INPUT = 'yyyyMMdd';
export const DATE_FORMAT_INPUT_MOMENT = 'yyyyMMDD';
export const DATE_TIME_FORMAT_INPUT = DATE_FORMAT_INPUT + TIME_FORMAT_INPUT;
export const TIME_FORMAT_DISPLAY = 'HH:mm:ss';
export const DATE_FORMAT_DISPLAY = 'dd/MM/yyyy';
export const DATE_FORMAT_DISPLAY_MOMENT = 'DD/MM/yyyy';
export const PASSWORD_LENGTH = 6;

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export enum SOCIAL_LINK {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  APPLE_ID = 'APPLE',
}
