import { METHOD } from 'constants/method';
import config from 'config';
import { IAPI } from 'interfaces/common';
import { ERROR } from 'constants/error';

const APIList: IAPIkey = {
  symbolList: {
    uri: config.market.symbolUrl,
    useFullUri: true,
    method: METHOD.GET,
  },

  // Authentication
  login: {
    uri: '/login',
    method: METHOD.POST,
    authenticated: false,
    notShowAlert: true,
  },
  biometricRegister: {
    uri: '/biometricRegister',
    method: METHOD.POST,
    authenticated: true,
    notShowAlert: true,
  },
  biometricRegisterKis: {
    uri: '/biometricRegisterKis',
    method: METHOD.POST,
    authenticated: true,
    notShowAlert: true,
  },
  biometricUnregister: {
    uri: '/unregisterBiometric',
    method: METHOD.POST,
    authenticated: true,
  },
  queryBiometricStatus: {
    uri: '/queryBiometricStatus',
    method: METHOD.GET,
    authenticated: true,
  },
  loginSEC: {
    uri: '/login/partnerCredential',
    method: METHOD.POST,
    authenticated: false,
    notShowAlert: true,
  },
  loginSocial: {
    uri: '/login/social',
    method: METHOD.POST,
    notShowAlert: true,
    authenticated: false,
  },
  linkSocial: {
    uri: '/user/socialLinkAccount',
    method: METHOD.POST,
    authenticated: true,
  },
  unlinkSocial: {
    uri: '/user/socialLinkAccount',
    method: METHOD.DELETE,
    authenticated: true,
  },
  checkAvailablePassword: {
    uri: '/user/checkAvailablePassword',
    method: METHOD.GET,
    authenticated: true,
  },
  createPassword: {
    uri: '/user/createPassword',
    method: METHOD.POST,
    authenticated: true,
  },
  getLinkedAccounts: {
    uri: '/linkAccounts',
    method: METHOD.GET,
    authenticated: true,
  },
  refreshToken: {
    uri: '/refreshToken',
    method: METHOD.POST,
    authenticated: true,
    notShowAlertWithCodes: [ERROR.TOKEN_EXPIRED],
  },
  verifyOTP: {
    uri: '/otp/verify',
    method: METHOD.POST,
    notShowAlert: true,
    authenticated: false,
  },
  getOTP: {
    uri: '/otp',
    method: METHOD.POST,
    authenticated: false,
  },
  autoSignup: {
    uri: '/user/autoSignup',
    method: METHOD.POST,
    authenticated: false,
  },
  checkUserExist: {
    uri: '/user/checkExist',
    method: METHOD.POST,
    authenticated: false,
  },
  registerUser: {
    uri: '/user',
    method: METHOD.POST,
    authenticated: false,
  },
  changePassword: {
    uri: '/user/changePassword',
    method: METHOD.POST,
    authenticated: true,
    notShowAlertWithCodes: [ERROR.WRONG_PASSWORD_PAAVE],
  },
  changePIN: {
    uri: '/services/eqt/changePin',
    method: METHOD.POST,
    notShowAlert: true,
    authenticated: true,
  },
  resetPassword: {
    uri: '/user/resetPassword',
    method: METHOD.POST,
  },

  revokeToken: {
    uri: '/revokeToken',
    method: METHOD.POST,
    authenticated: true,
  },

  confirmUser: {
    uri: '/user/confirm',
    method: METHOD.POST,
    authenticated: true,
  },

  disableUser: {
    uri: '/user/disable',
    method: METHOD.POST,
    authenticated: true,
  },

  // Market
  symbolLatest: {
    uri: `${config.market.marketUrl}/symbol/latest`,
    method: METHOD.GET,
    useFullUri: true,
    authenticated: false,
  },

  vnindexReturn: {
    uri: `${config.market.marketUrl}/vnindexReturn`,
    method: METHOD.GET,
    useFullUri: true,
    authenticated: false,
  },

  tradingViewHistory: {
    uri: `${config.apiUrl.baseURI_V2}/tradingview/history`,
    method: METHOD.GET,
    useFullUri: true,
  },

  indexStockList: {
    uri: `${config.market.marketUrl}/index/stock/list`,
    method: METHOD.GET,
    useFullUri: true,
    authenticated: false,
  },

  symbolQuoteList: {
    uri: `${config.market.marketUrl}/symbol/{symbol}/quote`,
    method: METHOD.GET,
    useFullUri: true,
    authenticated: false,
  },

  symbolQuoteMinutes: {
    uri: `${config.market.marketUrl}/symbol/{symbol}/minuteChart`,
    method: METHOD.GET,
    useFullUri: true,
    authenticated: false,
  },

  symbolPeriodMas: {
    uri: `${config.market.marketUrl}/symbol/{symbol}/period/{periodType}`,
    method: METHOD.GET,
    useFullUri: true,
    authenticated: false,
  },

  lastTradingDate: {
    uri: `${config.market.marketUrl}/lastTradingDate`,
    method: METHOD.GET,
    useFullUri: true,
    authenticated: false,
  },

  IndexStockRankingUpDown: {
    uri: '/market/index/stock/ranking/upDown',
    method: METHOD.GET,
    authenticated: true,
  },
  indexSymbolPeriod: {
    uri: '/market/symbol/{symbol}/period/{periodType}',
    method: METHOD.GET,
    authenticated: true,
  },
  getIndexStockList: {
    uri: `${config.market.marketUrl}/indexStockList/{indexCode}`,
    method: METHOD.GET,
    useFullUri: true,
    authenticated: false,
  },
  indexSymbolForeigner: {
    uri: `${config.market.marketUrl}/symbol/{symbol}/foreigner`,
    method: METHOD.GET,
    useFullUri: true,
  },

  getProhibitedStock: {
    uri: '/equity/limitedStock',
    method: METHOD.GET,
    authenticated: true,
  },

  getMarketStatistic: {
    uri: `${config.market.marketUrl}/symbol/{symbol}/statistic`,
    method: METHOD.GET,
    authenticated: true,
    useFullUri: true,
  },

  //business
  equityBuyable: {
    uri: `/equity/account/buyable`,
    method: METHOD.GET,
    authenticated: true,
    needSubId: true, // 1890 - contest
  },

  equitySellable: {
    uri: `/equity/account/sellable`,
    method: METHOD.GET,
    authenticated: true,
    needSubId: true, // 1890 - contest
  },

  // Equity
  orderLO: {
    uri: '/equity/order',
    method: METHOD.POST,
    authenticated: true,
    needSubId: true, // 1890 - contest
  },

  orderStop: {
    uri: '/equity/order/stop',
    method: METHOD.POST,
    authenticated: true,
    needSubId: true, // 1890 - contest
  },

  orderStopKIS: {
    uri: '/stopOrder',
    method: METHOD.POST,
    authenticated: true,
    isKisForward: true,
    withOtpToken: true,
  },

  orderStopCancel: {
    uri: '/equity/order/stop/cancel',
    method: METHOD.PUT,
    authenticated: true,
  },

  orderStopCancelKIS: {
    uri: '/stopOrder/cancel',
    method: METHOD.PUT,
    authenticated: true,
    withOtpToken: true,
  },

  orderStopCancelMulti: {
    uri: '/equity/order/stop/cancel/multi',
    method: METHOD.PUT,
    authenticated: true,
  },

  orderStopCancelMultiKIS: {
    uri: '/stopOrder/cancel/multi',
    method: METHOD.PUT,
    authenticated: true,
    withOtpToken: true,
  },

  orderStopModify: {
    uri: '/equity/order/stop/modify',
    method: METHOD.PUT,
    authenticated: true,
  },

  orderStopModifyKIS: {
    uri: '/stopOrder/modify',
    method: METHOD.PUT,
    authenticated: true,
    withOtpToken: true,
  },

  modifyLO: {
    uri: '/equity/modify',
    method: METHOD.POST,
    authenticated: true,
  },

  cancelLO: {
    uri: '/equity/cancel',
    method: METHOD.POST,
    authenticated: true,
  },

  cancelMultiLO: {
    uri: '/equity/cancelMulti',
    method: METHOD.POST,
    authenticated: true,
  },

  getProfitLoss: {
    uri: '/equity/account/profitLoss',
    method: METHOD.GET,
    authenticated: true,
    needSubId: true, // 1890 - contest
  },

  getDailyProfitLoss: {
    uri: '/equity/account/dailyProfitLoss',
    method: METHOD.GET,
    authenticated: true,
    needSubId: true, // 1890 - contest
  },

  getRealizedProfitLoss: {
    uri: '/equity/account/realizedProfitLoss',
    method: METHOD.GET,
    authenticated: true,
    needSubId: true, // 1890 - contest
  },

  getMaxBuySell: {
    uri: '/services/fno/maxlongshortenquiry',
    method: METHOD.GET,
    authenticated: true,
  },

  getDerivativesPurchasingPower: {
    uri: '/services/fno/queryclientcashbalance',
    method: METHOD.GET,
    authenticated: true,
  },

  getCashBalanceAndStockBalanceForKis: {
    uri: '/services/eqt/assetInfoFromPortfolio',
    method: METHOD.GET,
    authenticated: true,
  },

  getAccountBalanceForKis: {
    uri: '/services/eqt/accountbalance',
    method: METHOD.GET,
    authenticated: true,
  },

  getLocalAdvanceCreation: {
    uri: '/services/eqt/getLocalAdvanceCreation',
    method: METHOD.GET,
    authenticated: true,
  },

  checkAdvancePaymentTime: {
    uri: '/services/eqt/checkAdvancePaymentTime',
    method: METHOD.GET,
    authenticated: true,
  },

  submitAdvancePaymentCreation: {
    uri: '/services/eqt/submitAdvancePaymentCreation',
    method: METHOD.POST,
    authenticated: true,
    withOtpToken: true,
  },

  getCashAdvanceHistory: {
    uri: '/services/eqt/getCashAdvanceHistory',
    method: METHOD.GET,
    authenticated: true,
  },

  getAllRightList: {
    uri: '/services/eqt/getAllRightList',
    method: METHOD.GET,
    authenticated: true,
  },

  getEntitlementHistory: {
    uri: '/services/eqt/getEntitlementHistory',
    method: METHOD.GET,
    authenticated: true,
  },

  getEntitlementStockList: {
    uri: '/services/eqt/getEntitlementStockList',
    method: METHOD.GET,
    authenticated: true,
  },

  registerExercise: {
    uri: '/services/eqt/doRegisterExercise',
    method: METHOD.POST,
    authenticated: true,
    withOtpToken: true,
  },

  getAdditionIssueShareInfo: {
    uri: '/services/eqt/getAdditionIssueShareInfo',
    method: METHOD.GET,
    authenticated: true,
  },

  getEnquirySignOrder: {
    uri: '/services/eqt/enquirysignorder',
    method: METHOD.GET,
    authenticated: true,
  },

  submitEnquirySignOrder: {
    uri: '/services/eqt/submitSignOrder',
    method: METHOD.POST,
    authenticated: true,
    withOtpToken: true,
  },

  getAccumulatedProfitLoss: {
    uri: '/equity/account/accumulativeProfitLoss',
    method: METHOD.GET,
    authenticated: true,
  },

  getKisAccumulatedProfitLoss: {
    uri: '/realTrading/kis/accumulativeProfitLoss',
    method: METHOD.GET,
    authenticated: true,
  },

  getFollowingAccumulatedProfitLoss: {
    uri: '/equity/account/followingAccumulativePL',
    method: METHOD.GET,
    authenticated: true,
  },

  getFollowingKisAccumulatedProfitLoss: {
    uri: '/realTrading/kis/followingAccProfitLoss',
    method: METHOD.GET,
    authenticated: true,
  },

  getDerCashStatement: {
    uri: '/services/fno/transactionhistory',
    method: METHOD.GET,
    authenticated: true,
  },

  getEqtCashStatement: {
    uri: '/services/eqt/queryCashTranHisReport',
    method: METHOD.GET,
    authenticated: true,
  },

  getOrderHistory: {
    uri: '/equity/order/history',
    method: METHOD.GET,
    authenticated: true,
    needSubId: true, // 1890 - contest
  },

  getOrderStopHistory: {
    uri: '/equity/order/stop/history',
    method: METHOD.GET,
    authenticated: true,
    needSubId: true, // 1890 - contest
  },

  getOrderStopHistoryKIS: {
    uri: '/stopOrder/history',
    method: METHOD.GET,
    authenticated: true,
    withOtpToken: true,
  },

  getFollowingProfitLoss: {
    uri: '/equity/account/followingProfitLoss',
    method: METHOD.GET,
    authenticated: true,
  },

  getFollowingProfitLossKis: {
    uri: '/real-trading/kis/followingProfitLoss',
    method: METHOD.GET,
    authenticated: true,
    notShowAlert: true,
  },

  getFollowingDailyProfitLoss: {
    uri: '/equity/account/followingDailyProfitLoss',
    method: METHOD.GET,
    authenticated: true,
  },

  getFollowingDailyProfitLossKis: {
    uri: '/real-trading/kis/followingDailyProfitLoss',
    method: METHOD.GET,
    authenticated: true,
    notShowAlert: true,
  },

  getMostBoughtStock: {
    uri: '/equity/order/mostBoughtStock',
    method: METHOD.GET,
    authenticated: true,
  },

  // Event Stock
  getEventByStock: {
    uri: '/equity/event/getEventByStock',
    method: METHOD.GET,
    authenticated: true,
  },

  getMostSoldStock: {
    uri: '/equity/order/mostSoldStock',
    method: METHOD.GET,
    authenticated: true,
  },

  // Stock Sector
  getCompanyOverview: {
    uri: '/stockSector/companyOverview',
    method: METHOD.GET,
    authenticated: true,
  },

  getFinanceStatement: {
    uri: '/finance/statement',
    method: METHOD.GET,
    authenticated: true,
  },

  // search
  getMostSearchedStock: {
    uri: '/search/ranking',
    method: METHOD.GET,
    authenticated: true,
  },

  putIncrease: {
    uri: '/search/increase',
    method: METHOD.PUT,
    authenticated: true,
  },

  getKisDerEnquiryOrder: {
    uri: '/services/fno/orderenquiry',
    method: METHOD.GET,
    authenticated: true,
  },

  getKisDerEnquiryHistoryOrder: {
    uri: '/services/fno/orderenquiryhistory',
    method: METHOD.GET,
    authenticated: true,
  },

  putKisDerCancelOrder: {
    uri: '/services/fno/cancelorder',
    method: METHOD.PUT,
    authenticated: true,
  },

  putKisDerModifyOrder: {
    uri: '/services/fno/modifyorder',
    method: METHOD.PUT,
    authenticated: true,
  },

  getKisDerMaxLongShortEnquiry: {
    uri: '/services/fno/maxlongshortenquiry',
    method: METHOD.GET,
    authenticated: true,
  },

  putSearchUpdateHistory: {
    uri: '/search/updateHistory',
    method: METHOD.PUT,
    authenticated: true,
  },

  updateHistoryAccount: {
    uri: '/search/updateHistoryAccount',
    method: METHOD.PUT,
    authenticated: true,
  },

  getSearchUserInfo: {
    uri: '/user/searchUser',
    method: METHOD.GET,
    authenticated: true,
  },

  getSearchRecentViewed: {
    uri: '/search/recentViewed',
    method: METHOD.GET,
    authenticated: true,
  },

  putDeleteUpdateHistory: {
    uri: '/search/deleteHistory',
    method: METHOD.PUT,
    authenticated: true,
  },

  getSubAccountOfSearchUser: {
    uri: '/virtualCore/following/{followingUserId}/subAccounts',
    method: METHOD.GET,
    authenticated: true,
  },

  //favorite
  createWatchlist: {
    uri: '/favorite/watchlist',
    method: METHOD.POST,
    authenticated: true,
  },

  getAllWatchlist: {
    uri: '/account/watchlist',
    method: METHOD.GET,
    authenticated: true,
  },

  modifyWatchlist: {
    uri: '/favorite/watchlist/modify',
    method: METHOD.PUT,
    authenticated: true,
  },
  deleteWatchlist: {
    uri: '/favorite/watchlist/delete',
    method: METHOD.DELETE,
    authenticated: true,
  },
  getAllFavoriteSymbol: {
    uri: '/favorite/symbol/queryAll',
    method: METHOD.GET,
    authenticated: true,
  },

  addFavoriteSymbol: {
    uri: '/favorite/symbol',
    method: METHOD.POST,
    authenticated: true,
    notShowAlertWithCodes: [ERROR.WATCHLIST_50_SYMBOL_MAX],
  },

  deleteFavoriteSymbol: {
    uri: '/favorite/symbol/delete',
    method: METHOD.DELETE,
    authenticated: true,
    useBodyOnDeleteMethod: true,
  },

  getSymbolIncludeWatchlist: {
    uri: '/favorite/symbol/include',
    method: METHOD.GET,
    authenticated: true,
  },

  // kis-favorite

  getKisFavorite: {
    uri: '/favorite',
    method: METHOD.GET,
    authenticated: true,
  },

  putKisFavorite: {
    uri: '/favorite',
    method: METHOD.PUT,
    authenticated: true,
  },

  postKisFavorite: {
    uri: '/favorite',
    method: METHOD.POST,
    authenticated: true,
  },

  deleteKisFavorite: {
    uri: '/favorite',
    method: METHOD.DELETE,
    authenticated: true,
  },

  //news
  news: {
    uri: '/news',
    method: METHOD.GET,
    authenticated: true,
  },

  // Notification
  accountNotification: {
    uri: '/account/notification',
    method: METHOD.GET,
    authenticated: true,
  },

  NotificationMarkAsRead: {
    uri: '/notification/markAsRead',
    method: METHOD.PUT,
    authenticated: true,
  },

  NotificationDelete: {
    uri: '/notification/deleteNoti',
    method: METHOD.PUT,
    authenticated: true,
  },

  NotificationNumberGetOfUnread: {
    uri: '/notification/numberOfUnreadNoti',
    method: METHOD.GET,
    authenticated: true,
  },

  //PROFILE
  getTradingHistory: {
    uri: '/profile/tradingHistory',
    method: METHOD.GET,
    authenticated: true,
  },

  // LeaderBoard
  leaderBoardInvesting: {
    uri: '/leaderboard/investing',
    method: METHOD.GET,
    authenticated: true,
  },
  realLeaderBoardInvesting: {
    uri: '/real-trading/kis/leaderboard/investing',
    method: METHOD.GET,
    authenticated: true,
  },

  leaderBoardInvestingUserRanking: {
    uri: '/leaderboard/investing/userRanking',
    method: METHOD.GET,
    authenticated: true,
  },

  leaderBoardContestAccountRegistered: {
    uri: '/virtualCore/subAccounts',
    method: METHOD.GET,
    authenticated: true,
  },

  leaderBoardSetting: {
    uri: '/real-trading/kis/leaderboard/settings',
    method: METHOD.GET,
    authenticated: true,
  },

  changeLeaderBoardSetting: {
    uri: '/real-trading/kis/leaderboard/settings',
    method: METHOD.PUT,
    authenticated: true,
  },

  // 1890 - contest
  leaderBoardVirtualCoreContest: {
    uri: '/virtualCore/contests',
    method: METHOD.GET,
    authenticated: true,
  },
  leaderBoardVirtualCoreContestRanking: {
    uri: '/virtualCore/contests/{contestId}/ranking',
    method: METHOD.GET,
    authenticated: true,
  },
  leaderBoardCurrentInvestingInfo: {
    uri: '/leaderboard/currentInvestingInfo',
    method: METHOD.GET,
    authenticated: true,
  },
  realLeaderBoardCurrentInvestingInfo: {
    uri: '/real-trading/kis/leaderboard/investing/userRanking',
    method: METHOD.GET,
    authenticated: true,
  },
  leaderBoardJoinNow: {
    uri: '/virtualCore/contests/{contestId}/join',
    method: METHOD.POST,
    authenticated: true,
  },
  leaderBoardVirtualCoreContestListed: {
    uri: '/virtualCore/contests/listed',
    method: METHOD.GET,
    authenticated: true,
  },
  leaderBoardVirtualCoreContestCurrentRanking: {
    uri: '/virtualCore/contests/{contestId}/currentRanking',
    method: METHOD.GET,
    authenticated: true,
  },

  // GET AIRating
  getAIRating: {
    uri: `${config.AIRatingUrl}/top-ai-rating/find`,
    useFullUri: true,
    method: METHOD.POST,
    authenticated: false,
  },

  // IN OUT AI screen
  inOutAIRating: {
    uri: `${config.AIRatingUrl}/top-ai-rating/getInOut`,
    useFullUri: true,
    method: METHOD.POST,
  },

  // Rank
  getIndexRank: {
    uri: '/index/rank',
    method: METHOD.GET,
    authenticated: true,
  },
  // data chart AIRating screen
  chartRatingData: {
    uri: `${config.AIRatingUrl}/rating-performances/find`,
    useFullUri: true,
    method: METHOD.POST,
    authenticated: false,
  },

  //USER
  getUserInfo: {
    uri: '/user/accountInfo',
    method: METHOD.GET,
    authenticated: true,
  },

  updateFullname: {
    uri: '/user/updateFullname',
    method: METHOD.PUT,
    authenticated: true,
  },
  updateUsername: {
    uri: '/user/updateUsername',
    method: METHOD.PUT,
    authenticated: true,
  },
  updateEmail: {
    uri: '/user/updateEmail',
    method: METHOD.PUT,
    authenticated: true,
  },

  putUserBio: {
    uri: '/user/bio',
    method: METHOD.PUT,
    authenticated: true,
  },

  getAllPartner: {
    uri: '/partners',
    method: METHOD.GET,
    authenticated: true,
  },

  linkAccountKisInit: {
    uri: `/linkAccounts/init`,
    method: METHOD.POST,
    authenticated: true,
  },

  kisVerifyAndSaveOTP: {
    uri: `/verifyAndSaveOTP`,
    method: METHOD.POST,
    authenticated: true,
  },

  notifyKisMobileOTP: {
    uri: `/linkAccounts/notifyOtpPartner`,
    method: METHOD.POST,
    authenticated: true,
  },

  linkAccounts: {
    uri: `/linkAccounts`,
    method: METHOD.POST,
    authenticated: true,
  },

  linkAccountsLogin: {
    uri: `/linkAccounts/login`,
    method: METHOD.POST,
    authenticated: true,
  },

  generateNewKisCard: {
    uri: `/auth/matrix/genNewKisCard`,
    method: METHOD.POST,
    authenticated: true,
  },

  //finance
  getFinanceBusiness: {
    uri: '/finance/performanceReport',
    method: METHOD.GET,
    authenticated: true,
  },

  getFinancialRatio: {
    uri: '/finance/financialRatio/latest',
    method: METHOD.GET,
    authenticated: true,
  },

  getFinancialRatioRanking: {
    uri: '/finance/financialRatio/ranking',
    method: METHOD.GET,
    authenticated: true,
  },

  getForeignTrade: {
    uri: '/report/trade-foreign',
    method: METHOD.GET,
    authenticated: true,
    notShowAlert: true, // Remove not show alert when api ready for non login user
  },

  quarterYearFinancialRatio: {
    uri: '/finance/financialRatio/valuation/period',
    method: METHOD.GET,
    authenticated: true,
  },

  financialRatioQuarterly: {
    uri: '/finance/financialRatio/profit/quarterly',
    method: METHOD.GET,
    authenticated: true,
  },

  financialRatioYearly: {
    uri: '/finance/financialRatio/profit/yearly',
    method: METHOD.GET,
    authenticated: true,
  },

  // Real trading
  getKisProfitLoss: {
    uri: '/real-trading/kis/profitLoss',
    method: METHOD.GET,
    authenticated: true,
  },

  getKisClientPortfolio: {
    uri: '/services/fno/clientportfolio',
    method: METHOD.GET,
    authenticated: true,
  },

  getMostBoughtStockForKis: {
    uri: '/real-trading/kis/mostBoughtStocks',
    method: METHOD.GET,
    authenticated: true,
  },

  getMostSoldStockForKis: {
    uri: '/real-trading/kis/mostSoldStocks',
    method: METHOD.GET,
    authenticated: true,
  },

  getDailyProfitLossForKis: {
    uri: '/real-trading/kis/dailyProfitLoss',
    method: METHOD.GET,
    authenticated: true,
  },

  getDerDailyProfitLossForKis: {
    uri: '/real-trading/kis/dr/dailyProfitLoss',
    method: METHOD.GET,
    authenticated: true,
  },

  getMostSearchedStockForKis: {
    uri: '/real-trading/kis/mostSearchedStocks',
    method: METHOD.GET,
    authenticated: true,
  },

  putIncreaseForKis: {
    uri: '/real-trading/kis/search/increase',
    method: METHOD.PUT,
    authenticated: true,
  },

  postKisForwardEqtEnterOrder: {
    uri: '/eqt/order',
    method: METHOD.POST,
    authenticated: true,
    isKisForward: true,
    withOtpToken: true,
  },

  postKisForwardDerEnterOrder: {
    uri: '/dr/order',
    method: METHOD.POST,
    authenticated: true,
    isKisForward: true,
    withOtpToken: true,
  },

  // Services
  postKisEqtEnterOrder: {
    uri: '/services/eqt/enterorder',
    method: METHOD.POST,
    authenticated: true,
  },

  getKisUserInfo: {
    uri: '/services/eqt/getclientdetail',
    method: METHOD.GET,
    authenticated: true,
  },

  putKisModifyEqtOrder: {
    uri: '/services/eqt/modifyOrder',
    method: METHOD.PUT,
    authenticated: true,
    withOtpToken: true,
  },

  getKisEqtStockInfo: {
    uri: '/services/eqt/stockInfo',
    method: METHOD.GET,
    authenticated: true,
  },
  getKisEqtAssetInfoFromPortfolio: {
    uri: '/services/eqt/assetInfoFromPortfolio',
    method: METHOD.GET,
    authenticated: true,
  },
  getKisEqtGenBuyAll: {
    uri: '/services/eqt/genbuyall',
    method: METHOD.GET,
    authenticated: true,
  },
  getKisEqtEnquiryOrder: {
    uri: '/services/eqt/enquiryorder',
    method: METHOD.GET,
    authenticated: true,
  },
  getKisEqtEnquiryHistoryOrder: {
    uri: '/services/eqt/enquiryhistoryorder',
    method: METHOD.GET,
    authenticated: true,
  },
  putKisEqtCancelOrder: {
    uri: '/services/eqt/cancelOrder',
    method: METHOD.PUT,
    authenticated: true,
  },
  getKisEqtEquityPortfolio: {
    uri: '/services/eqt/enquiryportfolio',
    method: METHOD.GET,
    authenticated: true,
  },
  putKisEqtChangepassword: {
    uri: '/services/eqt/changepassword',
    method: METHOD.PUT,
    authenticated: true,
    notShowAlertWithCodes: [ERROR.WRONG_PASSWORD_KIS],
  },

  // api for bank transfer flow der
  postKisDerCashTransfer: {
    uri: '/services/fno/cashtransfer',
    method: METHOD.POST,
    authenticated: true,
    withOtpToken: true,
  },
  getKisDerClientBalanceShortver: {
    uri: '/services/fno/clientcashbalanceshortver',
    method: METHOD.GET,
    authenticated: true,
  },
  getKisDerCashDWEnquiry: {
    uri: '/services/fno/cashDWenquiry',
    method: METHOD.GET,
    authenticated: true,
  },
  postKisDerCpCashDW: {
    uri: '/services/fno/cpcashDW',
    method: METHOD.POST,
    authenticated: true,
    withOtpToken: true,
  },
  postKisDerCashDW: {
    uri: '/services/fno/cashDW',
    method: METHOD.POST,
    authenticated: true,
    withOtpToken: true,
  },
  getKisDerCpCashDWEnquiry: {
    uri: '/services/fno/cpcashDWenquiry',
    method: METHOD.GET,
    authenticated: true,
  },
  getKisDerQueryBankInfo: {
    uri: '/services/fno/queryBankInfo',
    method: METHOD.GET,
    authenticated: true,
  },

  // api for bank transfer flow eqt
  getKisEqtQueryBankInfo: {
    uri: '/services/eqt/queryBankInfo',
    method: METHOD.GET,
    authenticated: true,
  },
  getKisEqtGenFundTransfer: {
    uri: '/services/eqt/genfundtransfer',
    method: METHOD.GET,
    authenticated: true,
  },
  getKisSubAccountRetrieve: {
    uri: '/subaccount/retrieve',
    method: METHOD.GET,
    authenticated: true,
  },
  postKisEqtDoFundTransfer: {
    uri: '/services/eqt/dofundtransfer',
    method: METHOD.POST,
    authenticated: true,
    withOtpToken: true,
  },
  getKisTradeDate: {
    uri: '/tradedate',
    method: METHOD.GET,
    authenticated: true,
  },
  getKisEqtHksCashTransactionHistory: {
    uri: '/services/eqt/hksCashTransactionHistory',
    method: METHOD.GET,
    authenticated: true,
  },

  // stock transfer flow
  getListInstrumentPortfolio: {
    uri: '/services/eqt/listInstrumenPortfolio',
    method: METHOD.GET,
    authenticated: true,
  },
  postDoStockTransfer: {
    uri: '/services/eqt/instrumentDW',
    method: METHOD.POST,
    authenticated: true,
    withOtpToken: true,
  },
  getStockTransferHistory: {
    uri: '/services/eqt/enquiryInstrumentDW',
    method: METHOD.GET,
    authenticated: true,
  },
  getTimeStockTransferAvailable: {
    uri: '/services/eqt/checkFundTransferTime',
    method: METHOD.GET,
    authenticated: true,
  },

  getMatrixKeyToResetKisPw: {
    uri: '/resetPassword/verifyIdentity',
    method: METHOD.POST,
    authenticated: false,
  },

  resetKisPassword: {
    uri: '/resetPassword',
    method: METHOD.POST,
    authenticated: false,
  },

  // Copy Trade
  getCopyTradeSubscription: {
    uri: '/real-trading/copy-trading/user-info',
    method: METHOD.GET,
    authenticated: true,
    notShowAlertWithCodes: [
      ERROR.ACCOUNT_HAS_NOT_BEEN_LINKED_YET,
      ERROR.SUBACCOUNT_HAS_BEEN_UNSUBSCRIBED_BEFORE,
      ERROR.SUBACCOUNT_HAS_NOT_BEEN_SUBSCRIBED_BEFORE,
    ],
  },
  subscribeCopyTrade: {
    uri: '/real-trading/copy-trading/subscribe',
    method: METHOD.POST,
    authenticated: true,
    notShowAlertWithCodes: [ERROR.INVALID_ACCOUNT_PIN],
  },
  editCopyTradeSubscription: {
    uri: '/real-trading/copy-trading/subscribe',
    method: METHOD.PUT,
    authenticated: true,
    notShowAlertWithCodes: [ERROR.INVALID_ACCOUNT_PIN],
  },
  unsubscribeCopyTrade: {
    uri: '/real-trading/copy-trading/subscribe',
    method: METHOD.DELETE,
    authenticated: true,
  },

  // Kis Derivative Portfolio
  getClientStockStatementEnquiry: {
    uri: '/services/fno/clientstockstatementenquiry',
    method: METHOD.GET,
    authenticated: true,
  },

  // Feedback
  postNewFeedback: {
    uri: '/feedbacks',
    method: METHOD.POST,
  },

  // call sms to kis mobile number owner
  postCallSmsToKisMobileNumberOwner: {
    uri: '/notifyMobileOtpKisTtl',
    method: METHOD.POST,
    authenticated: true,
    isKisForward: true,
  },

  // Advisor
  getAdvisorPerformance: {
    uri: '/virtualCore/periodicProfitLoss',
    method: METHOD.GET,
    authenticated: true,
  },
  getAdvisorChartData: {
    uri: '/virtualCore/account/oneMonthNormalizedNAV',
    method: METHOD.GET,
    authenticated: true,
  },
  getAdvisorTotalViews: {
    uri: '/search/accountTotalViews',
    method: METHOD.GET,
    authenticated: true,
    notShowAlertWithCodes: [ERROR.USER_ACCOUNT_INVALID],
  },
  getFollowingAdvisor: {
    uri: '/account/followingAccounts',
    method: METHOD.GET,
    authenticated: true,
  },
  followAdvisor: {
    uri: '/account/follow',
    method: METHOD.POST,
    authenticated: true,
    notShowAlertWithCodes: [ERROR.FOLLOWED_ID_IS_BEING_FOLLOWED],
  },
  unFollowAdvisor: {
    uri: '/account/follow',
    method: METHOD.DELETE,
    authenticated: true,
    notShowAlertWithCodes: [ERROR.ACCOUNT_NOT_IN_FOLLOWING_LIST],
  },

  // Stock Theme
  getThemeList: {
    uri: '/stockSector/theme/list',
    method: METHOD.GET,
    authenticated: true,
  },
  getThemeStockList: {
    uri: '/stockSector/theme/stockList',
    method: METHOD.GET,
    authenticated: true,
  },
  getStockThemeList: {
    uri: '/stockSector/theme/list/{symbol}',
    method: METHOD.GET,
    authenticated: true,
  },
  getThemeStockRatio: {
    uri: '/stockSector/theme/stock',
    method: METHOD.GET,
    authenticated: true,
  },

  // Foreign Trading
  getForeignTrading: {
    uri: `${config.market.marketUrl}/topForeignerTrading`,
    method: METHOD.GET,
    useFullUri: true,
    authenticated: false,
  },

  //News
  getNews: {
    uri: '/news',
    method: METHOD.GET,
    authenticated: true,
  },
  getVideos: {
    uri: `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&part=id&part=snippet&part=status&maxResults=6&playlistId={playListId}&key={apiKey}&pageToken={pageToken}`,
    method: METHOD.GET,
    useFullUri: true,
    authenticated: false,
  },
  sendNotificationPreference: {
    uri: '/account/notificationPreference',
    method: METHOD.POST,
    authenticated: true,
    notShowAlert: true,
  },
  getNewsFeed: {
    uri: `${config.apiUrl.domainSocial}/timelines/public`,
    method: METHOD.GET,
    authenticated: true,
    useFullUri: true,
    noCache: true,
  },
  getNewsFeedByHashtag: {
    uri: `${config.apiUrl.domainSocial}/timelines/tag/{hashtag}`,
    method: METHOD.GET,
    authenticated: true,
    useFullUri: true,
    noCache: true,
  },
  favouritesNews: {
    uri: `${config.apiUrl.domainSocial}/statuses/{postId}/favourite`,
    method: METHOD.POST,
    authenticated: true,
    useFullUri: true,
  },
  unfavouritesNews: {
    uri: `${config.apiUrl.domainSocial}/statuses/{postId}/unfavourite`,
    method: METHOD.POST,
    authenticated: true,
    useFullUri: true,
  },
  getPostDetail: {
    uri: `${config.apiUrl.domainSocial}/statuses/{postId}`,
    method: METHOD.GET,
    authenticated: true,
    useFullUri: true,
    noCache: true,
  },
  getCommentsOfPost: {
    uri: `${config.apiUrl.domainSocial}/statuses/{postId}/context`,
    method: METHOD.GET,
    authenticated: true,
    useFullUri: true,
    noCache: true,
  },
  getSocialAccountInfo: {
    uri: `${config.apiUrl.domainSocial}/accounts/verify_credentials`,
    method: METHOD.GET,
    authenticated: true,
    useFullUri: true,
  },
  updateSocialAccountInfo: {
    uri: `${config.apiUrl.domainSocial}/accounts/update_credentials`,
    method: METHOD.PATCH,
    authenticated: true,
    useFullUri: true,
    useFormData: true,
  },
  getSocialAccountInfoById: {
    uri: `${config.apiUrl.domainSocial}/accounts/{userId}`,
    method: METHOD.GET,
    authenticated: true,
    useFullUri: true,
  },
  blockSocialUser: {
    uri: `${config.apiUrl.domainSocial}/accounts/{account_id}/block`,
    method: METHOD.POST,
    authenticated: true,
    useFullUri: true,
  },
  reportSocialUser: {
    uri: `${config.apiUrl.domainSocial}/reports`,
    method: METHOD.POST,
    authenticated: true,
    useFullUri: true,
  },
  createPost: {
    uri: `${config.apiUrl.domainSocial}/statuses`,
    method: METHOD.POST,
    authenticated: true,
    useFullUri: true,
  },
  editPost: {
    uri: `${config.apiUrl.domainSocial}/statuses/{statusID}`,
    method: METHOD.PUT,
    authenticated: true,
    useFullUri: true,
  },
  deletePost: {
    uri: `${config.apiUrl.domainSocial}/statuses/{statusID}`,
    method: METHOD.DELETE,
    authenticated: true,
    useFullUri: true,
  },
  editMedia: {
    uri: `${config.apiUrl.domainSocial}/media/{id}`,
    method: METHOD.PUT,
    authenticated: true,
    useFullUri: true,
  },
  getAccessSocial: {
    uri: `${config.apiUrl.domainSocial}/user/social/access`,
    method: METHOD.GET,
    authenticated: true,
    useFullUri: true,
  },
  getLikedList: {
    uri: `${config.apiUrl.domainSocial}//statuses/{postId}/favourited_by`,
    method: METHOD.GET,
    authenticated: true,
    useFullUri: true,
  },
  reblogPost: {
    uri: `${config.apiUrl.domainSocial}/statuses/{postId}/reblog`,
    method: METHOD.GET,
    authenticated: true,
    useFullUri: true,
  },
  unReblogPost: {
    uri: `${config.apiUrl.domainSocial}/statuses/{postId}/unreblog`,
    method: METHOD.GET,
    authenticated: true,
    useFullUri: true,
  },
  socialSearch: {
    uri: `${config.apiUrl.domainSocialV2}/search`,
    method: METHOD.GET,
    authenticated: true,
    useFullUri: true,
  },
  votePoll: {
    uri: `${config.apiUrl.domainSocial}/polls/{pollId}/votes`,
    method: METHOD.POST,
    authenticated: true,
    useFullUri: true,
  },
};

