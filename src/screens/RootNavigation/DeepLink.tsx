import { Dispatch, useCallback, useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { onCloseModalOTPKIS } from 'reduxs/global-actions';
import { navigate, navigationRef } from 'utils/rootNavigation';
import { CommonActions } from '@react-navigation/native';
import { GET_CONTEST_LIST } from 'reduxs/actions';
import { Action } from 'redux';
import { getContestList } from 'reduxs/global-actions/Contest';
import OneSignal from 'react-native-onesignal';
import { useAppSelector } from 'hooks/useAppSelector';
import { isEmpty } from 'lodash';
import { onEnterLeaderBoardScreen } from 'screens/LeaderBoard/action';
import { ILeaderBoardInvestingPeriod } from 'constants/enum';
import { setCurrentSymbol } from 'reduxs/SymbolData';
import { alertMessage } from 'utils';
import { CommonError } from 'interfaces/apis/CommonError';
import withMemo from 'HOC/withMemo';
import { Global } from 'constants/main';

const SCHEME = 'paave.io://';
const HOST = 'https://paave.onelink.me/xDMU';

const WHITE_LIST_BOTTOM_NAVIGATE = ['Home', 'Discover', 'Trade', 'Blog', 'AIRating'];
// const WHITE_LIST_SCREEN = ['LeaderBoard', 'Contest', 'TermAndConditionVT', 'SignIn', 'PopularTheme'];

interface IParamsFromLink {
  param_symbol?: string | 'AAA';
  param_type?: string | 'BUY';
  param_contest_order?: number | 0;
  param_contest_tab?: 'Description' | 'Ranking';
  param_airating_tab?: 'Advisor' | 'Score';
  param_leaderboard_tab?: 'True' | 'False';
  param_is_open_robot?: 'True' | 'False';
}

interface IParamsScreen {
  contestOrder?: number | 1;
  contestTab?: 'Description' | 'Ranking';
  aiRatingTab?: 'Advisor' | 'Score';
  leaderBoardTab?: boolean;
}

type TScreen =
  | 'Home'
  | 'Discover'
  | 'Trade'
  | 'Blog'
  | 'AIRating'
  | 'LeaderBoard'
  | 'Contest'
  | 'TermAndConditionVT'
  | 'SignIn'
  | 'PopularTheme';

interface INavigateScreen {
  screen_name: TScreen;
  params: IParamsFromLink;
  dispatch: Dispatch<Action>;
  isLogin: boolean;
}

export const isDeepLink = (url: string) => url.startsWith(HOST) || url.startsWith(SCHEME);

export const isOpenLink = async (url: string) => {
  try {
    await Linking.openURL(url);
  } catch (_) {
    if (__DEV__) alertMessage('warning', `${CommonError.URI_NOT_FOUND}`);
  }
};

const checkRoutesWithLogin = (isLogin: boolean, screens: { name: string; params?: IParamsScreen }[]) => {
  const lastScreen = screens[screens.length - 1];
  if (isEmpty(screens) || screens.length <= 1) return [{ name: 'HomeTab' }, lastScreen];

  const loginScreen = [{ name: 'SignIn' }];
  const otherScreens = screens.splice(0, screens.length - 1);
  const route = isLogin ? otherScreens : loginScreen;

  return [...route, lastScreen];
};

export const handleNavigateScreen = ({ screen_name, params, dispatch, isLogin }: INavigateScreen) => {
  switch (screen_name) {
    case 'Trade': {
      dispatch(setCurrentSymbol(params.param_symbol as string));
      navigate({
        key: screen_name,
        params: {
          typeOption: params.param_type,
        },
      });
      return;
    }
    case 'LeaderBoard': {
      const { param_leaderboard_tab = 'True' } = params;
      const leaderBoardTab = param_leaderboard_tab === 'True' ? true : false;
      dispatch({ type: GET_CONTEST_LIST });
      const routes = checkRoutesWithLogin(isLogin, [
        { name: 'HomeTab' },
        {
          name: screen_name,
          params: {
            leaderBoardTab,
          },
        },
      ]);
      const resetAction = CommonActions.reset({ index: routes.length - 1, routes });
      dispatch(
        onEnterLeaderBoardScreen(
          {
            period: ILeaderBoardInvestingPeriod.DAY,
            selectTabLeaderBoard: leaderBoardTab,
            isFinalFilter: false,
            tradingContestFilter: '',
          },
          undefined,
          undefined,
          undefined,
          undefined,
          {
            handleSuccess: () => navigationRef.dispatch(resetAction),
          }
        )
      );
      return;
    }
    case 'Contest': {
      const { param_contest_order = 1, param_contest_tab = 'Description' } = params;
      const routes = checkRoutesWithLogin(isLogin, [
        { name: 'HomeTab' },
        { name: 'LeaderBoard' },
        {
          name: screen_name,
          params: {
            contestTab: param_contest_tab,
            contestOrder: param_contest_order - 1,
          },
        },
      ]);
      const resetAction = CommonActions.reset({ index: routes.length - 1, routes });
      dispatch(
        getContestList(undefined, undefined, undefined, undefined, undefined, {
          handleSuccess: () => navigationRef.dispatch(resetAction),
        })
      );
      return;
    }
    case 'AIRating': {
      navigate({
        key: screen_name,
        params: {
          aiRatingTab: {
            tab: params.param_airating_tab || 'Score',
            isOpenRobot: params.param_is_open_robot === 'True' ? true : false,
          },
        },
      });
      return;
    }
    default: {
      if (!screen_name) return;
      if (WHITE_LIST_BOTTOM_NAVIGATE.includes(screen_name)) {
        navigate({ key: screen_name });
        return;
      }

      const routes = checkRoutesWithLogin(isLogin, [{ name: 'HomeTab' }, { name: screen_name }]);
      const resetAction = CommonActions.reset({ index: routes.length - 1, routes });
      navigationRef.dispatch(resetAction);
    }
  }
};

export const getPathUrlDeepLink = async (url: string, isLogin: boolean, dispatch: Dispatch<Action>) => {
  if (!url) return null;

  if (!isLogin) {
    Global.urlGoToAfterLogin = url;

    return;
  }
  if (isDeepLink(url)) {
    const splited = url
      .split('&')
      .filter(item => item.startsWith('screen_name') || item.startsWith('param_'))
      .map(item => {
        const mod = item.split('=');
        return {
          [mod[0]]: mod[1],
        };
      });

    const params_result = Object.assign({}, ...splited);
    const { screen_name, ...params } = params_result;
    return handleNavigateScreen({ screen_name, params, dispatch, isLogin });
  }
  //open other links
  else {
    await isOpenLink(url);
  }
};

const DeepLink = () => {
  const dispatch = useDispatch();
  const isLogin = !!useAppSelector(state => state.authToken.accessToken);
  const kisOTPToken = useAppSelector(state => state.kisOTPToken);
  const accountList = useAppSelector(state => state.accountList);

  const listenDeepLinkFromOneSignal = useCallback(() => {
    if (Platform.OS === 'ios') {
      OneSignal.setLaunchURLsInApp(true);
    }

    //listen after kill-app
    OneSignal.setNotificationOpenedHandler(async notification => {
      const url = notification.notification.launchURL || '';
      if (!navigationRef.isReady()) return;
      await getPathUrlDeepLink(url, isLogin, dispatch);
    });

    //listen noti when app opened
    OneSignal.setNotificationOpenedHandler(async notification => {
      const url = notification.notification.launchURL || '';
      if (!navigationRef.isReady()) return;
      await getPathUrlDeepLink(url, isLogin, dispatch);
    });
  }, [isLogin]);

  const openLinkAfterKillApp = useCallback(() => {
    if (!navigationRef.isReady()) return;
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (!initialUrl) return;
      getPathUrlDeepLink(initialUrl, isLogin, dispatch);
    };
    getUrlAsync();
  }, [getPathUrlDeepLink]);

  const openLinkWhenBackgroundMode = useCallback(() => {
    if (!navigationRef.isReady()) return;
    Linking.addEventListener('url', ({ url }: { url: string }) => {
      getPathUrlDeepLink(url, isLogin, dispatch);
    });
    return () => {
      Linking.removeAllListeners('url');
    };
  }, [getPathUrlDeepLink]);

  useEffect(() => {
    if (!accountList.KIS || kisOTPToken) {
      dispatch(onCloseModalOTPKIS({}));
    }
  }, [kisOTPToken, accountList.KIS]);

  useEffect(() => {
    listenDeepLinkFromOneSignal();
  }, [listenDeepLinkFromOneSignal]);

  useEffect(() => {
    openLinkAfterKillApp();
  }, [openLinkAfterKillApp]);

  useEffect(() => {
    openLinkWhenBackgroundMode();
  }, [openLinkWhenBackgroundMode]);

  return null;
};

export default withMemo(DeepLink);
