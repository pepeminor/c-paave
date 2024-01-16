import { scaleSize } from 'styles';
import React, { ReactElement } from 'react';
import English from 'assets/flag/English.svg';
import Korea from 'assets/flag/Korea.svg';
import VN from 'assets/flag/VN.svg';
import LogoKis from 'assets/logo/LogoKis.svg';
// import LogoMirae from 'assets/logo/LogoMirae.svg';
// import LogoKB from 'assets/logo/LogoKB.svg';
// import LogoVietCapital from 'assets/logo/LogoVietCapital.svg';
// import JBSV from 'assets/logo/JBSV.svg';
// import NHlogo from 'assets/logo/NHlogo.svg';
import LogoPaave from 'assets/logo-paave.svg';

export enum LANG {
  VI = 'vi',
  EN = 'en',
  KO = 'ko',
  ZH = 'zh',
}

export enum LANG_CODE {
  VI = 'vi_VN',
  EN = 'en_GB',
  KO = 'ko_KR',
  ZH = 'zh_CN',
}

export enum BIOMETRIC_TYPE {
  TouchID = 'TouchID',
  FaceID = 'FaceID',
  None = 'None',
}

export const AUTH_TOKEN = 'AUTH_TOKEN';

export type ILanguageOption = {
  readonly label: string;
  readonly value: LANG;
  readonly image: ReactElement;
};

export const languageList: ILanguageOption[] = [
  {
    label: 'Tiếng Việt',
    value: LANG.VI,
    image: <VN height={scaleSize(24)} width={scaleSize(30)} />,
  },
  {
    label: 'English',
    value: LANG.EN,
    image: <English height={scaleSize(24)} width={scaleSize(30)} />,
  },
  {
    label: '한국어',
    value: LANG.KO,
    image: <Korea height={scaleSize(24)} width={scaleSize(30)} />,
  },
];

export const HomeScreenOption = {
  Portfolio: 'Portfolio',
  Discover: 'Discover',
} as const;
export type HomeScreenOption = keyof typeof HomeScreenOption;

export enum SELL_BUY_TYPE {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum SELL_BUY_TYPE_FILTER_VALUE {
  BUY = 'BUY',
  SELL = 'SELL',
  ALL = 'ALL',
}

export enum ALL_SETTING_LABEL {
  SETTING = 'Setting',
  HELP = 'Help & Support',
  ASSET_MANAGEMENT = 'Asset Management',
  ORDER_HIS = 'Order History',
  CASH_TRANSACTION = 'Cash Transaction',
  UTILITIES = 'Utilities',
  ACCOUNT_INFO = 'Account Information',
  INVITE_FRIENDS = 'Invite Friends',
  SECURITY = 'Security',
  SIGN_OUT = 'Sign Out',
  TRADING_ACCOUNT = 'Trading Account',
  LEADER_BOARD_SETTING = 'Leaderboard Setting',
}

export enum ALL_ORDER_STATUS_FILTER_VALUE {
  ALL = 'ALL',
  PENDING = 'PENDING',
  RECEIVED = 'RECEIVED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
  FILLED_ALL = 'FILLED_ALL',
  UNMATCHED = 'UNMATCHED',
  SETTLEMENT = 'SETTLEMENT',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  INACTIVE_ORDERS = 'INACTIVE_ORDERS',
  ACTIVE_ORDERS = 'ACTIVE_ORDERS',