interface IAPIkey {
  symbolList: IAPI;
  // Authentication
  login: IAPI;
  biometricRegister: IAPI;
  biometricRegisterKis: IAPI;
  biometricUnregister: IAPI;
  queryBiometricStatus: IAPI;
  loginSEC: IAPI;
  loginSocial: IAPI;
  linkSocial: IAPI;
  unlinkSocial: IAPI;
  checkAvailablePassword: IAPI;
  createPassword: IAPI;
  refreshToken: IAPI;
  verifyOTP: IAPI;
  getOTP: IAPI;
  autoSignup: IAPI;
  checkUserExist: IAPI;
  registerUser: IAPI;
  changePassword: IAPI;
  changePIN: IAPI;
  resetPassword: IAPI;
  updateFullname: IAPI;
  updateUsername: IAPI;
  updateEmail: IAPI;
  revokeToken: IAPI;

  // Market
  symbolLatest: IAPI;
  vnindexReturn: IAPI;
  tradingViewHistory: IAPI;
  indexStockList: IAPI;
  symbolQuoteList: IAPI;
  symbolQuoteMinutes: IAPI;
  symbolPeriodMas: IAPI;
  equityBuyable: IAPI;
  equitySellable: IAPI;
  IndexStockRankingUpDown: IAPI;
  indexSymbolPeriod: IAPI;
  lastTradingDate: IAPI;
  getIndexStockList: IAPI;
  indexSymbolForeigner: IAPI;
  getProhibitedStock: IAPI;
  getMarketStatistic: IAPI;

