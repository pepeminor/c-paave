import * as authenticationReducers from './Authentication';
import * as marketReducers from './Market';
import * as signUpReducer from 'screens/SignupOTP/reducers';
import * as socketReducers from './Socket';
import * as EquityReducers from './Equity';
import * as loadingReducers from './Loading';
import * as notificationReducers from './Notification';
import * as profile from './Profile';
import * as searchReducers from './Search';
import * as KisServiceDer from './KisServicesDer';
import * as stockSectorReducers from './StockSector';
import { combineReducers } from 'redux';
import { localizationReducer, languageReducer } from '../Localization';
import { CurrentUserSetting, CurrentSubContestUser, UsersSetting, UserInfoFromLogin } from './UserInfo';
import { AccountList } from './AccountList';
import * as newsReducers from './News';
import { KeyboardHeight } from './KeyboardHeight';
import { FillPriceTriggered } from 'components/BidOfferList/BidOffer/BidOfferElement/reducers';
import * as leaderBoard from './LeaderBoard';
import * as leaderboardSetting from './LeaderboardSetting';
import * as Rank from './Rank';
import { screenIndexInfo } from './IndexInfo';
import * as watchList from './WatchList';
import * as AccountInformation from './AccountInfo';
import * as FinanceData from './Finance';
import * as Notice from './Notice';
import { IAction } from 'interfaces/common';
import * as Orderbook from './Orderbook';
import * as BankTransfer from './BankTransfer';
import * as StockTransfer from './StockTransfer';
import * as KisVerifyForgotPw from './KisVerifyForgotPassword';
import * as ResourceFiles from './ResourceFiles';
import {
  KisCheckOTP,
  KisOTPToken,
  KisVerifyAndSaveOTPSuccessTrigger,
  LoginRealAccountKISresult,
  LoginRealAccountParams,
  KisOTPErrorValue,
} from 'screens/LoginRealAccount/reducers';
import * as KisServiceEqt from './KisServiceEqt';
import * as PortFolio from './Portfolio';

import { AllPartner } from './Partner';
import { SelectedAccount } from 'components/AccountPicker/reducers';
import { KisSessionTimeout } from './KisSessionTimeout';
import { LoginData } from 'screens/SignIn/reducers';
import { LinkAccountsSuccessTrigger, displayModalOTPPortfolio } from './LinkAccounts';
import { ShowModalDisconnectNetwork } from './NetworkConnection';
import { NotifyKisMobileOtpStatus } from 'components/ModalOTPKIS/reducers';
import { SafeScreenHeight } from './SafeScreenHeight';
import { AuthenticationRegisterUserExistTrigger } from 'screens/SignupEnterName/reducers';
import { UserBasedReducer } from './UserBasedReducer';
import {
  QueryBiometricStatus,
  RegisterBiometricFailedTrigger,
  RegisterBiometricSuccessTrigger,
  TemporarilyBiometricStatus,
} from 'screens/Security/reducers';
import { NonLoginModal, NonLoginRecentViewed } from './NonLogin';
import SymbolDataReducer from 'reduxs/SymbolData/SymbolData.reducer';
import HotStockReducer from 'reduxs/HotStock/HotStock.reducer';
import {
  // DerivativeCashBalance,
  DerivativePortfolio,
} from './Derivative';
import {
  UserWallReducer,
  InvestmentReducer,
  DiscoverReducer,
  DailyProfitLossReducer,
  FinancialInfoReducer,
  AuthenticationReducer,
  WatchListReducer,
  AIRatingReducer,
  LoadingAndErrorReducer,
  SettingReducer,
  Top100StocksReducer,
  AdvisorReducer,
  StockThemeReducer,
  FeedBackReducer,
  NewsReducer,
  ForeignTradingReducer,
  VideosReducer,
  DataChartSymbolReducer,
  SocialPostReducer,
  SocialNewPostReducer,
  SocialAccountReducer,
  NotificationReducer,
  ReloadControllerReducer,
} from 'reduxs';
import CopyTradeRedux from 'reduxs/CopyTrade/CopyTrade.redux';
import { ShowDummyModal } from './DummyModal';
import { PriceBoardReducer } from 'reduxs/PriceBoard';
import {
  DerivativesPurchasingPower,
  MaxBuySell,
  OnExecuteModal,
  QueryMaxBuySellSuccessTrigger,
} from 'screens/TradeScreen/components/TradeFormLayout/components/TradeForm/reducer';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import { persistReducer } from 'redux-persist';
import { EkycReducer } from 'reduxs/Ekyc';

