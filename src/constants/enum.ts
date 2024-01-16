export enum SocketStatus {
  CONNECTED = 'Connected',
  DISCONNECTED = 'Disconnected',
  CONNECTING = 'Connecting',
}

export enum Lang {
  VI = 'vi',
  EN = 'en',
  KO = 'ko',
  ZH = 'zh',
}

export enum SocketAuthState {
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
}

export enum SymbolType {
  STOCK = 'STOCK',
  FUND = 'FUND',
  ETF = 'ETF',
  FUTURES = 'FUTURES',
  CW = 'CW',
  BOND = 'BOND',
  INDEX = 'INDEX',
}

export enum SymbolSession {
  ATO = 'ATO',
  ATC = 'ATC',
  CONTINUOUS = 'CONTINUOUS',
}

export enum RealtimeChannelDataType {
  QUOTE = 'QUOTE',
  BID_OFFER = 'BID_OFFER',
  EXTRA = 'EXTRA',
  RE_SUB = 'RE_SUB',
  STATISTIC = 'STATISTIC',
}

export enum WS {
  PRICE_BOARD = 'priceBoard',
  WTS = 'wts',
  TTL = 'ttl',
  MOBILE_SERVER = 'mobileServer',
}

export enum storageKey {
  LASTED_USER_NAME = 'LASTED_USER_NAME',
  LASTED_KIS_NAME = 'LASTED_KIS_NAME',
  ALREADY_LOGGED_ID_LIST = 'ALREADY_LOGGED_ID_LIST',
  DEFAULT_AVATAR = 'DEFAULT_AVATAR',
  DEFAULT_KIS_AVATAR = 'DEFAULT_KIS_AVATAR',
  SESSION_TIMEOUT = 'SESSION_TIMEOUT',
  CURRENT_USER_ID = 'CURRENT_USER_ID',
  NOT_SHOW_AGAIN_BANNER_COPY_TRADE = 'NOT_SHOW_AGAIN_BANNER_COPY_TRADE',
  LOCAL_LANG = 'LOCAL_LANG',
}

export enum ISpecialPriceType {
  ATO = 'ATO',
  ATC = 'ATC',
  MP = 'MP',
  MTL = 'MTL',
  PLO = 'PLO',
  LO = 'LO',
  MOK = 'MOK',
  MAK = 'MAK',
  ODDLOT = 'ODDLOT',
}

export enum INotificationOption {
  TODAY = 'TODAY',
  YESTERDAY = 'YESTERDAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  ALL = 'ALL',
}

export enum IOrderType {
  STOP = 'STOP',
  STOP_LIMIT = 'STOP_LIMIT',
}

export enum ILeaderBoardInvestingPeriod {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
  ALL = 'ALL',
}

export enum ILeaderBoardTradingFilter {
  ALL_USERS = 'All Users',
  QUAILIFIED_USERS = 'Qualified Users',
}

export enum CheckUserExistType {
  EMAIL = 'EMAIL',
  USERNAME = 'USERNAME',
}

export enum PeriodType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export enum IndexRankType {
  TRADING_VOLUME = 'TRADING_VOLUME',
  RATE_DESC = 'RATE_DESC',
  RATE_ASC = 'RATE_ASC',
}

export enum FINANCIAL_RATIO_TITLE {
  MARKET_CAP = 'Market Cap',
  DIVIDEND_YIELD = 'Dividend Yield',
  EPS = 'EPS',
  ROE = 'ROE',
  ROA = 'ROA',
  DEBT_RATIO = 'Debt Ratio',
  INVENTORY_TURNOVER = 'Inventory Turnover',
  PE = 'PER',
  PS = 'PSR',
  PC = 'PCFR',
  PB = 'PBR',
  GROSS_PROFIT_MARGIN = 'Gross profit margin',
  NET_PROFIT_MARGIN = 'Net profit margin',
  CURRENT_RATIO = 'Current ratio',
  NET_PROFIT_GROWTH_QOQ = 'Net profit growth q-o-q',
  GROSS_PROFIT_GROWTH_QOQ = 'Gross profit growth q-o-q',
  REVENUE_GROWTH_QOQ = 'Revenue profit growth q-o-q',
  NET_PROFIT_GROWTH_YOY = 'Net profit growth y-o-y',
  GROSS_PROFIT_GROWTH_YOY = 'Gross profit growth y-o-y',
  REVENUE_GROWTH_YOY = 'Revenue profit growth y-o-y',
  DEBT_EQUITY_RATIO = 'Debt equity ratio',
  DEBT_ASSET_RATIO = 'Debt asset ratio',
  NET_PROFIT_GROWTH = 'Net Profit Growth',
  GROSS_PROFIT_GROWTH = 'Gross Profit Growth',
  REVENUE_GROWTH = 'Revenue Growth',
}

