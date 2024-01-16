/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction } from 'redux';
import { SCChannel } from 'sc-channel';
import { ISymbolData } from './market';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PersistConfig } from 'redux-persist';
import { SymbolType, RealtimeChannelDataType } from 'constants/enum';
import { INavigationGoBackProps, INavigationProps } from 'utils';
import { ACCOUNT_TYPE, SELL_BUY_TYPE, SYSTEM_TYPE } from 'global';
import { RealAccountSec } from 'screens/AccountTrading';
import { IStackRouteProps } from 'screens/RootNavigation';
import { IState } from 'reduxs/global-reducers';

export interface IAccount {
  // account: string;
  // accountDisplay?: string;
  // autoAdvance?: string;
  // banks?: IAccountBank[];
  // isBankLinkingAccount?: boolean;
  // accountDesc?: string;
  oldType?: ACCOUNT_TYPE;
  oldSelectedSubAccount?: ISubAccount;
  type: ACCOUNT_TYPE;
  username?: string;
  subAccounts?: ISubAccount[];
  selectedSubAccount?: ISubAccount;
}

// export interface IAndroidEkycResult {
//   challengeCode?: string;
//   dataBase64?: string;
//   dataSign?: string;
//   imgs?: { img_back: string; img_front: string };
//   logID?: string;
//   message?: string;
//   object?: IEkycInfo;
//   server_version?: string;
//   statusCode?: number;
//   imgFront?: string;
//   imgRear?: string;
//   imagePortrait?: string;
//   info?: string;
//   faceResult?: string;
//   compare?: string;
//   imageFront?: string;
//   imageFace?: string;
//   imageBack?: string;
//   errors?: string[];
// }

// export interface IEkycInfo {
//   back_corner_warning: string;
//   back_expire_warning: string;
//   back_type_id: number;
//   birth_day: string;
//   birth_day_prob: number;
//   card_type: string;
//   citizen_id: string;
//   citizen_id_prob: number;
//   corner_warning: string;
//   expire_warning: string;
//   gender: string;
//   id: string;
//   id_fake_prob: number;
//   id_fake_warning: string;
//   id_probs: string;
//   issue_date: string;
//   issue_date_prob: number;
//   issue_date_probs: number[];
//   issue_place: string;
//   issue_place_prob: number;
//   msg: string;
//   msg_back: string;
//   name: string;
//   name_prob: number;
//   nation_policy: string;
//   nationality: string;
//   origin_location: string;
//   origin_location_prob: number;
//   recent_location: string;
//   recent_location_prob: number;
//   type_id: number;
//   valid_date: string;
//   valid_date_prob: number;
//   prob: number;
// }

export interface IAccountList {
  [ACCOUNT_TYPE.VIRTUAL]: IAccount;
  [ACCOUNT_TYPE.KIS]?: IAccount;
  // [ACCOUNT_TYPE.MAS]?: IAccount;
  // [ACCOUNT_TYPE.KBSV]?: IAccount;
  // [ACCOUNT_TYPE.VCSC]?: IAccount;
  // [ACCOUNT_TYPE.JBSV]?: IAccount;
  // [ACCOUNT_TYPE.NHSV]?: IAccount;
  [ACCOUNT_TYPE.DEMO]?: IAccount;
}

export interface ISubAccount {
  accountName: string;
  accountNumber: string;
  accountSubs: {
    type: SYSTEM_TYPE;
    bankAccounts: number;
  }[];
}

export interface IError {
  readonly code?: string;
  readonly message?: string;
  readonly messageParams?: string[];
  readonly params?: any[];
}

export interface IGetLinkedAccountsResponse {
  partnerId: string;
  partnerUsername: string;
  // name: string;
  // description: string;
  // iconUrl: string;
}

export interface ILoginRealAccountRequest {
  readonly username: string;
  readonly password: string;
  readonly sec?: RealAccountSec;
}

export interface ILoginRealAccountKisResult {
  accessToken: string;
  refreshToken: string;
  userInfo: {
    username: string;
    id: number;
    avatar: string;
    birthday: string;
    email: string;
    phoneCode: string;
    phoneNumber: string;
    accounts: ISubAccount[];
  };
  accExpiredTime: number;
  refExpiredTime: number;
}

export interface IGetAllPartnersResponse {
  readonly partnerId: string;
  readonly targetPartnerId: string;
  readonly name: string;
  readonly description: string;
  readonly iconUrl: string;
}

export interface IGenerateNewKisCardResponse {
  readonly wordMatrixId: number;
  readonly wordMatrixKey: string;
}

export interface IKisVerifyAndSaveOTPResponse {
  readonly otpToken: string;
}

export interface IKisVerifyAndSaveOTPRequest {
  readonly expireTime: number;
  readonly verifyType: string;
  readonly wordMatrixId: number;
  readonly wordMatrixValue: string;
}

export interface IMaxBuySellRequest {
  readonly accountNumber: string;
  readonly symbolCode: string;
  readonly sellBuyType: SELL_BUY_TYPE;
  readonly price: number;
}

