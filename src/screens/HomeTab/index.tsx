import React, { useCallback, useEffect } from 'react';
import { StackScreenProps } from 'screens/RootNavigation';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks';
import Portfolio from 'screens/Portfolio';
import Discover from 'screens/Discover';
import TradeScreen from 'screens/TradeScreen';
import AIRatingScreen from 'screens/AIRatingScreen';
import { getProhibitedStock } from 'reduxs/global-actions';
import { ACCOUNT_TYPE } from 'global';
import MyTabBar from './components/MyTabBar';
import withMemo from 'HOC/withMemo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppOpenHandler from './components/AppOpenHandler';
import ModalOTPKISComponent from './components/ModalOTPKIS.component';
import ModalNoticeComponent from './components/ModalNotice.component';
import ModalExitAppComponent from './components/ModalExitApp.component';
import { Platform } from 'react-native';
import useStyles from './styles';
import { insertObjectIf, navigationRef } from 'utils';
import { useKeyboard } from 'hooks/useKeyboard/useKeyboard';
import GlobalDomain from 'config/globalDomain';
import SocialScreen from 'screens/SocialScreen';
import { store } from 'screens/App';
import { CommonActions } from '@react-navigation/native';
import { ReloadControllerAction } from 'reduxs';

export const Tab = createBottomTabNavigator();
const options = {
  lazy: true,
  headerShown: false,
  freezeOnBlur: true,
};

const HomeTab = (props: StackScreenProps<'HomeTab'>) => {
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);
  const triggerReLoginBiometricModal = useAppSelector(state => state.triggerReLoginBiometricModal);
  const homeScreen = useAppSelector(
    state => state.currentUserSetting?.homeScreen ?? GlobalDomain[selectedAccountType].defaultHomeScreenTab
  );
  const iniRouteName = props.route.params != null ? props.route.params.tab : homeScreen;
  const [keyboardHeight] = useKeyboard();

  useAuthenticated(
    useCallback(() => {
      selectedAccountType !== ACCOUNT_TYPE.DEMO && dispatch(getProhibitedStock(null));
    }, [selectedAccountType])
  );

  useEffect(() => {
    const savedRoutes = store.getState().ReloadController.savedRoutesForPassword;
    if (savedRoutes?.length > 0) {
      navigationRef.dispatch(CommonActions.reset({ index: 0, routes: savedRoutes as any }));
      dispatch(ReloadControllerAction.resetSavedRoutes());
    }
  }, []);

  return (
    <>
      <Tab.Navigator
        initialRouteName={iniRouteName}
        tabBar={props => <MyTabBar {...props} />}
        screenOptions={options}
        sceneContainerStyle={[styles.containerScreenTab, insertObjectIf(keyboardHeight > 0, { paddingBottom: 0 })]}
      >
        <Tab.Screen name="Home" component={Portfolio} />
        <Tab.Screen name="Discover" component={Discover} />
        <Tab.Screen name={'Trade'} component={TradeScreen} />
        <Tab.Screen name={'Social'} component={SocialScreen} />

        <Tab.Screen name="AIRating" component={AIRatingScreen} />
      </Tab.Navigator>
      <AppOpenHandler />
      {!triggerReLoginBiometricModal.showModal && <ModalOTPKISComponent />}
      <ModalNoticeComponent />
      {Platform.OS === 'android' && <ModalExitAppComponent />}
    </>
  );
};

export default withMemo(HomeTab);

const useAuthenticated = (callback: () => void) => {
  const refToken = useAppSelector(state => state.authToken.refToken);
  useEffect(() => {
    if (refToken === '') return;
    callback();
  }, [refToken, callback]);
};