export enum ASSETS_INFORMATION_TITLE {
  NET_ASSET_VALUE = 'Net Asset Value',
  NET_ASSET_RETURN = 'Net Asset Return',
  STOCK_VALUE = 'Stock Value',
  CASH_BALANCE = 'Cash Balance',
  AWAITING_CASH = 'Awaiting Cash',
  PURCHASING_POWER = 'Purchasing Power',
  AVAILABLE_ADVANCE = 'Available Advance',
  AWAITING_MATCH = 'Awaiting Match',
  TOTAL_DEBT = 'Total Debt',
  MARGIN_RATE = 'Margin Rate',
}

export enum ASSETS_INFORMATION_ACCOUNT_KIS {
  TOTAL_ASSET = 'Total Asset',
  TOTAL_STOCK_MARKET_VALUE = 'Total Stock Market Value',
  NET_ASSET_VALUE = 'Net Asset Value',
  PURCHARSING_POWER = 'Purchasing Power',
  CASH_WITHDRAWAL = 'Cash Withdrawal',
  AVAIABLE_CASH_IN_ADVANCE = 'Avaiable Cash In Advance',
  PENDING_WITHDRAWAL_APPROVAL = 'Pending Withdrawal Approval',
  HOLD_FOR_PENDING_PURCHASE = 'Hold For Pending Purchase',
  HOLD_FOR_EXECUTED_PURCHASE = 'Hold For Executed Purchase',
  SOLD_T0 = 'Sold T0',
  SOLD_T1 = 'Sold T1',
}

export enum ASSETS_INFORMATION_ACCOUNT_KIS_M {
  OUTSTANDING_LOAN = 'Outstanding Loan',
  DAY_LOAN = 'Day Loan',
  ACCRURED_DEBIT_INTEREST = 'Accrured Debit Interest',
  STOCK_MAIN = 'Stock Main',
  EQUITY = 'Equity',
  MARGIN_RATIO = 'Margin Ratio (%)',
  MAINTENANCE_RATIO = 'Maintenance Ratio (%)',
  MARGIN_CALL_BY_STOCK_MAIN_ATM = 'Margin Call By Stock Main Atm',
  MARGIN_CALL_BY_CASH = 'Margin Call By Cash',
}

export enum ASSETS_INFORMATION_ACCOUNT_KIS_D {
  NET_ASSET_VALUE = 'Net Asset Value',
  ACCOUNT_BALANCE = 'Account Balance',
  COMMISSION = 'Commission',
  TAX = 'Tax',
  TOTAL_LOANS = 'Total Loans',
  DELIVERY_AMOUNT = 'Delivery Amount',
  INTEREST = 'Interest',
  FLOATING_PL = 'Floating P/L',
  TRADING_PL = 'Trading P/L',
  TOTAL_PL = 'Total P/L',
  MIN_RESERVE = 'Min Reserve',
  MARGINABLE = 'Marginable',
  RC_CALL = 'RC Call',
  CASH = 'Cash',
  NON_CASH = 'Non-Cash',
  INITIAL_MARGIN = 'Initial Margin',
  SPREAD_MARGIN = 'Spread Margin',
  DELIVERY_MARGIN = 'Delivery Margin',
  MARGIN_REQ = 'Margin Req',
  ACCOUNT_RATIO = 'Account Ratio (%)',
  WARNING_123 = 'Warning 1/2/3',
  MARGIN_CALL = 'Margin Call',
  TOTAL_VALUE = 'Total Value',
  CASH_WITHDRAWABLE = 'Cash Withdrawable',
  EE = 'EE',
}

export enum ChartStyle {
  LINE2 = 'LINE2',
  LINE = 'LINE',
  BAR = 'BAR',
  NO_DATA = 'NO_DATA',
  ACCUMULATE = 'ACCUMULATE',
}

export enum KEYPRESS {
  ENTER = 'Enter',
  BACKSPACE = 'Backspace',
}

export enum ITypeName {
  INDICES = 'Indices',
  WATCH_LIST = 'WatchList',
  HOT_STOCK = 'HotStock',
  TRADE = 'Trade',
  ORDER_BOOK = 'OrderBook',
  DEFAULT = 'Default',
}

export enum AccountType {
  PAAVE = 'PAAVE',
  KIS = 'KIS',
}

export enum MASMarketId {
  HOSE = 'HO',
  HNX = 'HA',
  UPCOM = 'OTC',
}

export enum MASSellBuyType {
  SELL = 'S',
  BUY = 'B',
  ALL = 'A',
}

export enum InputAccessoryViewID {
  PRICE = 'PRICE',
  STOP_PRICE = 'STOP_PRICE',
  STOP_LIMIT_PRICE = 'STOP_LIMIT_PRICE',
  LIMIT_PRICE = 'LIMIT_PRICE',
  QUANTITY = 'QUANTITY',
}