  // Equity
  orderLO: IAPI;
  orderStop: IAPI;
  orderStopKIS: IAPI;
  orderStopCancel: IAPI;
  orderStopCancelKIS: IAPI;
  orderStopModify: IAPI;
  orderStopModifyKIS: IAPI;
  orderStopCancelMulti: IAPI;
  orderStopCancelMultiKIS: IAPI;
  modifyLO: IAPI;
  cancelLO: IAPI;
  cancelMultiLO: IAPI;
  getProfitLoss: IAPI;
  getDailyProfitLoss: IAPI;
  getDailyProfitLossForKis: IAPI;
  getRealizedProfitLoss: IAPI;
  getMaxBuySell: IAPI;
  getDerivativesPurchasingPower: IAPI;
  getCashBalanceAndStockBalanceForKis: IAPI;
  getOrderHistory: IAPI;
  getOrderStopHistory: IAPI;
  getOrderStopHistoryKIS: IAPI;
  getFollowingProfitLoss: IAPI;
  getFollowingProfitLossKis: IAPI;
  getFollowingDailyProfitLoss: IAPI;
  getFollowingDailyProfitLossKis: IAPI;
  getMostBoughtStock: IAPI;
  getMostBoughtStockForKis: IAPI;
  getMostSoldStock: IAPI;
  getMostSoldStockForKis: IAPI;
  getEventByStock: IAPI;
  getAccountBalanceForKis: IAPI;
  getLocalAdvanceCreation: IAPI;
  checkAdvancePaymentTime: IAPI;
  submitAdvancePaymentCreation: IAPI;
  getCashAdvanceHistory: IAPI;
  getAllRightList: IAPI;
  getEntitlementHistory: IAPI;
  getEntitlementStockList: IAPI;
  registerExercise: IAPI;
  getAdditionIssueShareInfo: IAPI;
  getEnquirySignOrder: IAPI;
  submitEnquirySignOrder: IAPI;
  getAccumulatedProfitLoss: IAPI;
  getKisAccumulatedProfitLoss: IAPI;
  getFollowingAccumulatedProfitLoss: IAPI;
  getFollowingKisAccumulatedProfitLoss: IAPI;

