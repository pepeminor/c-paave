import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { createStackNavigator, StackScreenProps as ScreenProps } from '@react-navigation/stack';
import {
  FEATURE_CONFIGURATION,
  GET_AUTO_TRADE_AGREEMENT,
  GET_AUTO_TRADE_POPUP,
  GET_BOT_DATA,
  GET_HOLIDAY_LIST,
  LEADER_BOARD_ACCOUNT_SELECTOR,
  ONESIGNAL_RESEND_TAGS,
} from 'reduxs/actions';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from 'hooks';
import FlashMessage from 'react-native-flash-message';
import ScreenNames from './ScreenNames';
import useConstructor from 'hooks/useConstructor';
import StackScreenConfig from './ScreenConfig';
import ScreenParamList from './ScreenParamList';
import { SELECT_KIS_ACCOUNT } from 'reduxs/sagas/Authentication/SelectKisAccount';
import { socketUtils } from 'utils';
import Orientation from 'react-native-orientation-locker';
import { useTypedSelector } from 'hooks/useAppSelector';
import {
  AuthenticationActions,
  ReloadControllerAction,
  SettingActions,
  SettingSelectors,
  WatchListActions,
} from 'reduxs';
import { ACCOUNT_TYPE } from 'global';

/* Components */
import LoadOpenApp from 'screens/RootNavigation/components/LoadOpenApp';
import SafeAreaViewFullScreen from 'screens/RootNavigation/components/SafeAreaViewFullScreen';
import ModalNetworkDisconnect from 'screens/RootNavigation/components/ModalNetworkDisconnect';
import { routingInstrumentation, store } from 'screens/App';
import ModalUpdateApp from './components/ModalUpdateApp';
import LoginRequiredModal from 'components/LoginRequired/LoginRequiredModal';
import DeepLink from './DeepLink';
import { SymbolDataAction } from 'reduxs/SymbolData';
import HandleSocketBackground from './components/HandleSocketBackground';
import ModalSubAccountDisable from 'components/ModalSubAccountDisable';
import { Dispatch } from 'redux';
import NetInfo from '@react-native-community/netinfo';
import LoaderWithMessage from './components/Loader';
import useUpdateEffect from 'hooks/useUpdateEffect';
import ModalReLogin from 'components/ModalReLogin';
import ModalContinueEkyc from './components/ModalContinueEkyc';
import ReloadWrapper from './components/ReloadWrapper';

// const Stack = createNativeStackNavigator<ScreenParamList>();
const Stack = createStackNavigator<ScreenParamList>();

export const InitAppData = (dispatch: Dispatch) => {
  dispatch({ type: GET_HOLIDAY_LIST });
  dispatch({ type: GET_BOT_DATA });
  dispatch({ type: GET_AUTO_TRADE_AGREEMENT });
  dispatch({ type: GET_AUTO_TRADE_POPUP });
  dispatch({ type: FEATURE_CONFIGURATION });
  dispatch(SymbolDataAction.initMarket());
  dispatch(SymbolDataAction.getIndicesStockList());
  socketUtils.connectPriceBoardSocket({
    onConnect: () => {
      dispatch(SymbolDataAction.getLatestOnAppActive());
    },
  });
  dispatch({ type: ONESIGNAL_RESEND_TAGS });
  dispatch(AuthenticationActions.checkLinkedAccounts());
};

Orientation.lockToPortrait();
// const options = { headerShown: false, orientation: 'portrait' } as NativeStackNavigationOptions;
const options = { headerShown: false };