  // KIS
  FULLYFILLED = 'FULLYFILLED',
  PARTIALLYFILL = 'PARTIALLYFILL',
  REJECTED = 'REJECTED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  READYTOSEND = 'READYTOSEND',
  SENDING = 'SENDING',
  QUEUED = 'QUEUED',
  PENDINGAPPROVAL = 'PENDINGAPPROVAL',
  WAITINGMODIFY = 'WAITING_MODIFY',
  WAITINGCANCEL = 'WAIT_TO_CANCEL',
  FULLY_EXECUTED = 'FULLY_EXECUTED',
  EXP = 'EXP',
  REJECT = 'REJECT',
  PENDING_TO_MARKET = 'Pending To Market',
  PARTIALLY_EXPIRED = 'PARTIALLY_EXPIRED',
  // Kis Derivatives
  FILLED = 'FILLED',
  QUEUE = 'QUEUE',
  KILLED = 'KILLED',
  FILL_AND_KILL = 'FILL_AND_KILL',
  OUTSTANDING = 'OUTSTANDING',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  READY_TO_SEND = 'READY_TO_SEND',
}

export enum AUTHEN_TYPE {
  NO_LOGIN = 'noLogin',
  LIVE = 'login',
  VIRTUAL = 'virtual',
  KIS = 'kis',
}

export enum ORDER_TYPE {
  NORMAL_ORDER = 'NORMAL_ORDER',
  STOP_ORDER = 'STOP_ORDER',
  STOP_LIMIT_ORDER = 'STOP_LIMIT_ORDER',
}

export enum OrderBookScreenInitOption {
  ORDER_BOOK = 'ORDER_BOOK',
  CANCEL_ORDER_BOOK = 'CANCEL_ORDER_BOOK',
  CONDITION_ORDER = 'CONDITION_ORDER',
  CANCEL_CONDITION_ORDER = 'CANCEL_CONDITION_ORDER',
  ORDER_HISTORY = 'ORDER_HISTORY',
}

export enum ITradeTabOption {
  PORTFOLIO = 'PORTFOLIO',
  ORDER_BOOK = 'ORDER_BOOK',
  CONDITION_ORDER = 'CONDITION_ORDER',
}

export const RECENT_VIEW_LIST = 'RECENT_VIEW_LIST';

export enum MARKET {
  HOSE = 'HOSE',
  HNX = 'HNX',
  UPCOM = 'UPCOM',
}

export enum SYSTEM_TYPE {
  EQUITY = 'EQUITY',
  DERIVATIVES = 'DERIVATIVES',
}

export enum SUB_ACCOUNT_TYPE {
  SUB_ACCOUNT_X = 'X',
  SUB_ACCOUNT_M = 'M',
  SUB_ACCOUNT_D = 'D',
}

export enum ACCOUNT_TYPE {
  KIS = 'KIS',
  // MAS = 'MAS',
  // KBSV = 'KBSV',
  // VCSC = 'VCSC',
  // JBSV = 'JBSV',
  // NHSV = 'NHSV',
  VIRTUAL = 'PAAVE',
  DEMO = 'DEMO',
}

export enum UtilitiesScreenInitOption {
  UTILITIES_STOCK = 'UTILITIES_STOCK',
  UTILITIES_STOCKBALANCE = 'UTILITIES_STOCKBALANCE',
  UTILITIES_STOCKHISTOTY = 'UTILITIES_STOCKHISTOTY',
  UTILITIES_RIGHT = 'UTILITIES_RIGHT',
  UTILITIES_ODDLOT = 'UTILITIES_ODDLOT',
  UTILITIES_ORDER = 'UTILITIES_ORDER',
  UTILITIES_CORPORATE = 'UTILITIES_CORPORATE',
  UTILITIES_STOCKPURCHASE = 'UTILITIES_STOCKPURCHASE',
  UTILITIES_HISTORY = 'UTILITIES_HISTORY',
}

export enum OddlotOption {
  ODDLOT_STOCKS = 'ODDLOT_STOCKS',
  ODDLOT_HISTORY = 'ODDLOT_HISTORY',
}

export enum InsightsStrategiesDetailOption {
  OPEN_POSITION = 'OPEN_POSITION',
  TRADING_HISTORY = 'TRADING_HISTORY',
  SIGNAL_HISTORY = 'SIGNAL_HISTORY',
}

export enum FollowOption {
  FOLLOWING = 'FOLLOWING',
  FOLLOWWERS = 'FOLLOWWERS',
}

export const CompaniesLogo = {
  [ACCOUNT_TYPE.KIS]: <LogoKis height={scaleSize(35)} width={scaleSize(134)} />,
  [ACCOUNT_TYPE.VIRTUAL]: <LogoPaave height={scaleSize(36)} width={scaleSize(83)} />,
  // [ACCOUNT_TYPE.MAS]: <LogoMirae height={scaleSize(42)} width={scaleSize(134)} />,
  // [ACCOUNT_TYPE.KBSV]: <LogoKB height={scaleSize(20)} width={scaleSize(134)} />,
  // [ACCOUNT_TYPE.VCSC]: <LogoVietCapital height={scaleSize(33)} width={scaleSize(134)} />,
  // [ACCOUNT_TYPE.JBSV]: <JBSV height={scaleSize(35)} width={scaleSize(134)} />,
  // [ACCOUNT_TYPE.NHSV]: <NHlogo height={scaleSize(22)} width={scaleSize(134)} />,
  [ACCOUNT_TYPE.DEMO]: null,
};

export const CONNECT_SEC_FLOW = {
  AUTH: 'Authenticated',
  SIGNUP: 'SignUp',
  LEADERBOARD: 'Leaderboard',
};

export enum RightType {
  ALL = 'ALL',
  CASH_DIVIDEND = 'CASH_DIVIDEND',
  STOCK_DIVIDEND = 'STOCK_DIVIDEND',
  BONUS_SHARE = 'BONUS_SHARE',
  ADDITIONAL_ISSUE = 'ADDITIONAL_ISSUE',
}

export enum ESubAccountJoinedContest {
  NOT_JOIN = '000',
}