  //favorite
  createWatchlist: IAPI;
  getAllWatchlist: IAPI;
  modifyWatchlist: IAPI;
  deleteWatchlist: IAPI;
  getAllFavoriteSymbol: IAPI;
  addFavoriteSymbol: IAPI;
  deleteFavoriteSymbol: IAPI;
  getSymbolIncludeWatchlist: IAPI;

  // kis-favorite
  getKisFavorite: IAPI;
  putKisFavorite: IAPI;
  postKisFavorite: IAPI;
  deleteKisFavorite: IAPI;

  //news
  news: IAPI;

  // Notifications
  accountNotification: IAPI;
  NotificationMarkAsRead: IAPI;
  NotificationDelete: IAPI;
  NotificationNumberGetOfUnread: IAPI;

  // Leader Board
  leaderBoardInvesting: IAPI;
  realLeaderBoardInvesting: IAPI;
  leaderBoardInvestingUserRanking: IAPI;
  leaderBoardVirtualCoreContest: IAPI;
  leaderBoardVirtualCoreContestRanking: IAPI;
  leaderBoardCurrentInvestingInfo: IAPI;
  realLeaderBoardCurrentInvestingInfo: IAPI;
  leaderBoardContestAccountRegistered: IAPI;
  leaderBoardJoinNow: IAPI;
  leaderBoardVirtualCoreContestListed: IAPI;
  leaderBoardVirtualCoreContestCurrentRanking: IAPI;
  leaderBoardSetting: IAPI;
  changeLeaderBoardSetting: IAPI;

