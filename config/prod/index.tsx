import * as scCodecMinBin from 'sc-codec-min-bin';
import { RealAccountSec } from 'screens/AccountTrading';
import { SCClientSocket } from 'socketcluster-client';
export interface IConfig {
  readonly versionApp: {
    readonly versionUrl: string;
    readonly domain: string;
    readonly updateDate: string;
  };
  readonly appStoreLink: string;
  readonly playStoreLink: string;
  readonly regex: {
    readonly phoneNumber: RegExp;
    readonly idCard: RegExp;
    readonly bankAccount: RegExp;
    readonly referrerIdName: RegExp;
    readonly email: RegExp;
    readonly username: RegExp;
    readonly passWord: RegExp;
    readonly passWordForKis: RegExp;
    readonly fullname: RegExp;
    readonly address: RegExp;
  };
  readonly apiUrl: {
    readonly domainURI: string;
    readonly baseURI: string;
    readonly baseURI_V2: string;
    readonly baseURIKisForward: string;
    readonly domain: {
      readonly clientId?: string;
      readonly clientSecret?: string;
      readonly socketCluster?: SCClientSocket.ClientOptions;
    };
    readonly domainSocial: string;
    readonly domainSocialV2: string;
  };
  readonly [RealAccountSec.KIS]: {
    readonly baseURI: string;
    readonly domain: {
      readonly clientId?: string;
      readonly clientSecret?: string;
      readonly socketCluster?: SCClientSocket.ClientOptions;
    };
  };
  // readonly [RealAccountSec.NHSV]: {
  //   readonly domain: {
  //     readonly clientId?: string;
  //     readonly clientSecret?: string;
  //     readonly socketCluster?: SCClientSocket.ClientOptions;
  //   };
  // };
  // readonly [RealAccountSec.JBSV]: {
  //   readonly domain: {
  //     readonly clientId?: string;
  //     readonly clientSecret?: string;
  //     readonly socketCluster?: SCClientSocket.ClientOptions;
  //   };
  // };
  // readonly [RealAccountSec.MAS]: {
  //   readonly domain: {
  //     readonly clientId?: string;
  //     readonly clientSecret?: string;
  //     readonly socketCluster?: SCClientSocket.ClientOptions;
  //   };
  // };
  // readonly [RealAccountSec.VCSC]: {
  //   readonly domain: {
  //     readonly clientId?: string;
  //     readonly clientSecret?: string;
  //     readonly socketCluster?: SCClientSocket.ClientOptions;
  //   };
  // };
  // readonly [RealAccountSec.KBSV]: {
  //   readonly domain: {
  //     readonly clientId?: string;
  //     readonly clientSecret?: string;
  //     readonly socketCluster?: SCClientSocket.ClientOptions;
  //   };
  // };
  readonly market: {
    readonly symbolUrl: string;
    readonly marketUrl: string;
  };
  readonly AIRatingUrl: string;
  readonly oneSignalId: string;
  readonly amplitudeKey: string;
  readonly bidOfferMinimumElement: number;
  readonly watchlistNameFullLength: number;
  readonly ratioScreen: number;
  readonly authentication: {
    readonly clientId: string;
    readonly clientSecret: string;
    readonly grantType: string;
  };
  readonly nonLoginAuthentication: {
    readonly clientId: string;
    readonly clientSecret: string;
    readonly grantType: string;
  };
  readonly tradingViewUrl?: string;
  readonly FullNameAccountInformation: number;
  readonly UsernameAccountInformation: number;
  readonly defaultCurrentSymbol: string;
  readonly defaultCurrentIndex: string;
  readonly maxNumberOfSymbol: number;
  readonly s3ResourceUrl: string;
  readonly countDownOTP: number;
  readonly maxCharOfUserIntro: number;
  readonly avatarColors: string[];
  readonly fee: number;
  readonly pageSize: number;
  readonly pageSizeKis: number;
  readonly watchListItemHeight: number;
  readonly kisOTPTokenExpireTime: number;
  readonly appsFlyerDevKey: string;
  readonly frbiosKey: string;
  readonly frbAndroidKey: string;
  readonly frbiosAppId: string;
  readonly frbAndroidAppId: string;
  readonly iosClientId: string;
  readonly webClientId: string;
  isOneSignalReady: boolean;
  isAnEmulator: boolean;
  uniqueId: string;
  macAddress: string;
  appVersion: string;
  appBuildNo: string;
  systemVersion: string;
  MAX_LENGTH_BEST_BID_ASK_EQT: number;
  MAX_LENGTH_BEST_BID_ASK_DER: number;
  readonly sentrySetting: {
    readonly sentryDSN: string;
    readonly tracesSampleRate: number;
    readonly debug: boolean;
    readonly environment: string;
  };
  readonly flashTextColorDuration: number;
  readonly debugFlag: {
    readonly socketStatus: boolean;
    readonly marketData: boolean;
    readonly socketData: boolean;
  };
  readonly rootTimezone: string;
  readonly widgetName: string;
}