export interface IDerivativesPurchasingPowerRequest {
  readonly accountNo?: string;
  readonly subAccount?: string;
  readonly clientID?: string;
}

export interface IDerivativesPurchasingPowerResponse {
  readonly accountSummary: {
    accountBalance: number;
    cash_nonCash: number;
    commission_tax: number;
    deliveryAmount: number;
    extLoan: number;
    dailyPL: number;
    floatingPL_tradingPL: number;
    interest: number;
    marginable: number;
    minReserve: number;
    netAssetValue: number;
    rcCall: number;
    totalEquity: number;
    totalPL: number;
    totalStockMarketValue: number;
  };
  readonly cashInformation: {
    exchange: {
      EE: number;
      cash: number;
      cashWithdrawable: number;
      totalValue: number;
    };
    internal: {
      EE: number;
      cash: number;
      cashWithdrawable: number;
      totalValue: number;
    };
  };
  readonly portfolioAssessment: {
    exchange: {
      accountRatio: number;
      deliveryMargin: number;
      initialMargin: number;
      marginCall: number;
      marginReq: number;
      spreadMargin: number;
      warning123: number;
    };
    internal: {
      accountRatio: number;
      deliveryMargin: number;
      initialMargin: number;
      marginCall: number;
      marginReq: number;
      spreadMargin: number;
      warning123: number;
    };
  };
}

export interface ILinkAccountKisInitRequest {
  readonly partnerId: string;
  readonly partnerUsername: string;
  readonly partnerUserId?: number;
}

export interface ILinkAccountKisInitResponse {
  readonly authCode: string;
}

export interface ILinkAccountsRequest {
  partnerId: string;
  authCode: string;
  partnerUsername: string;
  realAccountType: RealAccountSec;
  optBoard: boolean;
}

export interface ILinkAccountsLoginRequest {
  partnerId: string;
  session_time_in_minute?: number;
  notNavigate?: boolean;
}

export interface ILinkAccountsLoginResponse {
  accessToken: string;
  refreshToken: string;
  userInfo: {
    username: string;
    id: number;
    avatar: string;
    birthday: string;
    email: string;
    phoneCode: number;
    phoneNumber: number;
    emailVerified: true;
    accounts: ISubAccount[];
  };
  accExpiredTime: number;
  refExpiredTime: number;
}

export interface IObject {
  readonly [s: string]: any;
  readonly data?: IObject | IObject[];
  readonly nextData?: IObject | IObject[];
  readonly next?: boolean;
  readonly fetchMore?: boolean;
}

export interface IPersistConfig<S, RS = any, HSS = any, ESS = any> extends PersistConfig<S, RS, HSS, ESS> {
  readonly whitelist?: Extract<keyof S, string>[];
  readonly blacklist?: Extract<keyof S, string>[];
}

// export interface IUserExtraInfo {
//   currentSymbol?: ISymbolInfo;
//   selectedAccount?: IAccount;
//   // favoriteLists?: IFavorite[];
//   // selectedFavorite?: IFavorite;
//   // settings?: ISettings;
// }

export interface IUserInfo {
  id: number;
  username: string;
  // avatar?: string;
  // displayName: string;
  // orderPassType: string;
}

// export interface IChannel {
//   readonly watch: <T>(callback: (res?: T) => void) => Function;
//   readonly unwatch: Function;
//   readonly unsubscribe: Function;
// }

// export interface ISocket {
//   readonly id: string;
//   readonly state: string;
//   readonly authState: SocketAuthState;
//   readonly signedAuthToken: string;
//   readonly userChannel?: IChannel;
//   readonly domainChannels?: IChannel[];
//   readonly globalChannel?: IChannel;
//   readonly emit: Function;
//   readonly on: Function;
//   readonly authenticate: Function;
//   readonly deauthenticate: (cb: (err: unknown) => void) => void;
//   readonly subscribe: (channel: string, options?: IObject) => IChannel;
//   readonly isSubscribed: (channelName: string, includePending?: boolean) => boolean;
//   readonly destroy?: Function;
//   readonly connect: Function;
//   readonly disconnect: (code?: number, data?: string) => void; // code between 4100 to 4500
// }

export interface IRequest<T> extends AnyAction {
  readonly response: IResponseType;
  readonly payload: T;
}

export interface IResponseType {
  readonly success: string;
  readonly fail: string;
}

export interface ISignupRequest {
  readonly navigation: NativeStackNavigationProp<IStackRouteProps, 'SignUp'>;
  readonly username: string;
  readonly password: string;
  readonly confirmPassword: string;
}

export interface IBiometricRegisterKisParams {
  readonly wordMatrixId: string;
  readonly wordMatrixValue: string;
  readonly kisToken: string;
  readonly publicKey: string;
  readonly deviceId: string;
}

export interface IRegisterBiometricRequest {
  readonly password: string;
  readonly publicKey: string;
  readonly deviceId: string;
}

export interface IQueryBiometricStatusRequest {
  readonly userId: number;
  readonly deviceId: string;
}