const sensitiveStorage = createSensitiveStorage({
  keychainService: 'paaveKeychain',
  sharedPreferencesName: 'paaveSharedPrefs',
});

const authPersistConfig = {
  key: 'authToken',
  storage: sensitiveStorage,
};

const kisPersistConfig = {
  key: 'kisAuthToken',
  storage: sensitiveStorage,
};

const appReducer = combineReducers({
  // Global
  WatchListReducer,
  AuthenticationReducer,
  InvestmentReducer,
  DiscoverReducer,
  DailyProfitLossReducer,
  AIRatingReducer,
  UserWallReducer,
  SettingReducer,
  StockThemeReducer,
  PriceBoardReducer,
  FeedBackReducer,
  NewsReducer,
  DataChartSymbolReducer,
  VideosReducer,
  EkycReducer,
  SocialPostReducer,
  SocialNewPost: SocialNewPostReducer,
  SocialAccount: SocialAccountReducer,
  socketStatus: socketReducers.SocketStatus,
  verifyOTPSignupStatusSuccessTrigger: signUpReducer.VerifyOTPSignupStatusSuccessTrigger,
  verifyOTPSignupStatusFailedTrigger: signUpReducer.VerifyOTPSignupStatusFailedTrigger,
  verifyOTPFotgotPasswordStatusSuccessTrigger: signUpReducer.VerifyOTPFotgotPasswordStatusSuccessTrigger,
  verifyOTPFotgotPasswordStatusFailedTrigger: signUpReducer.VerifyOTPFotgotPasswordStatusFailedTrigger,
  usersSetting: UsersSetting,
  userInfoFromLogin: UserInfoFromLogin,
  currentUserSetting: CurrentUserSetting,
  accountList: AccountList,
  selectedAccount: SelectedAccount,
  kisSessionTimeout: KisSessionTimeout,
  kisVerifyAndSaveOTPSuccessTrigger: KisVerifyAndSaveOTPSuccessTrigger,
  kisOTPErrorValue: KisOTPErrorValue,
  allPartner: AllPartner,
  notifyKisMobileOtpStatus: NotifyKisMobileOtpStatus,
  ReloadController: ReloadControllerReducer,

  // Language
  lang: languageReducer,
  i18n: localizationReducer,

  // Market
  symbolQuoteMinutes: marketReducers.SymbolQuoteMinutes,
  lastTradingDate: marketReducers.LastTradingDate,
  buyableInfo: marketReducers.BuyableInfo,
  sellableInfo: marketReducers.SellableInfo,
  symbolPeriodMas: marketReducers.SymbolPeriodMas,
  aiRatingData: marketReducers.AIRatingData,
  aiRatingDataList: marketReducers.AIRatingDataList,
  aiRatingInOut: marketReducers.AIRatingInOut,
  prohibitedStock: marketReducers.ProhibitedStock,
  tradeTabOption: marketReducers.TradeTabOption,
  buyableInfoOrderBook: marketReducers.BuyableInfoOrderBook,
  sellableInfoOrderBook: marketReducers.SellableInfoOrderBook,
  sellBuyType: marketReducers.SellBuyType,

  // Authentication
  otpId: authenticationReducers.otpId,
  otpKey: authenticationReducers.otpKey,
  otpParams: authenticationReducers.otpParams,
  registerParams: authenticationReducers.registerParams,
  authenticationRegisterUserExistTrigger: AuthenticationRegisterUserExistTrigger,
  resetPasswordParams: authenticationReducers.resetPasswordParams,
  authToken: persistReducer(authPersistConfig, authenticationReducers.authToken),
  kisAuthToken: persistReducer(kisPersistConfig, authenticationReducers.kisAuthToken),
  generateKisCardResult: authenticationReducers.GenerateKisCardResult,
  generateKisCardFailedTrigger: authenticationReducers.GenerateKisCardFailedTrigger,
  checkExistUserEmail: authenticationReducers.CheckExistUserEmail,
  checkUsernameExist: authenticationReducers.CheckUsernameExist,
  loginRealAccountParams: LoginRealAccountParams,
  kisOTPToken: KisOTPToken,
  kisCheckOTP: KisCheckOTP,
  loginRealAccountKISresult: LoginRealAccountKISresult,
  linkedAccounts: authenticationReducers.LinkedAccounts,
  loginData: LoginData,
  linkAccountsSuccessTrigger: LinkAccountsSuccessTrigger,
  onModalOTPKIS: authenticationReducers.OnModalOTPKIS,
  autoSignupOTP: authenticationReducers.AutoSignupOTP,
  displayModalOTPPortfolio: displayModalOTPPortfolio,
  showModalUpdate: authenticationReducers.ShowModalUpdate,
  isLoginWithBiometric: authenticationReducers.IsLoginWithBiometric,
  suggestBiometric: authenticationReducers.SuggestBiometric,
  triggerReLoginBiometricModal: authenticationReducers.TriggerReLoginBiometricModal,
  loginWithSocialAccount: authenticationReducers.LoginWithSocialAccount,

  // Equity
  orderSuccess: EquityReducers.OrderSuccess,
  orderKISSuccess: EquityReducers.OrderKISSuccess,
  modifyOrderBookSuccessTrigger: EquityReducers.ModifyOrderBookSuccessTrigger,
  cancelOrderBookSuccessTrigger: EquityReducers.CancelOrderBookSuccessTrigger,
  navChange: EquityReducers.NAVChange,
  accumulativeNAV: EquityReducers.AccumulativeNAV,
  profitLoss: EquityReducers.ProfitLoss,
  realizedProfitLoss: EquityReducers.RealizedProfitLoss,
  virtualProfitLoss: EquityReducers.VirtualProfitLoss,
  cashAndStockBalance: EquityReducers.CashBalanceAndStockBalance,
  accountBalance: EquityReducers.AccountBalance,
  OrderHistory: EquityReducers.OrderHistory,
  ActiveOrder: EquityReducers.ActiveOrder,
  OrderStopHistory: EquityReducers.OrderStopHistory,
  loader: loadingReducers.loader,
  loadingAndError: LoadingAndErrorReducer,
  orderHistory: EquityReducers.OrderHistory,
  modifyStopOrder: EquityReducers.ModifyStopOrder,
  cancelStopOrder: EquityReducers.CancelStopOrder,
  cancelStopOrderMulti: EquityReducers.CancelMultiStopOrder,
  orderStatus: EquityReducers.OrderStatus,
  orderStopStatus: EquityReducers.OrderStopStatus,
  followingProfitLoss: EquityReducers.FollowingProfitLoss,
  followingDailyProfitLossByDate: EquityReducers.FollowingDailyProfitLossByDate,
  followingDailyProfitLossKisByDate: EquityReducers.FollowingDailyProfitLossKisByDate,
  mostBoughtStock: EquityReducers.MostBoughtStock,
  mostSoldStock: EquityReducers.MostSoldtStock,
  getEventByStock: EquityReducers.GetEventByStock,
  cashInAdvance: EquityReducers.CashInAdvanceState,
  registerExercise: EquityReducers.RegisterExerciseState,
  orderConfirmation: EquityReducers.OrderConfirmation,

  // Search
  mostSearchStock: searchReducers.MostSearchtStock,
  querySearchUserInfo: searchReducers.SearchUserInfo,
  getRecentViewed: searchReducers.GetRecentViewed,

  // Trade
  onExecuteModal: OnExecuteModal,

  // News
  newsInit: newsReducers.NewsInit,

  // Keyboard height
  keyboardHeight: KeyboardHeight,

  // Safe Area View full height
  safeScreenHeight: SafeScreenHeight,

  // Trigger fill price
  fillPriceTriggered: FillPriceTriggered,

  // Update Orderbook
  orderBookCancelMode: Orderbook.OrderBookCancelMode,
  orderBookSymbol: Orderbook.OrderBookSymbol,
  orderBookScreenOption: Orderbook.OrderBookScreenOption,
  orderBookFilter: Orderbook.OrderBookFilter,
  OrderbookResetSelectedTrigger: Orderbook.OrderbookResetSelectedTrigger,

  // Notification
  accountNotificationList: notificationReducers.AccountNotificationList,
  numberOfUnreadNotification: notificationReducers.NumberOfUnreadNotification,
  Notification: NotificationReducer,

  // Leader Board
  leaderBoardInvesting: leaderBoard.LeaderBoardInvesting,
  leaderboardAccountSelector: leaderBoard.AccountSelector,
  investingUserRanking: leaderBoard.InvestingUserRanking,
  usersAvatar: leaderBoard.UsersAvatar,
  leaderboardContestModal: leaderBoard.ContestModal,
  showJoinNowLeaderBoardModal: leaderBoard.ShowJoinNowLeaderBoardModal,
  showJoinNowRealLeaderBoardModal: leaderBoard.ShowJoinNowRealLeaderBoardModal,
  getVirtualCoreContest: leaderBoard.GetVirtualCoreContest,
  getVirtualCoreContestRanking: leaderBoard.GetVirtualCoreContestRanking,
  showKycKISModal: leaderBoard.ShowKycKisModal,
  accountContestRegistered: leaderBoard.GetContestAccountRegistered,
  getCurrentInvestingInfo: leaderBoard.GetCurrentInvestingInfo,
  showQuestionContestLeaderBoardModal: leaderBoard.ShowQuestionContestLeaderBoardModal,
  getVirtualCoreContestListed: leaderBoard.GetVirtualCoreContestListed,
  currentSubContestUser: CurrentSubContestUser,
  getVirtualCoreContestCurrentRanking: leaderBoard.GetVirtualCoreContestCurrentRanking,
  restartSubDisableModal: leaderBoard.RestartSubDisableModal,
  leaderboardSetting: leaderboardSetting.LeaderboardSetting,
  getPortfolioContestCurrentRanking: leaderBoard.GetPortfolioContestCurrentRanking,

  //Profile
  tradingHistory: profile.TradingHistory,
  // DiscoverWatchList flow
  getSymbolLatestVisibleList: watchList.GetSymbolLatestVisibleList,
  // Rank
  symbolIndexRankList: Rank.SymbolIndexRankList,
  // Screen specific
  screenIndexInfo: screenIndexInfo,

  // Stock Sector
  companyOverview: stockSectorReducers.CompanyOverview,

  //UserAccountInfo
  getUserAccountInfo: AccountInformation.GetUserAccountInfo,
  getUserKisAccountInfo: AccountInformation.GetUserKisAccountInfo,
  putUpdateUsername: AccountInformation.PutUpdateUsername,
  putUpdateEmail: AccountInformation.PutUpdateEmail,
  putUserBio: AccountInformation.PutUserBio,

  //Finance
  getFinancialRatioData: FinanceData.GetFinancialRatioData,
  FinancialInfo: FinancialInfoReducer,
  foreignTrade: FinanceData.ForeignTrade,
  getFinanceStatement: FinanceData.GetFinanceStatement,
  top100Stocks: Top100StocksReducer,
  foreignTrading: ForeignTradingReducer,

  // Notice
  noticeShow: Notice.NoticeShow,

  // Kis Service
  kisEqtStockInfo: KisServiceEqt.KisEquityStockInfo,
  kisEqtAssetInfo: KisServiceEqt.KisEquityAssetInfo,
  kisEqtGenBuyAll: KisServiceEqt.KisEquityGenBuyAll,
  kisEquityEnquiryOrder: KisServiceEqt.KisEquityEnquiryOrder,
  kisEqtEnquiryHistoryOrder: KisServiceEqt.KisEquityEnquiryHistoryOrder,
  kisEquityEnquiryPortfolio: KisServiceEqt.KisEquityEnquiryPortfolio,
  kisEqtStockInfoOrderBook: KisServiceEqt.KisEquityStockInfoOrderBook,
  kisEqtAssetInfoOrderBook: KisServiceEqt.KisEquityAssetInfoOrderBook,
  kisEqtGenBuyAllOrderBook: KisServiceEqt.KisEquityGenBuyAllOrderBook,
  oddLotOrderDetails: KisServiceEqt.OddLotOrderDetails,
  oddLotModal: KisServiceEqt.OddLotModal,

  // Network connection
  showModalDisconnectNetwork: ShowModalDisconnectNetwork,

  //Dummy Modal
  showDummyModal: ShowDummyModal,

  // Bank transfer
  getBankInfo: BankTransfer.GetBankInfo,
  getCashTransactionHistory: BankTransfer.GetCashTransactionHistory,
  getGenFundTransfer: BankTransfer.GetGenFundTransfer,
  getSubAccountRetrieve: BankTransfer.GetSubAccountRetrieve,
  checkTradeDate: BankTransfer.CheckTradeDate,
  checkDoFundTransfer: BankTransfer.CheckDoFundTransfer,
  getDerCashStatement: BankTransfer.GetDerCashStatement,
  getEqtCashStatement: BankTransfer.GetEqtCashStatement,
  getDerClientCashBalanceShortver: BankTransfer.GetDerClientCashBalanceShortver,
  getDerCashDWEnquiry: BankTransfer.GetDerCashDWEnquiry,
  getBankInfoDer: BankTransfer.GetBankInfoDer,
  getKisDerCpCashDWEnquiry: BankTransfer.GetKisDerCpCashDWEnquiry,

  // Stock transfer
  getListInstrumentPortfolio: StockTransfer.GetListInstrumentPortfolio,
  getStockTransferHistory: StockTransfer.GetStockTransferHistory,
  checkDoStockTransfer: StockTransfer.CheckDoStockTransfer,
  checkStockTransferAvailable: StockTransfer.CheckStockTransferAvailable,

  // Port Folio
  screenPortfolio: PortFolio.screenPortfolio,

  derivativesPortfolioTableInTradeData: PortFolio.DerivativesPortfolioTableInTradeData,

  //Kis ForgotPw
  kisVerifyForgotPw: KisVerifyForgotPw.KisVerifyForgotPw,
  resetKisPassword: KisVerifyForgotPw.KisResetPassword,

  // Reducer based on user
  userBasedReducer: UserBasedReducer,

  //Biometric
  registerBiometricSuccessTrigger: RegisterBiometricSuccessTrigger,
  registerBiometricFailedTrigger: RegisterBiometricFailedTrigger,
  queryBiometricStatus: QueryBiometricStatus,
  temporarilyBiometricStatus: TemporarilyBiometricStatus,

  // NonLogin
  nonLoginModal: NonLoginModal,
  nonLoginRecentViewed: NonLoginRecentViewed,
  nonLoginWatchList: watchList.NonLoginWatchList,

  // S3 Resource
  holidays: ResourceFiles.Holidays,
  contests: ResourceFiles.Contests,
  banners: ResourceFiles.Banners,
  currentTime: ResourceFiles.CurrentTime,
  autoTradeAgreement: ResourceFiles.AutoTradeAgreement,
  autoTradePopup: ResourceFiles.AutoTradePopup,
  featureConfiguration: ResourceFiles.FeatureConfiguration,
  kisInfoModal: ResourceFiles.KisInfoModal,

  // Copy Trade
  copyTrade: CopyTradeRedux,

  // Reducer v2
  SymbolData: SymbolDataReducer,
  HotStock: HotStockReducer,
  Advisor: AdvisorReducer,

  //Derivatives
  maxBuySell: MaxBuySell,
  queryMaxBuySellSuccessTrigger: QueryMaxBuySellSuccessTrigger,
  derivativesPurchasingPower: DerivativesPurchasingPower,

  derivativePortfolio: DerivativePortfolio,

  // Kis Service Derivative
  kisDerEnquiryOrder: KisServiceDer.KisDerEnquiryOrder,
  kisDerEnquiryHistoryOrder: KisServiceDer.KisDerEnquiryHistoryOrder,
  kisDerEnquiryMaxLongShort: KisServiceDer.KisDerEnquiryMaxLongShort,

  // derivativeCashBalance: DerivativeCashBalance,
  kisDerAssetInformationData: KisServiceDer.KisDerAssetInformationData,
  kisDerEnquiryClientStockStatement: KisServiceDer.KisDerEnquiryClientStockStatement,
});

export type IState = ReturnType<typeof appReducer>;

export const rootReducer = (state: IState, action: IAction<unknown>) => {
  return appReducer(state, action);
};
