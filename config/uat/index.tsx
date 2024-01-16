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

const uatConfig: Partial<IConfig> = {
  apiUrl: {
    domainURI: 'https://uat.paave.io/',
    baseURI: 'https://uat.paave.io/rest/api/v1',
    baseURI_V2: 'https://uat.paave.io/rest/api/v2',
    baseURIKisForward: 'https://uat.paave.io/rest/kis-forward/api/v1',
    domain: {
      socketCluster: {
        codecEngine: scCodecMinBin,
        hostname: 'uat.paave.io',
        port: 443,
        path: '/ws/socketcluster/',
        secure: true,
        autoReconnect: true,
      },
    },
    domainSocial: 'https://api.social-uat.paave.io/api/v1',
    domainSocialV2: 'https://api.social-uat.paave.io/api/v2',
  },
  [RealAccountSec.KIS]: {
    baseURI: 'https://beta.kisvn.vn:8443/rest',
    domain: {
      socketCluster: {
        hostname: 'beta.kisvn.vn',
        port: 8443,
        path: '/ws/socketcluster/',
        codecEngine: scCodecMinBin,
        secure: true,
      },
    },
  },
  nonLoginAuthentication: {
    grantType: 'client_credentials',
    clientId: 'paave-non-login',
    clientSecret: 'paave-non-login',
  },
  market: {
    symbolUrl: 'https://paave-mobile-resource-uat.s3.ap-southeast-1.amazonaws.com/market_data/symbol_static.gzip',
    marketUrl: 'https://uat.paave.io/rest/api/v2/market',
  },
  tradingViewUrl: 'https://uat.paave.io/tradingview/index.html',
  s3ResourceUrl: 'https://paave-mobile-resource-uat.s3.ap-southeast-1.amazonaws.com',
};

const config: IConfig = {
  versionApp: {
    versionUrl: 'https://paave-mobile-resource-uat.s3.ap-southeast-1.amazonaws.com/app-version.json',
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
  oneSignalId: '1e94b4e4-0ae0-4a0e-9fc8-f3597eb830ec',
  amplitudeKey: '',
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
  appsFlyerDevKey: '',
  frbiosKey: '',
  frbAndroidKey: '',
  frbiosAppId: '',
  frbAndroidAppId: '',
  iosClientId: '844649573794-jp5sjqb52fv0s3cajc9br3b8587p73hd.apps.googleusercontent.com',
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
    sentryDSN: 'https://52c725f984b24c1aae27f34ac4851e0d@o4504394122330112.ingest.sentry.io/4504394138517504',
    tracesSampleRate: 1.0, // send 100% transaction in testing
    debug: __DEV__,
    environment: __DEV__ ? 'dev' : 'uat',
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

const ENABLE_UAT = false;

export default ENABLE_UAT ? { ...config, ...uatConfig } : config;