const config: IConfig = {
  versionApp: {
    versionUrl: 'https://paave-mobile-resource.s3.ap-southeast-1.amazonaws.com/app-version.json',
    domain: 'paave',
    updateDate: 'update_date',
  },
  appStoreLink: 'https://apps.apple.com/app/paave/id6443872980',
  playStoreLink: 'https://play.google.com/store/apps/details?id=com.difisoft.paave',
  regex: {
    phoneNumber: /^\d*$/,
    idCard: /^\d+$/,
    bankAccount: /^[0-9A-Za-z]*$/,
    referrerIdName: /^[0-9A-Za-z.]*$/,
    email:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    username: /^(?=.{1,20}$)(?![.])[a-z0-9.]*[a-z0-9]+$/,
    passWord: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/,
    passWordForKis: /^(?=.*?[A-Z])(?!.*\s).{8,}$/,
    fullname:
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĐĨŨƠàáâãèéêìíòóôõùúđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỂưăạảấầẩẫậắằẳẵặẹẻẽềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/,
    address:
      /^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĐĨŨƠàáâãèéêìíòóôõùúđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỂưăạảấầẩẫậắằẳẵặẹẻẽềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ,-/]*$/,
  },
  apiUrl: {
    domainURI: 'https://api.paave.io/',
    baseURI: 'https://api.paave.io/rest/api/v1',
    baseURI_V2: 'https://api.paave.io/rest/api/v2',
    baseURIKisForward: 'https://api.paave.io/rest/kis-forward/api/v1',
    domain: {
      socketCluster: {
        codecEngine: scCodecMinBin,
        hostname: 'api.paave.io',
        port: 443,
        path: '/ws/socketcluster/',
        secure: true,
        autoReconnect: true,
      },
    },
    domainSocial: 'https://api.social.paave.io/api/v1',
    domainSocialV2: 'https://api.social.paave.io/api/v2',
  },
  [RealAccountSec.KIS]: {
    baseURI: 'https://trading.kisvn.vn/rest',
    domain: {
      socketCluster: {
        hostname: 'trading.kisvn.vn',
        port: 443,
        path: '/ws/socketcluster/',
        codecEngine: scCodecMinBin,
        secure: true,
      },
    },
  },
  // [RealAccountSec.NHSV]: { domain: {} },
  // [RealAccountSec.JBSV]: { domain: {} },
  // [RealAccountSec.MAS]: { domain: {} },
  // [RealAccountSec.VCSC]: { domain: {} },
  // [RealAccountSec.KBSV]: { domain: {} },
  market: {
    symbolUrl: 'https://paave-mobile-resource.s3.ap-southeast-1.amazonaws.com/market_data/symbol_static.gzip',
    marketUrl: 'https://api.paave.io/rest/api/v2/market',
  },
  AIRatingUrl: 'https://vinance.vn',
  oneSignalId: '8fa5d9f0-7b26-457c-96da-957bca5b02d0',
  amplitudeKey: 'fc1ab1a9f7476e330491b1dc29e80976',
  bidOfferMinimumElement: 3,
  watchlistNameFullLength: 24,
  ratioScreen: 375 / 812,
  authentication: {
    grantType: 'password',
    clientId: 'paave',
    clientSecret: '123paave',
  },
  nonLoginAuthentication: {
    grantType: 'client_credentials',
    clientId: 'paave-non-login',
    clientSecret: 'x6SMP92w6642ad18rrX9DLBH',
  },
  tradingViewUrl: 'https://api.paave.io/tradingview/index.html',
  FullNameAccountInformation: 50,
  UsernameAccountInformation: 20,
  defaultCurrentSymbol: 'AAA', // cần sửa không Nhân???
  defaultCurrentIndex: 'VN30',
  maxNumberOfSymbol: 500,
  countDownOTP: 30,
  s3ResourceUrl: 'https://paave-mobile-resource.s3.ap-southeast-1.amazonaws.com',
  maxCharOfUserIntro: 300,
  avatarColors: ['#29A69C', '#778DA9', '#D69F7E', '#9282ED', '#F6A100', '#219EBC'],
  fee: 1.002, // Fee 0,2 percent,
  pageSize: 15,
  pageSizeKis: 20,
  watchListItemHeight: 54,
  kisOTPTokenExpireTime: 28800,
  appsFlyerDevKey: 'SUS4WVYw2aSsZ89eQQrHpk',
  frbiosKey: 'AIzaSyCUkDn_NOWs0aVPtGoh0wb5Um37lcuTWF0',
  frbAndroidKey: 'AIzaSyBfYFZoCzlx9-_Imwb-v6_ppY6_zh7Pao4',
  frbiosAppId: '1:844649573794:ios:6ba3797cb1acfa6c2556fb',
  frbAndroidAppId: '1:844649573794:android:3f8a2e323092e7602556fb',
  iosClientId: '844649573794-jn892k5l30s3hkq2s6i2v85s6aqo08rs.apps.googleusercontent.com',
  webClientId: '844649573794-n22p8997k5e4mgt7q205al0srrvtp08s.apps.googleusercontent.com',
  isOneSignalReady: false,
  isAnEmulator: true,
  uniqueId: '',
  macAddress: '',
  appVersion: '',
  appBuildNo: '',
  systemVersion: '',
  MAX_LENGTH_BEST_BID_ASK_EQT: 3,
  MAX_LENGTH_BEST_BID_ASK_DER: 5,
  sentrySetting: {
    sentryDSN: 'https://0a4f263b53a442819d73d2c8913f3c36@o4504394122330112.ingest.sentry.io/4504399436513280',
    tracesSampleRate: 0.5,
    debug: __DEV__,
    environment: __DEV__ ? 'dev' : 'production',
  },
  flashTextColorDuration: 300,
  debugFlag: {
    socketStatus: false,
    marketData: false,
    socketData: false,
  },
  rootTimezone: 'Asia/Ho_Chi_Minh',
  widgetName: 'stockInfoTVWidgetName',
};

export default config;