  //PROFILE
  getTradingHistory: IAPI;

  // SEARCH
  getMostSearchedStock: IAPI;
  getMostSearchedStockForKis: IAPI;
  putIncrease: IAPI;
  putIncreaseForKis: IAPI;

  putSearchUpdateHistory: IAPI;
  updateHistoryAccount: IAPI;
  getSearchUserInfo: IAPI;
  getSearchRecentViewed: IAPI;
  putDeleteUpdateHistory: IAPI;
  getSubAccountOfSearchUser: IAPI;

  // AIRating
  getAIRating: IAPI;
  inOutAIRating: IAPI;

  // Rank
  getIndexRank: IAPI;
  chartRatingData: IAPI;

  // Stock Sector
  getCompanyOverview: IAPI;

  getFinanceStatement: IAPI;

  //USER
  getUserInfo: IAPI;
  putUserBio: IAPI;
  confirmUser: IAPI;
  disableUser: IAPI;
  getAllPartner: IAPI;
  linkAccountKisInit: IAPI;
  kisVerifyAndSaveOTP: IAPI;
  notifyKisMobileOTP: IAPI;
  linkAccounts: IAPI;
  getLinkedAccounts: IAPI;
  linkAccountsLogin: IAPI;
  generateNewKisCard: IAPI;

