import { applyMiddleware, createStore, compose, Reducer } from 'redux';
import { IPersistConfig } from 'interfaces/common';
import { IState, rootReducer } from './global-reducers';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sagaMiddlewareFactory from 'redux-saga';
import sagas from './sagas';
import createFlipperDebugger from 'redux-flipper';
import RNRestart from 'react-native-restart';
import { migrations } from './MigrationPersist';

export * from './Advisor';
export * from './AIRating';
export * from './Authentication';
export * from './CopyTrade';
export * from './DailyProfitLoss';
export * from './Discover';
export * from './FeedBack';
export * from './FinancialInfo';
export * from './ForeignTrading';
export * from './HotStock';
export * from './Investment';
export * from './Localization';
export * from './PriceBoard';
export * from './ReloadController';
export * from './SymbolData';
export * from './UserWall';
export * from './WatchList';
export * from './LoadingAndError';
export * from './Setting';
export * from './StockTheme';
export * from './Top100Stocks';
export * from './News';
export * from './Notification';
export * from './DataChartSymbol';
export * from './Videos';
export * from './SocialPost';
export * from './SocialNewPost';
export * from './SocialAccount';

export default () => {
  const persistConfig: IPersistConfig<IState> = {
    storage: AsyncStorage,
    key: 'root',
    whitelist: [
      'loginData',
      'usersAvatar',
      'kisSessionTimeout',
      'kisOTPToken',
      'selectedAccount',
      'accountList',
      'prohibitedStock',
      'userBasedReducer',
      'nonLoginRecentViewed',
      'nonLoginWatchList',
      'contests',
      'leaderboardContestModal',
      'accountContestRegistered',
      'currentUserSetting',
      'usersSetting',
      'userInfoFromLogin',
      'isLoginWithBiometric',
      'copyTrade',
      'loginWithSocialAccount',
      'temporarilyBiometricStatus',
      'getRecentViewed',
    ],
    migrate: createMigrate(migrations, { debug: false }),
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer as Reducer);

  const middleWaresToApply = [];

  if (__DEV__) {
    middleWaresToApply.push(createFlipperDebugger());
  }

  const sagaMiddleware = sagaMiddlewareFactory({
    // sagaMonitor: {
    //   actionDispatched(action: any) {
    //     console.log('Saga', action.type, action.payload);
    //   },
    // },
  });

  const store = createStore(persistedReducer, compose(applyMiddleware(sagaMiddleware, ...middleWaresToApply)));

  sagaMiddleware.run(sagas);

  const persistor = persistStore(store);

  AsyncStorage.getItem('FIRST_TIME_OPEN_APP').then(value => {
    if (!value) {
      persistor.purge().then(() => {
        RNRestart.restart();
      }); // clear all persisted data and restart app

      AsyncStorage.clear().then(() => {
        AsyncStorage.setItem('FIRST_TIME_OPEN_APP', 'true');
      });
    }
  });

  return { store, persistor };
};