const RootNavigation = () => {
  const dispatch = useDispatch();
  const i18n = useAppSelector(state => state.i18n);
  const authToken = useAppSelector(state => state.authToken);
  const prevNetWorkStatus = useRef(true);
  const isHaveKISAccount = useAppSelector(state => state.accountList.KIS != null);
  const isHaveDataSymbol = useTypedSelector(state => state.SymbolData.marketData.symbolList.length > 0);
  const userName = useAppSelector(state => state.accountList?.KIS?.username ?? '');
  const selectedAccountDefault = useSelector(SettingSelectors.selectedAccountDefault(userName));

  const ON_READY_NAVIGATION = useCallback(() => {
    // Register the navigation container with the instrumentation
    routingInstrumentation.registerNavigationContainer(navigationRef);

    const savedRoutes = store.getState().ReloadController.savedRoutesForBio;
    if (savedRoutes.length > 0) {
      navigationRef.dispatch(CommonActions.reset({ index: 0, routes: savedRoutes as any }));
      dispatch(ReloadControllerAction.resetSavedRoutes());
    }
  }, []);

  useEffect(() => {
    if (selectedAccountDefault) {
      dispatch(
        SettingActions.setAccountDefault({
          userId: userName,
          sub: selectedAccountDefault,
        })
      );
    }
    dispatch({
      type: SELECT_KIS_ACCOUNT,
      payload: {
        accountDefault: selectedAccountDefault,
      },
    });
  }, []);

  useEffect(() => {
    // init leaderboard mode by account type
    isHaveKISAccount
      ? dispatch({ type: LEADER_BOARD_ACCOUNT_SELECTOR, payload: ACCOUNT_TYPE.KIS })
      : dispatch({ type: LEADER_BOARD_ACCOUNT_SELECTOR, payload: ACCOUNT_TYPE.VIRTUAL });
    // Init selected watchlist by account type
    const newType = isHaveKISAccount ? ACCOUNT_TYPE.KIS : ACCOUNT_TYPE.VIRTUAL;
    dispatch(
      WatchListActions.onChangeAccount({
        newType,
        newWatchListId: store.getState().userBasedReducer.data.favoriteWatchlist?.[newType] ?? -1,
      })
    );
  }, [isHaveKISAccount]);

  useConstructor(() => {
    // Run one time when app start
    InitAppData(dispatch);
  });

  useUpdateEffect(() => {
    if (isHaveDataSymbol) {
      dispatch({
        type: SELECT_KIS_ACCOUNT,
        payload: {
          accountDefault: selectedAccountDefault,
        },
      });
    }
  }, [isHaveDataSymbol]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected === false) {
        prevNetWorkStatus.current = false;
      }
      if (prevNetWorkStatus.current === false && state.isConnected) {
        prevNetWorkStatus.current = true;
        InitAppData(dispatch);
      }
    });

    return unsubscribe;
  }, []);

  const StackScreens = useMemo(
    () =>
      Object.keys(StackScreenConfig).map(screen => {
        const props = StackScreenConfig[screen as ScreenNames];
        if (props == null) {
          return null;
        }
        return <Stack.Screen key={screen} name={screen as ScreenNames} {...props} />;
      }),
    []
  );

  return i18n ? (
    <>
      <ReloadWrapper>
        <NavigationContainer ref={navigationRef} onReady={ON_READY_NAVIGATION}>
          <Stack.Navigator
            screenOptions={options}
            initialRouteName={
              authToken.accessToken !== ''
                ? ScreenNames.HomeTab
                : authToken.lastLoggedInAt
                ? ScreenNames.SignIn
                : ScreenNames.Introduction
            }
          >
            {StackScreens}
          </Stack.Navigator>
          <FlashMessage position="top" animationDuration={500} duration={2500} animated />
          <ModalNetworkDisconnect />
        </NavigationContainer>
      </ReloadWrapper>
      <LoaderWithMessage />
      <SafeAreaViewFullScreen />
      <ModalUpdateApp />
      <ModalSubAccountDisable />
      <ModalReLogin />
      <LoginRequiredModal />
      <DeepLink />
      <HandleSocketBackground />
      <ModalContinueEkyc />
    </>
  ) : (
    <LoadOpenApp />
  );
};

export default memo(RootNavigation);

export type IStackRouteProps = ScreenParamList;
// export type StackScreenProps<S extends keyof ScreenParamList> = NativeStackScreenProps<ScreenParamList, S>;
export type StackScreenProps<S extends keyof ScreenParamList> = ScreenProps<ScreenParamList, S>;
//