  // finance
  getFinanceBusiness: IAPI;
  getFinancialRatio: IAPI;
  getFinancialRatioRanking: IAPI;
  getForeignTrade: IAPI;
  quarterYearFinancialRatio: IAPI;
  financialRatioQuarterly: IAPI;
  financialRatioYearly: IAPI;

  // Real trading
  getKisProfitLoss: IAPI;
  getKisClientPortfolio: IAPI;
  postKisForwardEqtEnterOrder: IAPI;
  postKisForwardDerEnterOrder: IAPI;

  // Services
  postKisEqtEnterOrder: IAPI;
  getKisUserInfo: IAPI;
  putKisModifyEqtOrder: IAPI;
  getKisEqtStockInfo: IAPI;
  getKisEqtAssetInfoFromPortfolio: IAPI;
  getKisEqtGenBuyAll: IAPI;
  getKisEqtEnquiryOrder: IAPI;
  getKisEqtEnquiryHistoryOrder: IAPI;
  putKisEqtCancelOrder: IAPI;
  getKisEqtEquityPortfolio: IAPI;
  putKisEqtChangepassword: IAPI;

  // bank transfer eqt
  getKisEqtQueryBankInfo: IAPI;
  getKisEqtGenFundTransfer: IAPI;
  getKisSubAccountRetrieve: IAPI;
  postKisEqtDoFundTransfer: IAPI;
  getKisTradeDate: IAPI;
  getKisEqtHksCashTransactionHistory: IAPI;
  getDerCashStatement: IAPI;
  getEqtCashStatement: IAPI;

