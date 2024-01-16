import { all, call, fork, race, take } from 'redux-saga/effects';
import * as authentication from './Authentication';
import * as market from './Market';
import { signUp, verifyOTPSignup, watchSignupEnterNameSubmit } from './Signup';
import * as equity from './Equity';
import * as news from './News';
import * as notification from './Notification';
import * as leaderBoard from './LeaderBoard';
import * as user from './User';
import * as profile from './Profile';
import * as search from './Search';
import * as stockSector from './StockSector';
import * as finance from './Finance';
import * as indexInfo from './IndexInfo';
import * as StockInfo from './StockInfo';
import * as discoverWatchlist from './DiscoverWatchlist';
import * as addSymbol from './AddSymbol';
import * as portfolio from './Portfolio';
import * as realTrading from './RealTrading';
import * as kisServiceEqt from './KisServicesEqt';
import * as kisServicesDer from './KisServicesDer';
import * as kisProfitLoss from './KisProfitLoss';
import * as assetInfo from './AssetInfo';
import * as bankTransfer from './BankTransfer';
import * as stockTransfer from './StockTransfer';
import * as resourceFiles from './ResourceFiles';
import * as orderbook from './Orderbook';
import * as Derivatives from './Derivatives';
import * as LeaderboardSetting from './LeaderboardSetting';

import { loginRealAccount } from './LoginRealAccount';
import { getAllPartner } from './Partner';
import { linkAccountKisInit } from './LinkAccountKisInit';
import { linkAccounts, linkAccountsLogin } from './LinkAccounts';
import { notifyKisMobileOTP } from './KisOTP';
import * as verifyKisForgotPw from './KisForgotPasswordOTP';
import {
  loginBiometric,
  queryBiometricStatus,
  registerBiometrics,
  registerBiometricsKis,
  unregisterBiometrics,
} from './Biometrics';
import * as SymbolData from '../SymbolData/SymbolData.saga';
import * as HotStock from '../HotStock/HotStock.saga';
import CopyTradeSagas from 'reduxs/CopyTrade/CopyTrade.saga';
import { AdvisorSagas } from '../Advisor';
import { FeedbackSagas } from '../FeedBack';
import { WatchListSagas } from '../WatchList/WatchList.saga';
import {
  UserWallSagas,
  AIRatingSagas,
  DailyProfitLossSagas,
  FinancialInfoSagas,
  DiscoverSagas,
  InvestmentSagas,
  AuthenticationSagas,
  StockThemeSagas,
  Top100StocksSagas,
  NewsSagas,
  ForeignTradingSagas,
  DataChartSymbolSagas,
  SocialPostSagas,
  SocialNewPostSagas,
  SocialAccountSagas,
} from 'reduxs';
import watchGetVideos from 'reduxs/Videos/Videos.saga';
import { CANCEL_ALL_EFFECTS } from 'reduxs/actions';
import { cleanOnSignOut } from './CleanOnSignOut';

const allImport = (exportWatchers: { [s: string]: () => Generator }) => {
  return Object.keys(exportWatchers).map(key => exportWatchers[key]);
};

const sagas = [
  CopyTradeSagas,
  // Authentication
  signUp,
  verifyOTPSignup,
  watchSignupEnterNameSubmit,
  loginRealAccount,
  linkAccounts,
  linkAccountsLogin,
  FinancialInfoSagas,
  WatchListSagas,
  AuthenticationSagas,
  AIRatingSagas,
  UserWallSagas,
  //Portfolio
  DailyProfitLossSagas,

  InvestmentSagas,
  //Partners
  getAllPartner,

  // Feedback
  FeedbackSagas,

  // Discover
  DiscoverSagas,

  //News
  NewsSagas,
  DataChartSymbolSagas,
  watchGetVideos,

  SocialPostSagas,
  ...allImport(SocialNewPostSagas),
  ...allImport(SocialAccountSagas),

  //Link Account Kis Init
  linkAccountKisInit,
  notifyKisMobileOTP,
  ...allImport(verifyKisForgotPw),

  //Biometric
  registerBiometrics,
  unregisterBiometrics,
  queryBiometricStatus,
  loginBiometric,
  registerBiometricsKis,

  ...allImport(authentication),
  ...allImport(equity),
  ...allImport(news),
  ...allImport(notification),
  ...allImport(leaderBoard),
  ...allImport(user),
  ...allImport(profile),
  ...allImport(stockSector),
  ...allImport(finance),
  ...allImport(market),
  ...allImport(search),
  ...allImport(indexInfo),
  ...allImport(StockInfo),
  ...allImport(discoverWatchlist),
  ...allImport(addSymbol),
  ...allImport(portfolio),
  ...allImport(realTrading),
  ...allImport(kisServiceEqt),
  ...allImport(kisProfitLoss),
  ...allImport(assetInfo),
  ...allImport(bankTransfer),
  ...allImport(stockTransfer),
  ...allImport(resourceFiles),
  ...allImport(orderbook),
  ...allImport(kisServicesDer),
  ...allImport(SymbolData),
  ...allImport(HotStock),
  ...allImport(LeaderboardSetting),
  ...allImport(StockThemeSagas),
  ...allImport(Top100StocksSagas),
  ...allImport(ForeignTradingSagas),
  ...allImport(AdvisorSagas),

  // Derivatives
  ...allImport(Derivatives),
];

export function* cancelableSaga() {
  yield race([
    take(CANCEL_ALL_EFFECTS),
    all(
      sagas.map(saga =>
        fork(function* () {
          while (true) {
            try {
              yield call(saga);
            } catch (e) {
              // eslint-disable-next-line no-console
              console.log('Saga error', saga.name, e);
            }
          }
        })
      )
    ),
  ]);
  yield cleanOnSignOut();
}