export interface IQueryBiometricStatusResponse {
  readonly isEnable: boolean;
}

export interface IVerifyOTPSignupRequest {
  readonly navigation: NativeStackNavigationProp<IStackRouteProps, 'SignupOTP'>;
}

export interface IVerifyOTPForgotPasswordRequest {
  readonly navigation: NativeStackNavigationProp<IStackRouteProps, 'SignupOTP'>;
}

export interface IActionCallBack {
  readonly handleSuccess?: (response?: any) => void;
  readonly handleFail?: (error?: unknown) => void;
}

export interface IAction<T> {
  readonly type: string;
  readonly showLoading?: boolean;
  readonly hideLoading?: boolean;
  readonly loadMore?: boolean;
  readonly payload: T;
  readonly response?: IResponseType;
  readonly navigation?: INavigationAction;
  readonly showMessage?: INotifyMessage;
  readonly differentParams?: IObject;
  readonly callBack?: IActionCallBack;
  readonly from?: string;
  readonly isReload?: boolean;
}

export interface ToolkitAction<T, K = Record<string, unknown>> {
  readonly type: string;
  readonly payload: T;
  readonly error?: boolean;
  readonly meta: {
    readonly response: IResponseType;
    readonly showLoading?: boolean;
    readonly hideLoading?: boolean;
    readonly loadMore?: boolean;
    readonly navigation?: INavigationAction;
    readonly showMessage?: INotifyMessage;
    readonly differentParams?: IObject;
    readonly callBack?: IActionCallBack;
    readonly from?: string;
    readonly isReload?: boolean;
  } & K;
}

export interface IParams {
  readonly [s: string]: any;
  readonly offset?: number;
  readonly fetchCount?: number;
  readonly loadMore?: boolean;
  readonly navigation?: INavigationProps;
  readonly showMessage?: INotifyMessage;
}

export interface INavigationAction extends INavigationProps {
  readonly clean?: boolean;
  readonly goBackScreen?: INavigationProps | INavigationGoBackProps[];
}

export interface IAPI {
  readonly uri: string;
  readonly useFullUri?: boolean;
  readonly method?: string;
  readonly wsName?: string;
  readonly authenticated?: boolean;
  readonly otpToken?: string;
  readonly notShowAlert?: boolean;
  readonly notShowAlertWithAuth?: boolean;
  readonly notShowAlertWithCodes?: string[];
  readonly useBodyOnDeleteMethod?: boolean;
  readonly isKisForward?: boolean;
  readonly withOtpToken?: boolean;
  readonly needSubId?: boolean;
  readonly noCache?: boolean;
  readonly useFormData?: boolean;
}

export interface IResponse<T> {
  readonly data: T;
}

export type IReducer<T, A = T> = (state: T, action: IAction<A | T>) => T;

export interface ISelf {
  // tslint:disable-next-line: readonly-keyword
  lang: string;
}
// tslint:disable: readonly-keyword
export interface ISubscribeChannel {
  code?: string;
  symbolType?: SymbolType;
  channel?: SCChannel;
  channelType: RealtimeChannelDataType;
  count?: number;
  callbacks?: { [key: string]: (data: ISymbolData) => void };
}

export interface INotifyMessage {
  readonly message: string;
  readonly description?: string;
}

export interface INews {
  readonly id: string;
  readonly lang: string;
  readonly link: string;
  readonly title: string;
  readonly imgUrl: string;
  readonly source?: {
    readonly name: string;
    readonly logoUrl: string;
  };
  readonly category: string;
  readonly symbolList: [string];
  readonly publishTime: string;
}

export interface IIndexStockRankingUpDown {
  /**
   * stockCode
   */
  readonly c: string;
  /**
   * last = current Price
   */
  readonly l: number;
  /**
   * rate
   */
  readonly r: number;
  /**
   * change
   */
  readonly cn: string;
  /**
   * turnoverRate
   */
  readonly to: string;
  /**
   * Trading Value
   */
  readonly tr: string;
  /**
   * Trading Volume
   */
  readonly tv: string;
}

export interface ISymbolPeriod {
  /**
   * #close
   */
  readonly c: number;
  /**
   * #date
   */
  readonly d: string;
  /**
   * #high
   */
  readonly h: number;
  /**
   * #low
   */
  readonly l: number;
  /**
   * #open
   */
  readonly o: number;
  /**
   * #change
   */
  readonly ch: number;
  /**
   * #day count
   */
  readonly dc: number;
  /**
   * #rate
   */
  readonly ra: number;
  /**
   * #trading value
   */
  readonly va: number;
  /**
   *#trading volume
   */
  readonly vo: number;
}

export interface IFormatDataChart {
  readonly x: number;
  readonly y: number;
  readonly date: string | number | null;
  readonly xLabel: string | number | null;
}

export interface IClientData {
  clientId: string;
  clientSecret: string;
}

export type ArrayItem<T> = T extends (infer U)[] ? U : never;

export interface IPagination {
  pageNumber: number;
  pageSize: number;
}

export interface ISelector {
  [s: string]: (state: IState) => unknown;
}