  // bank transfer Der
  postKisDerCashTransfer: IAPI;
  getKisDerClientBalanceShortver: IAPI;
  getKisDerCashDWEnquiry: IAPI;
  postKisDerCpCashDW: IAPI;
  postKisDerCashDW: IAPI;
  getKisDerCpCashDWEnquiry: IAPI;
  getKisDerQueryBankInfo: IAPI;

  // stock transfer
  getListInstrumentPortfolio: IAPI;
  postDoStockTransfer: IAPI;
  getStockTransferHistory: IAPI;
  getTimeStockTransferAvailable: IAPI;

  //Kis verify forgot password
  getMatrixKeyToResetKisPw: IAPI;
  resetKisPassword: IAPI;

  // Copy Trade
  getCopyTradeSubscription: IAPI;
  subscribeCopyTrade: IAPI;
  editCopyTradeSubscription: IAPI;
  unsubscribeCopyTrade: IAPI;

  // Feedback
  postNewFeedback: IAPI;

  // Kis Derivative Orderbook
  getKisDerEnquiryOrder: IAPI;
  getKisDerEnquiryHistoryOrder: IAPI;
  putKisDerCancelOrder: IAPI;
  putKisDerModifyOrder: IAPI;
  getKisDerMaxLongShortEnquiry: IAPI;