export enum KISEnquiryOrderStatus {
  ALL = 'ALL',
  NONE = 'NONE',
  PEX = 'PEX',
  SOI = 'SOI',
  IAV = 'IAV',
  SOR = 'SOR',
  PAP = 'PAP',
  PSB = 'PSB',
  BIX = 'BIX',
  MPA = 'MPA',
  BPM2 = 'BPM2',
  PAI = 'PAI',
  FLL = 'FLL',
  BIX2 = 'BIX2',
  PXP = 'PXP',
  REJ = 'REJ',
  KLL = 'KLL',
  CAN = 'CAN',
  BMS = 'BMS',
  BSS = 'BSS',
  MSD = 'MSD',
  STB = 'STB',
  CMO = 'CMO',
  WRN = 'WRN',
  WRR = 'WRR',
  CPD = 'CPD',
  BPM = 'BPM',
  MPS = 'MPS',
  EXP = 'EXP',
  ST = 'ST',
  FEX = 'FEX',
}

export enum CHANNEL {
  MTS_PAAVE = 'mts.paave',
  MTS_PAAVE_IOS = 'paave.ios', // app = ios
  MTS_PAAVE_ANDROID = 'paave.android', // app = android
  // WTS_PAAVE_PC = 'wts.paave.pc', // Paave web
  // WTS_PAAVE_IOS = 'wts.paave.ios', // Paave web = ios
  // WTS_PAAVE_ANDROID = 'wts.paave.android', // Paave web = android
}

export enum AppStateStatus {
  BACKGROUND = 'background',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  UNKNOWN = 'unknown',
  EXTENSION = 'extension',
}

export enum KisOrderStatus {
  READY_TO_SEND = 'READY_TO_SEND',
}

export enum SpecialErrorCode {
  SERVICE_UNAVAILABLE = 'Service unavailable, Please try again later',
  NODATA = 'NODATA', // Api services/eqt/getAdditionIssueShareInfo return error code NODATA instead of empty array
}

export enum CashTransferType {
  TO_SUB = 'TO_SUB',
  TO_BANK = 'TO_BANK',
  VSD_DEPOSIT = 'VSD_DEPOSIT',
  VSD_WITHDRAW = 'VSD_WITHDRAW',
  DR_TO_EQT = 'DR_TO_EQT',
  EQT_TO_DR = 'EQT_TO_DR',
  EXTERNAL = 'EXTERNAL',
  INTERNAL = 'INTERNAL',
  WITHDRAW = 'WITHDRAW',
  DEPOSIT = 'DEPOSIT',
}

export enum CashTransferStatus {
  ALL = 'ALL',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED',

  // VSD
  SETTLED = 'SETTLED',
}

export enum InternalCashTransferTabs {
  INTERNAL_TRANSFER = 'Internal Transfer',
  CASH_TRANSFER_HISTORY = 'Cash Transfer History',
}

export enum BiometryEnum {
  TouchID = 'TouchID',
  FaceID = 'FaceID',
  Biometrics = 'Biometrics',
}

const ApiResponseStatus = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  TIMEOUT: 'TIMEOUT',
} as const;

export type ApiResponseStatus = keyof typeof ApiResponseStatus;

const LoggerContentType = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
} as const;

export type LoggerContentType = keyof typeof LoggerContentType;

export const HitSlop = {
  top: 10,
  bottom: 10,
  right: 10,
  left: 10,
};

export const HitSlopDefault = {
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
};

export enum EStatusVirtualContestListed {
  UPCOMING = 'UPCOMING',
  IN_PROGRESS = 'IN_PROGRESS',
  ALL = 'ALL',
}

export enum IStatisticSortType {
  PRICE = 'price',
  RATE = 'rate',
}

export enum ChartEventHandleType {
  WIDGET_OPTIONS = 'WIDGET_OPTIONS',
}

export enum WidgetOptionName {
  BOLLING_BAND = 'BOLLING_BAND',
  RELATIVE_STRENGTH_INDEX = 'RELATIVE_STRENGTH_INDEX',
  MOVING_AVERAGE_5 = 'MOVING_AVERAGE_5',
  MOVING_AVERAGE_10 = 'MOVING_AVERAGE_10',
  MOVING_AVERAGE_50 = 'MOVING_AVERAGE_50',
  MOVING_AVERAGE_100 = 'MOVING_AVERAGE_100',
  MOVING_AVERAGE_200 = 'MOVING_AVERAGE_200',
  SWITCH_CHART_TYPE = 'SWITCH_CHART_TYPE',
}

export enum TVChartType {
  Bars = 0,
  Candles = 1,
  Line = 2,
  Area = 3,
  HeikenAshi = 8,
  HollowCandles = 9,
  Renko = 4,
  Kagi = 5,
  PointAndFigure = 6,
  LineBreak = 7,
}

export enum PostType {
  PUBLIC = 'public',
  UNLISTED = 'unlisted',
  PRIVATE = 'private',
  DIRECT = 'direct',
}