  // Kis Derivative Portfolio
  getClientStockStatementEnquiry: IAPI;
  getDerDailyProfitLossForKis: IAPI;

  postCallSmsToKisMobileNumberOwner: IAPI;

  // Advisor
  getAdvisorPerformance: IAPI;
  getAdvisorChartData: IAPI;
  getAdvisorTotalViews: IAPI;
  getFollowingAdvisor: IAPI;
  followAdvisor: IAPI;
  unFollowAdvisor: IAPI;

  // Stock Theme
  getThemeList: IAPI;
  getThemeStockList: IAPI;
  getStockThemeList: IAPI;
  getThemeStockRatio: IAPI;

  // Foreign Trading
  getForeignTrading: IAPI;

  //News
  getNews: IAPI;
  getVideos: IAPI;
  sendNotificationPreference: IAPI;

  //Social
  getNewsFeed: IAPI;
  getNewsFeedByHashtag: IAPI;
  favouritesNews: IAPI;
  unfavouritesNews: IAPI;
  getPostDetail: IAPI;
  getCommentsOfPost: IAPI;
  getSocialAccountInfo: IAPI;
  updateSocialAccountInfo: IAPI;
  blockSocialUser: IAPI;
  reportSocialUser: IAPI;

  createPost: IAPI;
  editPost: IAPI;
  deletePost: IAPI;
  editMedia: IAPI;
  getAccessSocial: IAPI;
  reblogPost: IAPI;
  unReblogPost: IAPI;
  socialSearch: IAPI;
  votePoll: IAPI;
  getLikedList: IAPI;
  getSocialAccountInfoById: IAPI;
}

export default APIList;
